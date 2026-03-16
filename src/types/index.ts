// User roles for the virtual hospital
export enum UserRole {
  ADMIN = "admin",
  DOCTOR = "doctor",
  PATIENT = "patient",
  NURSE = "nurse",
  LAB_TECH = "lab_tech",
  RADIOLOGIST = "radiologist",
  PHARMACIST = "pharmacist",
  BILLING_STAFF = "billing_staff",
  FRONT_DESK = "front_desk",
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  avatar?: string;
  department?: string;
}

export type AppointmentStatus = "scheduled" | "in-progress" | "completed" | "cancelled" | "no-show";
export type PatientStatus = "active" | "discharged" | "critical" | "stable" | "admitted";
export type OrderStatus = "pending" | "in-progress" | "completed" | "cancelled";
export type Priority = "low" | "normal" | "high" | "urgent" | "stat";

export interface Patient {
  id: string;
  mrn: string; // Medical Record Number
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: "male" | "female" | "other";
  phone: string;
  email: string;
  address: string;
  bloodType?: string;
  allergies?: string[];
  status: PatientStatus;
  insuranceProvider?: string;
  insuranceId?: string;
  admissionDate?: string;
  assignedDoctor?: string;
  ward?: string;
  roomNumber?: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  department: string;
  date: string;
  time: string;
  duration: number; // minutes
  status: AppointmentStatus;
  type: "consultation" | "follow-up" | "procedure" | "telemedicine";
  notes?: string;
}

export interface Vital {
  id: string;
  patientId: string;
  timestamp: string;
  bloodPressureSystolic: number;
  bloodPressureDiastolic: number;
  heartRate: number;
  temperature: number;
  oxygenSaturation: number;
  respiratoryRate: number;
  recordedBy: string;
}

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  route: string;
  startDate: string;
  endDate?: string;
  prescribedBy: string;
  status: "active" | "discontinued" | "completed";
}

export interface LabOrder {
  id: string;
  patientId: string;
  patientName: string;
  orderedBy: string;
  testName: string;
  priority: Priority;
  status: OrderStatus;
  orderedAt: string;
  completedAt?: string;
  results?: string;
}

export interface Department {
  id: string;
  name: string;
  head: string;
  staffCount: number;
  activePatients: number;
  description?: string;
}

// ── ADT / Front Desk Types ──────────────────────────────────────────

export interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
}

export interface Insurance {
  id: string;
  provider: string;
  policyNumber: string;
  groupNumber?: string;
  validFrom: string;
  validTo: string;
  copay?: number;
  coverageType: "full" | "partial" | "none";
}

export interface ADTPatient extends Patient {
  emergencyContact?: EmergencyContact;
  nationality?: string;
  maritalStatus?: "single" | "married" | "divorced" | "widowed";
  preferredLanguage?: string;
  consentSigned: boolean;
  registeredAt: string;
  insurance?: Insurance;
}

export type BedStatus = "available" | "occupied" | "reserved" | "maintenance";
export type BedType = "general" | "semi-private" | "private" | "icu";

export interface BedInfo {
  bedId: string;
  ward: string;
  roomNumber: string;
  bedNumber: string;
  type: BedType;
  status: BedStatus;
  patientId?: string;
  patientName?: string;
}

export type AdmissionType = "inpatient" | "outpatient" | "emergency" | "observation";
export type AdmissionStatus = "admitted" | "transferred" | "discharged" | "pending";

export interface Admission {
  id: string;
  patientId: string;
  patientName: string;
  mrn: string;
  type: AdmissionType;
  admittingDoctor: string;
  department: string;
  ward?: string;
  bed?: string;
  reasonForAdmission: string;
  admittedAt: string;
  status: AdmissionStatus;
  expectedDischarge?: string;
}

export type DischargeType = "home" | "transfer" | "ama" | "expired";

export interface Discharge {
  id: string;
  admissionId: string;
  patientId: string;
  patientName: string;
  dischargeType: DischargeType;
  summary: string;
  followUpDate?: string;
  dischargedBy: string;
  dischargedAt: string;
}

export interface Transfer {
  id: string;
  admissionId: string;
  patientId: string;
  patientName: string;
  fromWard: string;
  fromBed: string;
  toWard: string;
  toBed: string;
  reason: string;
  approvedBy: string;
  transferredAt: string;
}

export type ServiceType = "registration" | "insurance" | "lab" | "radiology" | "pharmacy" | "consultation" | "billing";
export type QueueStatus = "waiting" | "serving" | "called" | "completed" | "no-show";

