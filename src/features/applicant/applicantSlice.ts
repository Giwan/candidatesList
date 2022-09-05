import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';
import { InitialStateType } from '../../types/types';
import { ApplicantType } from '../../types/types';

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
    const nameFilter = searchParams.get("name");
    const statusFilter = searchParams.get("status");
    const positionFilter = searchParams.get("position");

    applicantList = filterByName(applicantList, nameFilter);
    applicantList = filterByPosition(applicantList, positionFilter);
    applicantList = filterByStatus(applicantList, statusFilter);

    return applicantList;
}
export const errorSelector = (state: RootState) => state?.applicantReducer?.error;

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