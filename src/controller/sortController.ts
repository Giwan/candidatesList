import { ApplicantType, tableHeaderConstantsType } from "../types/types";
import { tableHeaderConstants } from "../utils/constants";

/**
 * Sort the list based on the years of experience
 */
export const sortYears = (direction: boolean) => (a: ApplicantType, b: ApplicantType) => {
    return direction
        ? b.experience > a.experience ? -1 : 1
        : a.experience > b.experience ? -1 : 1
};

export const sortPositionLogic = (direction: boolean, pa: string, pb: string) => pa === pb
    ? 0
    : pa < pb
        ? direction ? 1 : -1
        : direction ? -1 : 1;

/**
 * Sort the list based on the position they applied for
 */
export const sortPosition = (direction: boolean) => (a: ApplicantType, b: ApplicantType) => {
    const pa = a.position.toLowerCase();
    const pb = b.position.toLowerCase();

    return sortPositionLogic(direction, pa, pb);
}

/**
 * Sort list based on the application date. 
 */
export const sortDate = (direction: boolean) => (a: ApplicantType, b: ApplicantType): number =>
    direction
        ? +new Date(a.applicationDate) - +new Date(b.applicationDate)
        : +new Date(b.applicationDate) - +new Date(a.applicationDate)

/**
 * A reference used by the sort method 
 * to know which sort method to use 
 * for a given sort header
 */
const sortFnReference = {
    [tableHeaderConstants.experience]: sortYears,
    [tableHeaderConstants.positionApplied]: sortPosition,
    [tableHeaderConstants.applicationDate]: sortDate,
}

/**
 * generic sort method which then figures out which
 * sort method to apply based on the header selected
 */
export const sortApplicants = (key: string | undefined | null, list: ApplicantType[], sortDirection: boolean) => {
    if (!key) return list;

    if (!list) {
        throw new Error("Error: list required to complete sort");
    }
    const ref = tableHeaderConstants[key as keyof tableHeaderConstantsType];
    return [...list].sort(sortFnReference[ref](sortDirection));
}