export interface QueueEntry {
  id: string;
  ticketNo: string;
  patientId: string;
  patientName: string;
  service: ServiceType;
  priority: Priority;
  status: QueueStatus;
  waitingSince: string;
  window?: string;
  estimatedWait?: number; // minutes
}

export interface ConsentDocument {
  id: string;
  patientId: string;
  type: "general" | "surgery" | "anesthesia" | "hipaa" | "financial";
  signedAt?: string;
  signedBy?: string;
  fileUrl?: string;
  status: "pending" | "signed" | "declined";
}

export interface DuplicateCandidate {
  patientA: Pick<Patient, "id" | "mrn" | "firstName" | "lastName" | "dateOfBirth" | "phone">;
  patientB: Pick<Patient, "id" | "mrn" | "firstName" | "lastName" | "dateOfBirth" | "phone">;
  matchScore: number; // 0–100
  matchReasons: string[];
}

// ── Doctor Portal Types ─────────────────────────────────────────────

export type DiagnosisType = "primary" | "secondary" | "admitting" | "differential";

export interface Diagnosis {
  id: string;
  patientId: string;
  code: string; // ICD-10
  description: string;
  type: DiagnosisType;
  diagnosedAt: string;
  diagnosedBy: string;
  status: "active" | "resolved" | "ruled-out";
}

export type EncounterStatus = "in-progress" | "completed" | "signed" | "amended";

export interface Encounter {
  id: string;
  patientId: string;
  patientName: string;
  date: string;
  subjective: string;
  objective: string;
  assessment: string;
  plan: string;
  status: EncounterStatus;
  authorId: string;
  authorName: string;
  signedAt?: string;
  visitType: "inpatient" | "outpatient" | "emergency" | "telemedicine";
}

export type ProcedureStatus = "scheduled" | "in-progress" | "completed" | "cancelled";

export interface Procedure {
  id: string;
  patientId: string;
  code: string; // CPT
  name: string;
  scheduledDate: string;
  performedDate?: string;
  status: ProcedureStatus;
  performer: string;
  notes?: string;
}

export type OrderCategory = "lab" | "imaging" | "consult" | "procedure";

export interface OrderItem {
  id: string;
  patientId: string;
  patientName: string;
  category: OrderCategory;
  name: string;
  orderedBy: string;
  orderedAt: string;
  priority: Priority;
  status: OrderStatus;
  notes?: string;
  results?: string;
  completedAt?: string;
}

export interface Prescription {
  id: string;
  patientId: string;
  patientName: string;
  medication: string;
  dosage: string;
  route: "oral" | "iv" | "im" | "topical" | "inhaled" | "sublingual";
  frequency: string;
  quantity: number;
  refills: number;
  sig: string; // directions
  prescribedBy: string;
  prescribedAt: string;
  startDate: string;
  endDate?: string;
  status: "active" | "discontinued" | "completed" | "on-hold";
}

export type ReferralUrgency = "routine" | "urgent" | "stat";

export interface Referral {
  id: string;
  patientId: string;
  patientName: string;
  fromDoctor: string;
  toDoctor: string;
  toDepartment: string;
  reason: string;
  urgency: ReferralUrgency;
  status: "pending" | "accepted" | "completed" | "declined";
  createdAt: string;
}

export type ResultFlag = "normal" | "high" | "low" | "critical";

export interface ResultItem {
  id: string;
  patientId: string;
  patientName: string;
  orderId: string;
  category: "lab" | "imaging";
  testName: string;
  value?: string;
  unit?: string;
  referenceRange?: string;
  flag: ResultFlag;
  reportedAt: string;
  reviewedBy?: string;
  reviewedAt?: string;
  notes?: string;
}

// ── Ward / Nursing Portal Types ─────────────────────────────────────

export interface VitalEntry {
  id: string;
  patientId: string;
  patientName: string;
  timestamp: string;
  systolic: number;
  diastolic: number;
  heartRate: number;
  temperature: number; // °F
  spo2: number;
  respiratoryRate: number;
  painScore?: number; // 0-10
  gcs?: number; // Glasgow Coma Scale 3-15
  recordedBy: string;
  notes?: string;
}

export type IOType = "oral" | "iv" | "blood" | "urine" | "drain" | "emesis" | "stool" | "ng";
export type IODirection = "intake" | "output";

export interface IntakeOutput {
  id: string;
  patientId: string;
  patientName: string;
  timestamp: string;
  direction: IODirection;
  type: IOType;
  amount: number; // mL
  recordedBy: string;
  notes?: string;
}

export interface PainEntry {
  id: string;
  patientId: string;
  timestamp: string;
  score: number; // 0-10
  location: string;
  quality: "sharp" | "dull" | "burning" | "throbbing" | "aching" | "stabbing";
  intervention?: string;
  reassessScore?: number;
  reassessTime?: string;
  recordedBy: string;
}

