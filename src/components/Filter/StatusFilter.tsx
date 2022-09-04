import { ChangeEventHandler } from "react";

type StatusFilterPropsType = {
    handleStatusFilter: ChangeEventHandler;
    statusFilter: string;
};

const options = ["Approved", "Reject", "Waiting"];

const StatusFilter = ({
    handleStatusFilter,
    statusFilter,
}: StatusFilterPropsType) => (
    <label htmlFor="statusFilter">
        <span>Status</span>
        <select
            id="statusFilter"
            value={statusFilter}
            onChange={handleStatusFilter}
        >
            <option value="all">All</option>
            {options.map((status) => (
                <option key={status} value={status}>
                    {status}
                </option>
            ))}
        </select>
    </label>
);

export default StatusFilter;
