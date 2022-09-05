import { useState, FormEventHandler, ChangeEvent } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import SelectFilter from "./SelectFilter";

const statusFilterOptionsList = ["Approved", "Reject", "Waiting"];

const Filter = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    const [nameFilter, setNameFilter] = useState(
        searchParams.get("name") || ""
    );

    const [statusFilterValue, setStatusFilter] = useState(
        searchParams.get("status") || ""
    );

    // Store the html element value in state
    const updateFilter =
        (fn: Function) =>
        (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
            fn(e?.target?.value);

    const applyFilters: FormEventHandler = (e) => {
        e.preventDefault();
        setSearchParams({
            name: nameFilter,
            status: statusFilterValue,
        });
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
                    filterAction: updateFilter(setStatusFilter),
                    statusFilterName: "statusFilter",
                    statusFilterValue,
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
