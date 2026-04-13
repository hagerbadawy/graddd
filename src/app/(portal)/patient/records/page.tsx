"use client";

import { FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockLabResults } from "@/features/patient/mock/data";
import { StatusBadge } from "@/components/atoms/StatusBadge";

export default function PatientRecordsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Medical Records</h1>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-primary" />
            Lab Results
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="space-y-2">
            {mockLabResults.map((lab) => (
              <div
                key={lab.id}
                className="flex items-center justify-between border p-3 rounded-lg"
              >
                <div>
                  <p className="font-medium">{lab.testName}</p>
                  <p className="text-xs text-muted-foreground">{lab.date}</p>
                </div>

                <StatusBadge status={lab.status} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}