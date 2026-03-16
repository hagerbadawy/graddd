import {
    LayoutDashboard,
    Users,
    Building2,
    Stethoscope,
    CalendarDays,
    ClipboardList,
    Heart,
    FlaskConical,
    ScanLine,
    Pill,
    Receipt,
    BrainCircuit,
    UserCog,
    BedDouble,
    FileText,
    Activity,
    Settings,
    type LucideIcon,
} from "lucide-react";
import { UserRole } from "@/types";

export interface NavItem {
    title: string;
    href: string;
    icon: LucideIcon;
    badge?: string;
}

export interface NavSection {
    label: string;
    items: NavItem[];
}

export const roleNavigation: Record<UserRole, NavSection[]> = {
    [UserRole.ADMIN]: [
        {
            label: "Overview",
            items: [
                { title: "Dashboard", href: "/admin", icon: LayoutDashboard },
            ],
        },
        {
            label: "Management",
            items: [
                { title: "Users", href: "/admin/users", icon: Users },
                { title: "Departments", href: "/admin/departments", icon: Building2 },
                { title: "Settings", href: "/admin/settings", icon: Settings },
            ],
        },
    ],

    [UserRole.DOCTOR]: [
        {
            label: "Overview",
            items: [
                { title: "Dashboard", href: "/doctor", icon: LayoutDashboard },
            ],
        },
        {
            label: "Clinical",
            items: [
                { title: "Clinic Schedule", href: "/doctor/schedule", icon: CalendarDays },
                { title: "My Patients", href: "/doctor/patients", icon: Users },
            ],
        },
        {
            label: "Charting",
            items: [
                { title: "Encounters", href: "/doctor/encounters/new", icon: ClipboardList },
                { title: "Orders", href: "/doctor/orders", icon: FlaskConical },
                { title: "Prescriptions", href: "/doctor/prescriptions", icon: Pill },
            ],
        },
        {
            label: "Inbox",
            items: [
                { title: "Results Review", href: "/doctor/results", icon: Activity },
            ],
        },
    ],

    [UserRole.PATIENT]: [
        {
            label: "Overview",
            items: [
                { title: "Dashboard", href: "/patient", icon: LayoutDashboard },
            ],
        },
        {
            label: "My Health",
            items: [
                { title: "Appointments", href: "/patient/appointments", icon: CalendarDays },
                { title: "Medical Records", href: "/patient/records", icon: FileText },
                { title: "Prescriptions", href: "/patient/prescriptions", icon: Pill },
                { title: "Vitals", href: "/patient/vitals", icon: Activity },
            ],
        },
    ],

    [UserRole.NURSE]: [
        {
            label: "Overview",
            items: [
                { title: "Dashboard", href: "/nurse", icon: LayoutDashboard },
            ],
        },
        {
            label: "Bedside",
            items: [
                { title: "Ward Census", href: "/nurse/ward", icon: BedDouble },
                { title: "Vitals Flowsheet", href: "/nurse/vitals", icon: Heart },
                { title: "Med Admin", href: "/nurse/medications", icon: Pill },
            ],
        },
        {
            label: "Documentation",
            items: [
                { title: "Nursing Notes", href: "/nurse/notes", icon: FileText },
                { title: "Handoff", href: "/nurse/handoff", icon: ClipboardList },
                { title: "Discharge Checklist", href: "/nurse/discharge", icon: Activity },
            ],
        },
    ],

    [UserRole.LAB_TECH]: [
        {
            label: "Overview",
            items: [
                { title: "Dashboard", href: "/lab", icon: LayoutDashboard },
            ],
        },
        {
            label: "Pre-Analytical",
            items: [
                { title: "Worklist", href: "/lab/worklist", icon: ClipboardList },
                { title: "Accessioning", href: "/lab/accessioning", icon: ScanLine },
                { title: "Specimens", href: "/lab/specimens", icon: FlaskConical },
            ],
        },
        {
            label: "Analytical & Post",
            items: [
                { title: "Analyzer Queue", href: "/lab/analyzer", icon: Activity },
                { title: "Result Entry", href: "/lab/results", icon: FileText },
                { title: "Verification", href: "/lab/verification", icon: ClipboardList },
                { title: "Critical Results", href: "/lab/critical", icon: Heart },
            ],
        },
    ],

    [UserRole.RADIOLOGIST]: [
        {
            label: "Overview",
            items: [
                { title: "Dashboard", href: "/radiology", icon: LayoutDashboard },
            ],
        },
        {
            label: "Imaging",
            items: [
                { title: "Orders", href: "/radiology/orders", icon: ScanLine },
                { title: "Reports", href: "/radiology/reports", icon: FileText },
            ],
        },
    ],

    [UserRole.PHARMACIST]: [
        {
            label: "Overview",
            items: [
                { title: "Dashboard", href: "/pharmacy", icon: LayoutDashboard },
            ],
        },
        {
            label: "Clinical",
            items: [
                { title: "Rx Queue", href: "/pharmacy/queue", icon: Pill },
                { title: "Verification", href: "/pharmacy/verification", icon: ClipboardList },
                { title: "Interventions", href: "/pharmacy/interventions", icon: Activity },
            ],
        },
        {
            label: "Dispensing",
            items: [
                { title: "Dispense", href: "/pharmacy/dispense", icon: FlaskConical },
                { title: "Formulary", href: "/pharmacy/formulary", icon: FileText },
                { title: "Med Profiles", href: "/pharmacy/profiles", icon: Heart },
            ],
        },
    ],

    [UserRole.BILLING_STAFF]: [
        {
            label: "Overview",
            items: [
                { title: "Dashboard", href: "/billing", icon: LayoutDashboard },
            ],
        },
        {
            label: "Revenue",
            items: [
                { title: "Invoices", href: "/billing/invoices", icon: Receipt },
                { title: "Claims", href: "/billing/claims", icon: FileText },
            ],
        },
    ],

    [UserRole.FRONT_DESK]: [
        {
            label: "Overview",
            items: [
                { title: "Dashboard", href: "/frontdesk", icon: LayoutDashboard },
            ],
        },
        {
            label: "Patients",
            items: [
                { title: "Patient Search", href: "/frontdesk/patients", icon: Users },
                { title: "Register Patient", href: "/frontdesk/patients/register", icon: UserCog },
            ],
        },
        {
            label: "Operations",
            items: [
                { title: "Appointments", href: "/frontdesk/appointments", icon: CalendarDays },
                { title: "Check-In", href: "/frontdesk/checkin", icon: ClipboardList },
                { title: "ADT Board", href: "/frontdesk/admissions", icon: BedDouble },
                { title: "Queue", href: "/frontdesk/queue", icon: Activity },
            ],
        },
    ],
};
