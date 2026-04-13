"use client";
import { useState } from "react";

type SettingsType = {
  [category: string]: {
    [key: string]: string | number | boolean;
  };
};

export default function SettingsPage() {
  const [settings, setSettings] = useState<SettingsType>({
    general: {
      hospitalName: "MedHub",
      timezone: "UTC+2",
    },
    billing: {
      taxRate: 14,
      currency: "EGP",
    },
    notifications: {
      emailEnabled: true,
      smsEnabled: false,
    },
  });

  // 🟢 handle input change
  const handleChange = (
    category: string,
    key: string,
    value: string
  ) => {
    setSettings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]:
          value === "true"
            ? true
            : value === "false"
            ? false
            : isNaN(Number(value))
            ? value
            : Number(value),
      },
    }));
  };

  // 🟢 تحويل الداتا للشكل المطلوب في الـ API
  const flattenSettings = () => {
    const flat: Record<string, string | number | boolean> = {};

    Object.values(settings).forEach((category) => {
      Object.entries(category).forEach(([key, value]) => {
        flat[key] = value;
      });
    });

    return flat;
  };

  // 🟢 Save (PUT)
  const handleSave = () => {
    const payload = flattenSettings();

    console.log("PUT /admin/settings", payload);

    // هنا لما تربطي backend:
    // await fetch('/admin/settings', {
    //   method: 'PUT',
    //   body: JSON.stringify(payload)
    // })

    alert("Settings saved successfully ✅");
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">System Settings</h1>

      {/* 🔹 Categories */}
      {Object.entries(settings).map(([category, values]) => (
        <div key={category} className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-4 capitalize">
            {category}
          </h2>

          <div className="grid grid-cols-2 gap-4">
            {Object.entries(values).map(([key, value]) => (
              <div key={key} className="flex flex-col">
                <label className="text-sm mb-1 capitalize">
                  {key}
                </label>

                {/* Boolean */}
                {typeof value === "boolean" ? (
                  <select
                    value={value.toString()}
                    onChange={(e) =>
                      handleChange(category, key, e.target.value)
                    }
                    className="border p-2 rounded"
                  >
                    <option value="true">True</option>
                    <option value="false">False</option>
                  </select>
                ) : (
                  /* String / Number */
                  <input
                    type="text"
                    value={value}
                    onChange={(e) =>
                      handleChange(category, key, e.target.value)
                    }
                    className="border p-2 rounded"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* 🔹 Save Button */}
      <button
        onClick={handleSave}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Save Changes
      </button>
    </div>
  );
}