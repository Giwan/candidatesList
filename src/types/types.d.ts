export type ErrorType = {
    title: string;
    error: object
}

export type ApplicantType = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    birthDate: string;
    experience: number;
    position: string;
    dateOfApplication: string;
    statusOfApplication: "approved" | "rejected" | "waiting";
}

type InitialStateType = {
    applicantList: ApplicantType[] | undefined;
    applicantFilteredList: ApplicantType[] | undefined;
    positionOptions: string[] | undefined;
    nameFilter: string | undefined;
    statusFilter: string | undefined;
    positionFilter: string | undefined;
    isLoading: boolean;
    error: ErrorType | undefined
}

export type tableHeaderConstantsType = {
    firstName: string;
    lastName: string;
    email: string;
    age: string;
    experience: number;
    positionApplied: string;
    dateOfApplication: string;
    status: string;
}

export type FiltersType = {
    name: string;
    position: string;
    status: string;
}