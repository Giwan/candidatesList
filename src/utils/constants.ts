export const tableHeaderConstants = {
    firstName: "First name",
    lastName: "Last name",
    email: "Email",
    age: "Age",
    yearsOfExperience: "Years of experience",
    positionApplied: "Position applied",
    applicationDate: "Date of application",
    status: "status of application",
}

export const sortHeaders = [
    tableHeaderConstants.positionApplied,
    tableHeaderConstants.applicationDate,
    tableHeaderConstants.yearsOfExperience
];

export type tableHeaderConstantsType = {
    firstName: string;
    lastName: string;
    email: string;
    age: string;
    yearsOfExperience: number;
    positionApplied: string;
    applicationDate: string;
    status: string;
}