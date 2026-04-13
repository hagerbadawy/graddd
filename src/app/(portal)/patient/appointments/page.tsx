"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays } from "lucide-react";
import { mockPatientAppointments } from "@/features/patient/mock/data";

export default function PatientAppointmentsPage() {

  const appointments = mockPatientAppointments;

  return (
    <div className="space-y-6">

      <h1 className="text-2xl font-bold">Appointments</h1>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4" />
            Your Appointments
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-3">

          {appointments.map((apt) => (
            <div
              key={apt.id}
              className="p-4 border rounded-lg flex justify-between"
            >
              <div>
                <p className="font-medium">{apt.doctorName}</p>
                <p className="text-sm text-muted-foreground">
                  {apt.department}
                </p>
              </div>

              <div className="text-right">
                <p>{apt.date}</p>
                <p className="text-sm text-muted-foreground">{apt.time}</p>
              </div>
            </div>
          ))}

        </CardContent>
      </Card>

    </div>
  );
}