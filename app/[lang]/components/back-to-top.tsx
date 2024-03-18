'use client'

import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp } from '@fortawesome/free-solid-svg-icons'

const BackToTop = () => {
  const [showButton, setShowButton] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 600) {
        setShowButton(true)
      } else {
        setShowButton(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      {showButton && (
        <button
          onClick={scrollToTop}
          className='fixed bottom-20 right-4 rounded-full bg-black p-3 text-white shadow-md transition hover:bg-[#BFA53D]'
          title='Scroll to top'
        >
          <FontAwesomeIcon icon={faArrowUp} />
        </button>
      )}
    </>
  )
}

export default BackToTop
