export default function SettingsPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">System Settings</h1>

      <div className="bg-card p-6 rounded-2xl shadow space-y-4">
        <div>
          <label className="block text-sm mb-1">Hospital Name</label>
          <input className="w-full border rounded-lg p-2" defaultValue="MedHub" />
        </div>

        <div>
          <label className="block text-sm mb-1">Support Email</label>
          <input className="w-full border rounded-lg p-2" defaultValue="support@medhub.com" />
        </div>

        <button className="bg-primary text-white px-4 py-2 rounded-lg">
          Save Changes
        </button>
      </div>
    </div>
  );
}