import { UserButton } from "@clerk/nextjs";

const Dashboard = () => {
  return (
    <>
      <h1>Dashboard</h1>
      <UserButton afterSignOutUrl="/" />
    </>
  );
};

export default Dashboard;