export type WoundType = "surgical" | "pressure" | "laceration" | "burn" | "iv-site" | "drain" | "catheter";

export interface WoundNote {
  id: string;
  patientId: string;
  patientName: string;
  type: WoundType;
  location: string;
  stage?: string;
  size?: string;
  description: string;
  care: string;
  timestamp: string;
  recordedBy: string;
}

export type MARStatus = "scheduled" | "given" | "missed" | "held" | "refused" | "overdue";

export interface MAREntry {
  id: string;
  patientId: string;
  patientName: string;
  medication: string;
  dosage: string;
  route: string;
  scheduledTime: string;
  administeredTime?: string;
  administeredBy?: string;
  status: MARStatus;
  barcode?: string;
  notes?: string;
}

export type NursingTaskType = "vitals" | "medication" | "assessment" | "wound-care" | "io-check" | "ambulation" | "education" | "discharge" | "other";
export type NursingTaskStatus = "pending" | "in-progress" | "completed" | "overdue" | "cancelled";

export interface NursingTask {
  id: string;
  patientId: string;
  patientName: string;
  room: string;
  type: NursingTaskType;
  description: string;
  priority: Priority;
  dueTime: string;
  completedTime?: string;
  completedBy?: string;
  status: NursingTaskStatus;
  isOverdue: boolean;
}

export type NursingNoteCategory = "assessment" | "care" | "education" | "communication" | "safety" | "procedure";

export interface NursingNote {
  id: string;
  patientId: string;
  patientName: string;
  category: NursingNoteCategory;
  content: string;
  timestamp: string;
  authorName: string;
}

export interface HandoffEntry {
  id: string;
  patientId: string;
  patientName: string;
  room: string;
  situation: string;
  background: string;
  assessment: string;
  recommendation: string;
  fromNurse: string;
  toNurse: string;
  shiftDate: string;
  shiftType: "day" | "evening" | "night";
}

export interface DischargeChecklistItem {
  id: string;
  patientId: string;
  category: "medical" | "nursing" | "pharmacy" | "education" | "social" | "transport";
  description: string;
  completed: boolean;
  completedBy?: string;
  completedAt?: string;
  notes?: string;
}

// ── Laboratory / LIS Portal Types ───────────────────────────────────

export type SpecimenType = "blood" | "serum" | "plasma" | "urine" | "csf" | "stool" | "swab" | "tissue" | "other";
export type SpecimenStatus = "ordered" | "collected" | "in-transit" | "received" | "processing" | "analyzed" | "resulted" | "rejected";
export type SpecimenCondition = "acceptable" | "hemolyzed" | "lipemic" | "icteric" | "clotted" | "insufficient" | "wrong-tube";

export interface Specimen {
  id: string;
  barcode: string;
  patientId: string;
  patientName: string;
  type: SpecimenType;
  collectionTime?: string;
  collectedBy?: string;
  receivedAt?: string;
  status: SpecimenStatus;
  condition: SpecimenCondition;
  orderId: string;
  testNames: string[];
  notes?: string;
}

export type LabResultFlag = "normal" | "high" | "low" | "critical-high" | "critical-low";

export interface LabTestResult {
  id: string;
  specimenId: string;
  testCode: string;
  testName: string;
  value: string;
  unit: string;
  referenceRange: string;
  flag: LabResultFlag;
  previousValue?: string;
  delta?: string;
  method?: string;
  analyzedAt?: string;
  verifiedBy?: string;
  verifiedAt?: string;
  status: "pending" | "preliminary" | "final" | "corrected" | "cancelled";
}

export interface LabPanel {
  id: string;
  name: string;
  code: string;
  specimenId: string;
  patientId: string;
  patientName: string;
  orderedBy: string;
  orderedAt: string;
  results: LabTestResult[];
  status: "pending" | "partial" | "complete" | "verified" | "released";
  turnaroundMinutes?: number;
}

export interface AccessionRecord {
  id: string;
  accessionNumber: string;
  specimenId: string;
  patientId: string;
  patientName: string;
  mrn: string;
  specimenType: SpecimenType;
  receivedBy: string;
  receivedAt: string;
  condition: SpecimenCondition;
  testNames: string[];
  status: "accessioned" | "rejected" | "recollect-requested";
  notes?: string;
}

export interface AnalyzerQueueItem {
  id: string;
  instrument: string;
  specimenBarcode: string;
  specimenId: string;
  patientName: string;
  testName: string;
  priority: Priority;
  queuePosition: number;
  estimatedMinutes?: number;
  status: "queued" | "loading" | "running" | "completed" | "error";
  startedAt?: string;
}

