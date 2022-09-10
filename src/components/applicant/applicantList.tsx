import { ApplicantType } from "../../types/types";
import ApplicantItem from "./ApplicantItem";
import { tableHeaderConstants } from "../../utils/constants";
import {
    sortApplicants,
    identifySortKey,
    canSort,
} from "../../controller/sortController";
import styles from "./ApplicantList.module.css";

export const tableHeader = [...Object.values(tableHeaderConstants)];

export type ApplicantListProps = {
    applicantList: ApplicantType[];
    handleClick: Function;
    sortDirection: boolean;
    sortKey: string;
};

const ApplicantList = ({
    applicantList,
    handleClick,
    sortKey,
    sortDirection,
}: ApplicantListProps) => {
    if (!applicantList || applicantList.length < 1) return null;

    const _sortedApplicants = sortApplicants(
        sortKey,
        applicantList,
        sortDirection
    );

    return (
        <table className={styles.applicantTable}>
            <thead>
                <tr className={styles.applicantTableRow}>
                    {tableHeader.map((header) => (
                        <th
                            key={header}
                            onClick={handleClick(header)}
                            data-can-sort={canSort(header)}
                            data-is-sort={identifySortKey(sortKey, header)}
                        >
                            {header}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody className={styles.tbody}>
                {_sortedApplicants.map((applicant, index) => (
                    <ApplicantItem
                        key={applicant.email}
                        {...{ applicant, index }}
                    />
                ))}
            </tbody>
        </table>
    );
};

export default ApplicantList;
