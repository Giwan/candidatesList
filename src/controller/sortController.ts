import { ApplicantType, tableHeaderConstantsType } from "../types/types";
import { sortHeaders, tableHeaderConstants } from "../utils/constants";
import { convertSortValueTokey } from "./applicantController";

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

export const _sortDate = (dir: boolean) => (d1: string, d2: string) => {
    const _d1 = +new Date(d1), _d2 = +new Date(d2);
    const result = _d1 === _d2
        ? 0 : _d1 > _d2
            ? dir ? 1 : -1
            : dir ? -1 : 1;

    return result;
}

/**
 * Sort list based on the application date. 
 */
export const sortDate = (direction: boolean) =>
    (a: ApplicantType, b: ApplicantType): number =>
        _sortDate(direction)(a.dateOfApplication, b.dateOfApplication)

/**
 * A reference used by the sort method 
 * to know which sort method to use 
 * for a given sort header
 */
const sortFnReference = {
    [tableHeaderConstants.experience]: sortYears,
    [tableHeaderConstants.positionApplied]: sortPosition,
    [tableHeaderConstants.dateOfApplication]: sortDate,
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

export const identifySortKey = (sortKey: string, header: string) => sortKey && new RegExp(sortKey, "i").test(convertSortValueTokey(header));
export const canSort = (header: string) => sortHeaders.includes(header);

export const convertSortKey = (val: unknown): string => (!val ? "" : String(val));
export const convertSortDirection = (val: string | undefined | null): boolean =>
    Boolean(!val || val === "false");