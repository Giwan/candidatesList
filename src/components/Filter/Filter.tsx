import { useState, FormEventHandler, ChangeEvent } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const Filter = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    const [nameFilter, setNameFilter] = useState(
        searchParams.get("name") || ""
    );

    const updateFilter = (fn: Function) => (e: ChangeEvent<HTMLInputElement>) =>
        fn(e?.target?.value);

    const applyFilters: FormEventHandler = (e) => {
        e.preventDefault();
        setSearchParams({
            nameFilter,
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
            <button type="submit">Apply filter</button>
            <a onClick={clearFilter}>Clear filter</a>
        </form>
    );
};

export default Filter;
