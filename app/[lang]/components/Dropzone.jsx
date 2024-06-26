// Dropzone.jsx
'use client'

import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { ArrowUpTrayIcon, XMarkIcon } from '@heroicons/react/24/solid'
import { getSignature, saveToDatabase } from '../_action'
import { toast } from 'react-hot-toast'

const Dropzone = ({ className }) => {
  const [files, setFiles] = useState([])
  const [rejected, setRejected] = useState([])
  const [alertMessage, setAlertMessage] = useState(null)
  const [selectedFolder, setSelectedFolder] = useState('weddings')

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    if (acceptedFiles?.length) {
      setFiles(previousFiles => [
        ...acceptedFiles.map(file =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        )
      ])
    }

    if (rejectedFiles?.length) {
      setRejected(previousFiles => [...previousFiles, ...rejectedFiles])
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { 'image/*': [] },
    maxSize: 1024 * 1024 * 5,
    maxFiles: 100,
    onDrop
  })

  useEffect(() => {
    return () => files.forEach(file => URL.revokeObjectURL(file.preview))
  }, [files])

  const removeFile = name =>
    setFiles(files => files.filter(file => file.name !== name))
  const removeAll = () => setFiles([])
  const removeRejected = name =>
    setRejected(files => files.filter(({ file }) => file.name !== name))

  async function action() {
    if (files.length === 0) return

    for (const file of files) {
      const { timestamp, signature } = await getSignature(
        selectedFolder,
        file.name
      )

      const formData = new FormData()
      formData.append('file', file)
      formData.append('api_key', process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY)
      formData.append('signature', signature)
      formData.append('timestamp', timestamp)
      formData.append('folder', selectedFolder)
      formData.append('public_id', file.name)

      const endpoint = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_URL

      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          body: formData
        })

        if (response.ok) {
          const data = await response.json()
          await saveToDatabase({
            version: data?.version,
            signature: data?.signature,
            public_id: data?.public_id
          })
          toast.success('File uploaded successfully!')
        } else {
          toast.error('Upload failed for a file. Please check logs.')
        }
      } catch (error) {
        console.error('Error during upload:', error)
        toast.error('An error occurred during upload.')
      }
    }

    setFiles([])
  }

  return (
    <form
      onSubmit={e => {
        e.preventDefault()
        action()
      }}
    >
      <div {...getRootProps({ className })}>
        <input {...getInputProps({ name: 'file' })} />
        <div className='flex flex-col items-center justify-center gap-4'>
          <ArrowUpTrayIcon className='h-5 w-5 fill-current' />
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <p>Drag & drop files here, or click to select files</p>
          )}
        </div>
      </div>

      {alertMessage && (
        <div
          className={`mt-4 p-2 text-center ${alertMessage.includes('failed') ? 'text-red-500' : 'text-green-500'}`}
        >
          {alertMessage}
        </div>
      )}

      <section className='mt-10'>
        <div>
          <h2 className='title text-3xl font-semibold'>Select Folder</h2>
          <div className='mb-10 mt-5'>
            <label htmlFor='categories'>
              Choose a folder to upload images to:
            </label>
            <select
              name='categories'
              id='categories'
              value={selectedFolder}
              onChange={e => setSelectedFolder(e.target.value)}
            >
              <option value='weddings'>Weddings</option>
              <option value='christening'>Christening</option>
              <option value='cake-smash'>Cake Smash</option>
              <option value='family'>Family - kids - pregnancy</option>
              <option value='christmas'>Christmas</option>
            </select>
          </div>
        </div>
        <div className='flex gap-4'>
          <h2 className='title text-3xl font-semibold'>Preview</h2>
          <button
            type='button'
            onClick={removeAll}
            className='mt-1 rounded-md border border-rose-400 px-3 text-[12px] font-bold uppercase tracking-wider text-stone-500 transition-colors hover:bg-rose-400 hover:text-white'
          >
            Remove all images
          </button>
          <button
            type='submit'
            className='ml-auto mt-1 rounded-md border border-[#BFA53D] px-3 text-[12px] font-bold uppercase tracking-wider text-stone-500 transition-colors hover:bg-[#BFA53D] hover:text-white'
          >
            Upload to Cloudinary
          </button>
        </div>

        <h3 className='title mt-10 border-b pb-3 text-lg font-semibold text-stone-600'>
          Accepted Images
        </h3>
        <ul className='mt-6 grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6'>
          {files.map(file => (
            <li key={file.name} className='relative h-32 rounded-md shadow-lg'>
              <Image
                src={file.preview}
                alt={file.name}
                width={100}
                height={100}
                onLoad={() => {
                  URL.revokeObjectURL(file.preview)
                }}
                className='h-full w-full rounded-md object-contain'
              />
              <button
                type='button'
                className='absolute -right-3 -top-3 flex h-7 w-7 items-center justify-center rounded-full border border-rose-400 bg-rose-400 transition-colors hover:bg-white'
                onClick={() => removeFile(file.name)}
              >
                <XMarkIcon className='h-5 w-5 fill-white transition-colors hover:fill-rose-400' />
              </button>
              <p className='mt-2 text-[12px] font-medium text-stone-500'>
                {file.name}
              </p>
            </li>
          ))}
        </ul>

        <h3 className='title mt-24 border-b pb-3 text-lg font-semibold text-stone-600'>
          Rejected Images
        </h3>
        <ul className='mt-6 flex flex-col'>
          {rejected.map(({ file, errors }) => (
            <li key={file.name} className='flex items-start justify-between'>
              <div>
                <p className='mt-2 text-sm font-medium text-stone-500'>
                  {file.name}
                </p>
                <ul className='text-[12px] text-red-400'>
                  {errors.map(error => (
                    <li key={error.code}>{error.message}</li>
                  ))}
                </ul>
              </div>
              <button
                type='button'
                className='mt-1 rounded-md border border-rose-400 px-3 py-1 text-[12px] font-bold uppercase tracking-wider text-stone-500 transition-colors hover:bg-rose-400 hover:text-white'
                onClick={() => removeRejected(file.name)}
              >
                remove
              </button>
            </li>
          ))}
        </ul>
      </section>
    </form>
  )
}

export default Dropzone
