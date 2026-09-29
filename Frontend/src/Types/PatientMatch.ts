export type PatientMatch = {
    mrn: string;
    name: string;
    dob: string;
    age: number;
    efRatio: number;
    efReduced: boolean;
    admitDate: string;
    matchScore: number;
};
