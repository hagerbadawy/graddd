export default function PatientBillingPage() {
  const bills = [
    { service: "Consultation", amount: "$120", status: "Paid" },
    { service: "Blood Test", amount: "$60", status: "Pending" },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Billing</h1>

      <div className="bg-white p-6 rounded-xl shadow">
        {bills.map((bill, i) => (
          <div
            key={i}
            className="flex justify-between border-b py-3 last:border-none"
          >
            <div>{bill.service}</div>
            <div>{bill.amount}</div>
            <div
              className={
                bill.status === "Paid"
                  ? "text-green-600 font-medium"
                  : "text-orange-600 font-medium"
              }
            >
              {bill.status}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}