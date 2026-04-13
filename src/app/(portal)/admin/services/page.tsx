"use client";
import { useState } from "react";

type Service = {
  id: number;
  name: string;
  price: number;
};

// 👇 endpoints mapping (زي الـ spec)
const endpoints = {
  lab: "/admin/catalogs/lab",
  radiology: "/admin/catalogs/radiology",
  services: "/admin/catalogs/services",
};

export default function ServiceCatalogsPage() {
  const [activeTab, setActiveTab] = useState<"lab" | "radiology" | "services">("lab");

  // ✅ state منفصل لكل tab
  const [labData, setLabData] = useState<Service[]>([
    { id: 1, name: "CBC", price: 100 },
  ]);

  const [radiologyData, setRadiologyData] = useState<Service[]>([
    { id: 1, name: "X-Ray", price: 500 },
  ]);

  const [servicesData, setServicesData] = useState<Service[]>([
    { id: 1, name: "Consultation", price: 200 },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newService, setNewService] = useState<Service>({
    id: 0,
    name: "",
    price: 0,
  });

  // 👇 تحديد الداتا حسب التاب
  const getCurrentData = () => {
    if (activeTab === "lab") return labData;
    if (activeTab === "radiology") return radiologyData;
    return servicesData;
  };

  const setCurrentData = (data: Service[]) => {
    if (activeTab === "lab") setLabData(data);
    else if (activeTab === "radiology") setRadiologyData(data);
    else setServicesData(data);
  };

  // ✅ ADD
  const handleAdd = () => {
    const current = getCurrentData();

    const newItem = {
      ...newService,
      id: Date.now(),
    };

    setCurrentData([...current, newItem]);

    console.log("POST →", endpoints[activeTab], newItem);

    setShowModal(false);
    setNewService({ id: 0, name: "", price: 0 });
  };

  // ✅ EDIT
  const handleEdit = (item: Service) => {
    const newName = prompt("Edit Name", item.name);
    const newPrice = prompt("Edit Price", item.price.toString());

    if (!newName || !newPrice) return;

    const updated = getCurrentData().map((i) =>
      i.id === item.id
        ? { ...i, name: newName, price: Number(newPrice) }
        : i
    );

    setCurrentData(updated);

    console.log("PUT →", endpoints[activeTab] + "/" + item.id);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Service Catalogs</h1>

      {/* ✅ Tabs */}
      <div className="flex gap-4 mb-6">
        {["lab", "radiology", "services"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`px-4 py-2 rounded ${
              activeTab === tab
                ? "bg-blue-600 text-white"
                : "bg-gray-200"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Add Button */}
      <button
        onClick={() => setShowModal(true)}
        className="bg-green-600 text-white px-4 py-2 rounded mb-4"
      >
        + Add
      </button>

      {/* Table */}
      <div className="bg-white rounded shadow">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="p-3">Name</th>
              <th className="p-3">Price</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {getCurrentData().map((item) => (
              <tr key={item.id} className="border-b">
                <td className="p-3">{item.name}</td>
                <td className="p-3">${item.price}</td>
                <td className="p-3">
                  <button
                    onClick={() => handleEdit(item)}
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40">
          <div className="bg-white p-6 rounded w-80">
            <h2 className="text-lg font-semibold mb-4">
              Add {activeTab}
            </h2>

            <input
              placeholder="Name"
              className="border p-2 w-full mb-3"
              value={newService.name}
              onChange={(e) =>
                setNewService({ ...newService, name: e.target.value })
              }
            />

            <input
              placeholder="Price"
              type="number"
              className="border p-2 w-full mb-3"
              value={newService.price}
              onChange={(e) =>
                setNewService({
                  ...newService,
                  price: Number(e.target.value),
                })
              }
            />

            <div className="flex justify-end gap-2">
              <button onClick={() => setShowModal(false)}>Cancel</button>
              <button
                onClick={handleAdd}
                className="bg-green-600 text-white px-3 py-1 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}