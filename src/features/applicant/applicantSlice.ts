import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';
import { InitialStateType } from '../../types/types';

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

export const applicantListSelector = (searchParams: URLSearchParams) => (state: RootState) => {
    let applicantList = state?.applicantReducer?.applicantList || [];
    const nameFilter = searchParams.get("nameFilter");
    if (nameFilter) {
        applicantList = applicantList.filter(({ firstName, lastName }) => {
            const _re = new RegExp(nameFilter, "i");
            return _re.test(firstName) || _re.test(lastName);
        })
    }

    return applicantList;
}
export const errorSelector = (state: RootState) => state?.applicantReducer?.error;