export interface RecollectionRequest {
  id: string;
  originalSpecimenId: string;
  patientId: string;
  patientName: string;
  reason: "hemolyzed" | "clotted" | "insufficient" | "wrong-tube" | "contaminated" | "expired" | "other";
  requestedBy: string;
  requestedAt: string;
  notes?: string;
  resolved: boolean;
  newSpecimenId?: string;
}

export type LabReportStatus = "draft" | "preliminary" | "final" | "amended" | "cancelled";

export interface LabReport {
  id: string;
  patientId: string;
  patientName: string;
  mrn: string;
  panelId: string;
  panelName: string;
  results: LabTestResult[];
  status: LabReportStatus;
  orderedBy: string;
  orderedAt: string;
  authorizedBy?: string;
  authorizedAt?: string;
  releasedAt?: string;
  hasCritical: boolean;
  criticalNotifiedTo?: string;
  criticalNotifiedAt?: string;
}

// ── Pharmacy Portal Types ───────────────────────────────────────────

export type RxStatus = "ordered" | "pending-verification" | "verified" | "dispensing" | "dispensed" | "on-hold" | "cancelled" | "returned";
export type RxSetting = "inpatient" | "outpatient" | "discharge";
export type WarningSeverity = "info" | "moderate" | "severe" | "contraindicated";
export type WarningType = "interaction" | "allergy" | "duplication" | "dose-range" | "renal" | "pregnancy" | "pediatric";

export interface PharmacyPrescription {
  id: string;
  patientId: string;
  patientName: string;
  mrn: string;
  medication: string;
  genericName: string;
  dosage: string;
  route: string;
  frequency: string;
  quantity: number;
  refillsAllowed: number;
  refillsRemaining: number;
  setting: RxSetting;
  priority: Priority;
  status: RxStatus;
  prescribedBy: string;
  prescribedAt: string;
  verifiedBy?: string;
  verifiedAt?: string;
  dispensedBy?: string;
  dispensedAt?: string;
  warnings: DrugWarning[];
  allergies: string[];
  notes?: string;
}

export interface DrugWarning {
  id: string;
  type: WarningType;
  severity: WarningSeverity;
  title: string;
  description: string;
  interactingDrug?: string;
  overridable: boolean;
  overriddenBy?: string;
  overriddenAt?: string;
}

export type FormularyStatus = "formulary" | "non-formulary" | "restricted" | "investigational";

export interface FormularyItem {
  id: string;
  genericName: string;
  brandNames: string[];
  drugClass: string;
  form: string;
  strengths: string[];
  formularyStatus: FormularyStatus;
  stockLevel: number;
  reorderPoint: number;
  unitCost: number;
  requiresPriorAuth: boolean;
  controlledSchedule?: string;
  notes?: string;
}

export interface DispenseRecord {
  id: string;
  prescriptionId: string;
  patientName: string;
  medication: string;
  dosage: string;
  quantityDispensed: number;
  lotNumber: string;
  expirationDate: string;
  dispensedBy: string;
  dispensedAt: string;
  setting: RxSetting;
  verifiedBy: string;
  labelPrinted: boolean;
  barcodeScan: boolean;
}

export type InterventionType = "dose-adjustment" | "drug-change" | "frequency-change" | "discontinue" | "clarification" | "therapeutic-substitution" | "monitoring";
export type InterventionOutcome = "accepted" | "rejected" | "modified" | "pending";

export interface InterventionRecord {
  id: string;
  prescriptionId: string;
  patientName: string;
  medication: string;
  type: InterventionType;
  reason: string;
  recommendation: string;
  prescriberContact: string;
  outcome: InterventionOutcome;
  pharmacistName: string;
  createdAt: string;
  resolvedAt?: string;
  prescriberResponse?: string;
}

export interface RefillRecord {
  id: string;
  prescriptionId: string;
  patientName: string;
  medication: string;
  dosage: string;
  refillNumber: number;
  totalRefills: number;
  dispensedDate: string;
  quantity: number;
  pharmacist: string;
  daysSupply: number;
  nextRefillDate?: string;
}

export type SubstitutionStatus = "pending" | "approved" | "rejected";

export interface SubstitutionRequest {
  id: string;
  prescriptionId: string;
  patientName: string;
  originalMedication: string;
  substituteMedication: string;
  reason: "generic-available" | "formulary-preference" | "cost-savings" | "shortage" | "therapeutic-equivalent";
  status: SubstitutionStatus;
  requestedBy: string;
  requestedAt: string;
  approvedBy?: string;
  approvedAt?: string;
  costSavings?: number;
}
