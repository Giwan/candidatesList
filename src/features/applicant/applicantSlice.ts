import { createSlice } from '@reduxjs/toolkit';
import { getPositionOptions } from '../../controller/applicantController';
import { RootState } from '../../store/store';
import { InitialStateType } from '../../types/types';
import { sortApplicants, convertSortKey, convertSortDirection } from '../../controller/sortController';

const initialState: InitialStateType = {
    applicantList: undefined,
    applicantFilteredList: undefined,
    positionOptions: undefined,
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
            state.applicantList = payload;
            state.error = undefined;
            state.positionOptions = getPositionOptions(payload);
        },
        setFilteredList(state, { payload }) {
            state.applicantFilteredList = payload;
            state.positionOptions = getPositionOptions(payload);
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
            state.applicantFilteredList = undefined;
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
    setFilteredList,
    setNameFilter,
    setStatusFilter,
    setPositionFilter,
    clearFilters,
    setIsLoading,
    setError
} = applicantSlice.actions;

export default applicantSlice.reducer;

export const applicantListSelector = (state: RootState) => {
    return state?.applicantReducer?.applicantList || [];
}
export const applicantFilteredListSelector = (searchParams: URLSearchParams) => (state: RootState) => {

    const _list = state?.applicantReducer?.applicantFilteredList
        || state?.applicantReducer?.applicantList
        || [];

    return sortApplicants(
        convertSortKey(searchParams.get("sort")),
        _list,
        convertSortDirection(searchParams.get("sortDirection"))
    )

}
export const errorSelector = (state: RootState) => state?.applicantReducer?.error;

export const positionOptionsSelector = (state: RootState) => state?.applicantReducer?.positionOptions || [];