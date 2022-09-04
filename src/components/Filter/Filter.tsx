import { useState, FormEventHandler, ChangeEvent } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import StatusFilter from "./StatusFilter";

const Filter = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    const [nameFilter, setNameFilter] = useState(
        searchParams.get("name") || ""
    );

    const [statusFilter, setStatusFilter] = useState(
        searchParams.get("status") || ""
    );

    // Store the html element value in state
    const updateFilter =
        (fn: Function) =>
        (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
            fn(e?.target?.value);

    // const updateFilterSelection = (fn: Function) => (e: ChangeEvent<HTMLInputElement>)

    const applyFilters: FormEventHandler = (e) => {
        e.preventDefault();
        setSearchParams({
            nameFilter,
            statusFilter,
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
            <StatusFilter
                {...{
                    handleStatusFilter: updateFilter(setStatusFilter),
                    statusFilter,
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
