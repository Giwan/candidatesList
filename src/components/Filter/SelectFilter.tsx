import { ChangeEventHandler } from "react";

type PositionFilterPropsType = {
    filterAction: ChangeEventHandler;
    filterValue: string;
    filterName: string;
    optionsList: string[];
    title: string;
};

const SelectFilter = ({
    filterAction,
    filterValue,
    filterName,
    optionsList,
    title,
}: PositionFilterPropsType) => (
    <label htmlFor={filterName}>
        <span>{title}</span>
        <select id={filterName} value={filterValue} onChange={filterAction}>
            <option value="all">All</option>
            {optionsList.map((option) => (
                <option key={option} value={option}>
                    {option}
                </option>
            ))}
        </select>
    </label>
);

export default SelectFilter;
