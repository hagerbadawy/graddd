import StatsCards from "./components/statscards";
import UsersTable from "./components/userstable";
import BillingTable from "./components/billingtable";

export default function AdminPage() {
  return (
    <div className="space-y-6">

      <h1 className="text-2xl font-bold">Admin Dashboard</h1>

      <StatsCards />

      <UsersTable />

      <BillingTable />

    </div>
  );
}