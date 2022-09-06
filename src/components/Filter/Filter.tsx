import { useState, FormEventHandler, ChangeEvent } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { positionOptionsSelector } from "../../features/applicant/applicantSlice";
import { useAppDispatch } from "../../hooks/hooks";
import SelectFilter from "./SelectFilter";
import { filterApplicants } from "../../controller/applicantController";

const statusFilterOptionsList = ["Approved", "Reject", "Waiting"];

const Filter = () => {
    const dispatch = useAppDispatch();
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    const [nameFilter, setNameFilter] = useState(
        searchParams.get("name") || ""
    );

    const [positionFilterValue, setPositionFilter] = useState(
        searchParams.get("position") || ""
    );

    const [statusFilterValue, setStatusFilter] = useState(
        searchParams.get("status") || ""
    );

    const positionOptions = useSelector(positionOptionsSelector);

    // Store the html element value in state
    const updateFilter =
        (fn: Function) =>
        (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
            fn(e?.target?.value);

    const applyFilters: FormEventHandler = (e) => {
        e.preventDefault();
        const filters = {
            name: nameFilter,
            position: positionFilterValue,
            status: statusFilterValue,
        };
        setSearchParams(filters);
        dispatch(filterApplicants(searchParams, filters));
    };

    const clearFilter = () => {
        setNameFilter("");
        navigate("/");
    };
    return (
        <form onSubmit={applyFilters}>
            <input
                type="text"
                name="nameFilter"
                value={nameFilter}
                onChange={updateFilter(setNameFilter)}
            />
            <SelectFilter
                {...{
                    filterAction: updateFilter(setPositionFilter),
                    filterName: "positionFilter",
                    filterValue: positionFilterValue,
                    optionsList: positionOptions,
                    title: "Position",
                }}
            />
            <SelectFilter
                {...{
                    filterAction: updateFilter(setStatusFilter),
                    filterName: "statusFilter",
                    filterValue: statusFilterValue,
                    optionsList: statusFilterOptionsList,
                    title: "Status",
                }}
            />
            <button type="submit">Apply filter</button>
            <button type="reset" onClick={clearFilter}>
                Clear filters
            </button>
        </form>
    );
};

export default Filter;
