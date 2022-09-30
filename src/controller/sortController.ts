import { ApplicantType, tableHeaderConstantsType } from "../types/types";
import { sortHeaders, tableHeaderConstants } from "../utils/constants";
import { convertSortValueTokey } from "./applicantController";

/**
 * Sort the list based on the years of experience
 */
export const sortYears = (direction: boolean) => (a: ApplicantType, b: ApplicantType) => {
    const [_a, _b] = direction ? [a, b] : [b, a];
    return _a.experience > _b.experience ? -1 : 1;
};

export const sortPositionLogic = (direction: boolean, pa: string, pb: string) => {
    if (pa === pb) return 0;
    const [_pa, _pb] = direction ? [pa, pb] : [pb, pa];
    return _pa < _pb ? 1 : -1;
}

/**
 * Sort the list based on the position they applied for
 */
export const sortPosition = (direction: boolean) => (a: ApplicantType, b: ApplicantType) => {
    const [pa, pb] = [a, b].map(x => x.position.toLowerCase());
    return sortPositionLogic(direction, pa, pb);
}

export const _sortDate = (dir: boolean) => (d1: string, d2: string) => {
    const _d1 = +new Date(d1), _d2 = +new Date(d2);
    if (_d1 === _d2) return 0;

    // reverse the dates based on the direction
    const [_dd1, _dd2] = dir ? [_d1, _d2] : [_d2, _d1];
    return _dd1 > _dd2 ? 1 : -1;
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