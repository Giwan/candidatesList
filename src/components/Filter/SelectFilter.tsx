import { ChangeEventHandler } from "react";

type PositionFilterPropsType = {
    filterAction: ChangeEventHandler;
    statusFilterValue: string;
    statusFilterName: string;
    optionsList: string[];
    title: string;
};

const SelectFilter = ({
    filterAction,
    statusFilterValue,
    statusFilterName,
    optionsList,
    title,
}: PositionFilterPropsType) => (
    <label htmlFor={statusFilterName}>
        <span>{title}</span>
        <select
            id={statusFilterName}
            value={statusFilterValue}
            onChange={filterAction}
        >
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
