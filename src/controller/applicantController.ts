import { setApplicantList, setError, setIsLoading } from "../features/applicant/applicantSlice";
import api from "../api/api";
import { tableHeaderConstants, } from "../utils/constants";
import { tableHeaderConstantsType, ApplicantType, FiltersType } from "../types/types";
import { setFilteredList } from "../features/applicant/applicantSlice";


export const networkFetchApplicantList = async function (handleError: Function, clearLoading: Function) {
    try {

        const resp = await fetch(api.candidates());
        if (!resp.ok) {
            throw new Error("Failed to fetch applicants")
        }
        const data = await resp.json();

        if (data && data.error) {
            throw new Error(data.error);
        }

        return data;

    } catch (error: Error | unknown) {
        handleError(error);
    } finally {
        clearLoading();
    }
}

/**
 * Redux action that fetches the list of applicants.
 */
export const fetchApplicantList = ({ force = false } = {}) => async function (dispatch: Function, getState: Function) {

    const { applicantsList, isLoading } = getState().applicantReducer;
    if (((applicantsList && applicantsList.length > 0) || isLoading) && !force) return;

    dispatch(setIsLoading(true));
    dispatch(setError(undefined));

    const handleError = (error: Error | unknown) => dispatch(setError({
        title: "Failed to load applicants",
        //@ts-ignore
        error: error?.message || error
    }));

    const clearLoading = () => dispatch(setIsLoading(false));
    const list = await networkFetchApplicantList(handleError, clearLoading);
    list && dispatch(setApplicantList(list?.candidates));
}

export const filterApplicants = (searchParams: URLSearchParams, filters: FiltersType) => (dispatch: Function, getState: Function) => {
    let applicantList = getState().applicantReducer.applicantList;
    const nameFilter = filters.name || searchParams.get("name");
    const statusFilter = filters.status || searchParams.get("status");
    const positionFilter = filters.position || searchParams.get("position");

    applicantList = filterByName(applicantList, nameFilter);
    applicantList = filterByPosition(applicantList, positionFilter);
    applicantList = filterByStatus(applicantList, statusFilter);

    dispatch(setFilteredList(applicantList));
}

export const filterByName = (list: ApplicantType[], nameFilter: string | null) => {
    if (!nameFilter) return list;

    return list.filter(({ firstName, lastName }) => {
        const _re = new RegExp(nameFilter, "i");
        return _re.test(firstName) || _re.test(lastName);
    });
}

export const filterByStatus = (list: ApplicantType[], statusFilter: string | null) => {
    if (!statusFilter || list.length < 1 || /all/i.test(statusFilter)) return list;

    return list.filter(({ statusOfApplication }) => {
        return statusOfApplication.match(new RegExp(statusFilter, "i"));
    });
}

export const filterByPosition = (list: ApplicantType[], positionFilter: string | null) => {
    if (!positionFilter || list.length < 1) return list;

    return list.filter(({ position }) => position.match(new RegExp(positionFilter, "i")))
}

// -----

export const _calculateAge = (currentDate: number, dob: string) => {
    const monthDiff = currentDate - new Date(dob).getTime();
    return new Date(monthDiff).getFullYear() - 1970;
}

export const calculateAge = (dob: string) => {
    return _calculateAge(Date.now(), dob)
}

export const convertSortValueTokey = (value: string) => {
    for (const key in tableHeaderConstants) {
        if (tableHeaderConstants[key as keyof tableHeaderConstantsType] === value) return key;
    }
    return value;
}

export const getPositionOptions = (list: ApplicantType[]) => {
    return list.reduce((previous, current) => {
        if (!previous.includes(current.position)) previous.push(current.position);
        return previous;

    }, [] as string[])
}