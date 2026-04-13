export default function BillingTable() {
  const bills = [
    { patient: "Ahmed Ali", amount: "$200", status: "Paid" },
    { patient: "Sara Mohamed", amount: "$150", status: "Pending" },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-lg font-semibold mb-4">Billing Overview</h2>

      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-gray-500 border-b">
            <th className="p-3">Patient</th>
            <th className="p-3">Amount</th>
            <th className="p-3">Status</th>
          </tr>
        </thead>

        <tbody>
          {bills.map((bill, i) => (
            <tr key={i} className="border-b">
              <td className="p-3">{bill.patient}</td>
              <td className="p-3">{bill.amount}</td>
              <td className="p-3">{bill.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}