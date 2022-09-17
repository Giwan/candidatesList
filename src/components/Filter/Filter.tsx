import { useState, FormEventHandler, ChangeEvent } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
    clearFilters,
    positionOptionsSelector,
} from "../../features/applicant/applicantSlice";
import { useAppDispatch } from "../../hooks/hooks";
import SelectFilter from "./SelectFilter";
import { filterApplicants } from "../../controller/applicantController";
import styles from "./Filter.module.css";
import ClearFilterComponent from "./clearFilter";

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
        setPositionFilter("");
        setStatusFilter("");
        setSearchParams({
            name: "",
            position: "",
            status: "",
        });
        dispatch(clearFilters());
        navigate("/");
    };

    return (
        <form onSubmit={applyFilters} className={styles.filterContainer}>
            <label htmlFor="nameFilter">
                <span className={styles.filterLabel}>Filter name</span>
                <input
                    type="text"
                    id="nameFilter"
                    name="nameFilter"
                    value={nameFilter}
                    onChange={updateFilter(setNameFilter)}
                />
            </label>
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
            <button type="submit">Apply filters</button>
            <ClearFilterComponent {...{ clearFilter }} />
        </form>
    );
};

export default Filter;
