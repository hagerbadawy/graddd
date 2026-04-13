export default function StatsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

      <div className="bg-white p-6 rounded-xl shadow">
        <p className="text-gray-500 text-sm">Total Users</p>
        <h2 className="text-2xl font-bold mt-2">120</h2>
      </div>

      <div className="bg-white p-6 rounded-xl shadow">
        <p className="text-gray-500 text-sm">Doctors</p>
        <h2 className="text-2xl font-bold mt-2">35</h2>
      </div>

      <div className="bg-white p-6 rounded-xl shadow">
        <p className="text-gray-500 text-sm">Patients</p>
        <h2 className="text-2xl font-bold mt-2">240</h2>
      </div>

      <div className="bg-white p-6 rounded-xl shadow">
        <p className="text-gray-500 text-sm">Revenue</p>
        <h2 className="text-2xl font-bold mt-2">$12,400</h2>
      </div>

    </div>
  );
}