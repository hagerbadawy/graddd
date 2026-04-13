"use client";

import { Pill } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockPatientMedications } from "@/features/patient/mock/data";

export default function PatientPrescriptionsPage() {
  const activeMeds = mockPatientMedications.filter(
    (m) => m.status === "active"
  );

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Prescriptions</h1>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Pill className="h-4 w-4 text-primary" />
            Current Medications
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="space-y-3">
            {activeMeds.map((med) => (
              <div key={med.id} className="border p-4 rounded-lg">
                <p className="font-semibold">{med.name}</p>
                <p className="text-sm text-muted-foreground">
                  {med.dosage} • {med.frequency}
                </p>
                <p className="text-xs text-muted-foreground">
                  Prescribed by {med.prescribedBy}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}