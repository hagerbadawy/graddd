import { Patient, Appointment, Department } from "@/types";

export const mockDepartments: Department[] = [
    { id: "dept-1", name: "Internal Medicine", head: "Dr. David Chen", staffCount: 24, activePatients: 48, description: "General internal medicine and diagnostics" },
    { id: "dept-2", name: "Surgery", head: "Dr. Sarah Kim", staffCount: 32, activePatients: 28, description: "General and specialized surgery" },
    { id: "dept-3", name: "Pediatrics", head: "Dr. Maria Lopez", staffCount: 18, activePatients: 35, description: "Child healthcare and neonatal care" },
    { id: "dept-4", name: "Cardiology", head: "Dr. James Wright", staffCount: 15, activePatients: 22, description: "Heart and cardiovascular system" },
    { id: "dept-5", name: "Radiology", head: "Dr. Lisa Park", staffCount: 12, activePatients: 0, description: "Diagnostic imaging and interventional radiology" },
    { id: "dept-6", name: "Emergency", head: "Dr. Ahmed Hassan", staffCount: 28, activePatients: 15, description: "Emergency and trauma care" },
    { id: "dept-7", name: "Orthopedics", head: "Dr. Tom Brown", staffCount: 14, activePatients: 19, description: "Musculoskeletal system care" },
    { id: "dept-8", name: "Neurology", head: "Dr. Nina Patel", staffCount: 10, activePatients: 16, description: "Nervous system disorders" },
];

export const mockAllUsers = [
    { id: "usr-001", name: "Sarah Mitchell", email: "admin@medhub.com", role: "Admin", department: "Administration", status: "active", lastLogin: "2026-03-10" },
    { id: "usr-002", name: "Dr. David Chen", email: "dr.chen@medhub.com", role: "Doctor", department: "Internal Medicine", status: "active", lastLogin: "2026-03-10" },
    { id: "usr-003", name: "Emily Johnson", email: "patient@medhub.com", role: "Patient", department: "—", status: "active", lastLogin: "2026-03-09" },
    { id: "usr-004", name: "Maria Garcia", email: "nurse@medhub.com", role: "Nurse", department: "Ward A", status: "active", lastLogin: "2026-03-10" },
    { id: "usr-005", name: "James Wilson", email: "lab@medhub.com", role: "Lab Tech", department: "Clinical Lab", status: "active", lastLogin: "2026-03-09" },
    { id: "usr-006", name: "Lisa Park", email: "radiology@medhub.com", role: "Radiologist", department: "Radiology", status: "active", lastLogin: "2026-03-08" },
    { id: "usr-007", name: "Ahmed Hassan", email: "pharmacy@medhub.com", role: "Pharmacist", department: "Pharmacy", status: "active", lastLogin: "2026-03-10" },
    { id: "usr-008", name: "Rachel Kim", email: "billing@medhub.com", role: "Billing Staff", department: "Finance", status: "inactive", lastLogin: "2026-03-05" },
    { id: "usr-009", name: "Tom Brown", email: "frontdesk@medhub.com", role: "Front Desk", department: "Reception", status: "active", lastLogin: "2026-03-10" },
    { id: "usr-010", name: "Dr. Nina Patel", email: "dr.patel@medhub.com", role: "Doctor", department: "Neurology", status: "active", lastLogin: "2026-03-10" },
    { id: "usr-011", name: "Carlos Rivera", email: "nurse2@medhub.com", role: "Nurse", department: "Ward B", status: "active", lastLogin: "2026-03-10" },
    { id: "usr-012", name: "Dr. Sarah Kim", email: "dr.kim@medhub.com", role: "Doctor", department: "Surgery", status: "active", lastLogin: "2026-03-09" },
];

export const mockRecentActivity = [
    { id: 1, action: "New patient registered", user: "Tom Brown", timestamp: "2 min ago", type: "info" as const },
    { id: 2, action: "Lab results published", user: "James Wilson", timestamp: "15 min ago", type: "success" as const },
    { id: 3, action: "Emergency admission", user: "Maria Garcia", timestamp: "32 min ago", type: "warning" as const },
    { id: 4, action: "Prescription dispensed", user: "Ahmed Hassan", timestamp: "1 hr ago", type: "success" as const },
    { id: 5, action: "System backup completed", user: "System", timestamp: "2 hrs ago", type: "info" as const },
    { id: 6, action: "User account deactivated", user: "Sarah Mitchell", timestamp: "3 hrs ago", type: "warning" as const },
];
