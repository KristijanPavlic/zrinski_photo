import { ClerkProvider } from "@clerk/nextjs";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return <ClerkProvider>{children}</ClerkProvider>;
};

export default AdminLayout;
