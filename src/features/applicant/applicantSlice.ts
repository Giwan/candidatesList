import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';

export type ErrorType = {
    title: string;
    error: object
}

export type ApplicantType = {
    id: number;
    name: string;
    email: string;
    birth_date: string;
    year_of_experience: number;
    position_applied: string;
    application_date: string;
    status: "approved" | "rejected" | "waiting";
}

type InitialStateType = {
    applicantList: ApplicantType[] | undefined;
    nameFilter: string | undefined;
    statusFilter: string | undefined;
    positionFilter: string | undefined;
    isLoading: boolean;
    error: ErrorType | undefined
}

const initialState: InitialStateType = {
    applicantList: undefined,
    nameFilter: undefined,
    statusFilter: undefined,
    positionFilter: undefined,
    isLoading: false,
    error: undefined
}

export const applicantSlice = createSlice({
    name: "applicant",
    initialState,
    reducers: {
        setApplicantList(state, { payload }) {
            state.applicantList = payload.candidates;
            state.error = undefined;
        },
        setNameFilter(state, { payload }) {
            /all/i.test(payload)
                ? state.nameFilter = undefined
                : state.nameFilter = payload
        },
        setStatusFilter(state, { payload }) {
            /all/i.test(payload)
                ? state.statusFilter = undefined
                : state.statusFilter = payload
        },
        setPositionFilter(state, { payload }) {
            /all/i.test(payload)
                ? state.positionFilter = undefined
                : state.positionFilter = payload
        },
        clearFilters(state) {
            state.nameFilter = undefined;
            state.statusFilter = undefined;
            state.positionFilter = undefined;
        },
        setIsLoading(state, { payload }) {
            state.isLoading = Boolean(payload)
        },
        setError(state, { payload }) {
            state.error = payload
        }
    }
});

export const {
    setApplicantList,
    setNameFilter,
    setStatusFilter,
    setPositionFilter,
    clearFilters,
    setIsLoading,
    setError
} = applicantSlice.actions;

export default applicantSlice.reducer;

export const applicantListSelector = (state: RootState) => state?.applicantReducer?.applicantList || [];
export const errorSelector = (state: RootState) => state?.applicantReducer?.error;