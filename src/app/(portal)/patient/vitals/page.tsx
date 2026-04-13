"use client";

import { Activity } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockPatientVitalsHistory } from "@/features/patient/mock/data";

export default function PatientVitalsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Vitals</h1>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-4 w-4 text-primary" />
            Vitals History
          </CardTitle>
        </CardHeader>

        <CardContent>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Date</th>
                <th className="text-center">BP</th>
                <th className="text-center">HR</th>
                <th className="text-center">Temp</th>
                <th className="text-center">SpO₂</th>
              </tr>
            </thead>

            <tbody>
              {mockPatientVitalsHistory.map((v, i) => (
                <tr key={i} className="border-b">
                  <td className="py-2">{v.date}</td>
                  <td className="text-center">
                    {v.systolic}/{v.diastolic}
                  </td>
                  <td className="text-center">{v.heartRate}</td>
                  <td className="text-center">{v.temp}</td>
                  <td className="text-center">{v.spo2}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}