import { setApplicantList, setError, setIsLoading } from "../features/applicant/applicantSlice";
import api from "../api/api";

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
    dispatch(setApplicantList(await networkFetchApplicantList(handleError, clearLoading)));
}

export const calculateAge = (dob: string) => {
    const _dob = new Date(dob);
    const monthDiff = Date.now() - _dob.getTime();
    const ageDiff = new Date(monthDiff);
    const year = ageDiff.getFullYear();
    return Math.abs(year - 1970);
}