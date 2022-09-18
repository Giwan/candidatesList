import { ApplicantType } from "../../types/types";
import ApplicantItem from "./ApplicantItem";
import { tableHeaderConstants } from "../../utils/constants";
import { identifySortKey, canSort } from "../../controller/sortController";
import styles from "./ApplicantList.module.css";

export const tableHeader = [...Object.values(tableHeaderConstants)];

export type ApplicantListProps = {
    applicantList: ApplicantType[];
    handleClick: Function;
    handleKeyUp: Function;
    sortDirection: boolean;
    sortKey: string;
};

const ApplicantList = ({
    applicantList,
    handleClick,
    handleKeyUp,
    sortKey,
    sortDirection,
}: ApplicantListProps) => {
    if (!applicantList || applicantList.length < 1) return null;

    return (
        <table className={styles.applicantTable}>
            <thead>
                <tr className={styles.applicantTableRow}>
                    {tableHeader.map((header) => (
                        <th
                            key={header}
                            onClick={handleClick(header)}
                            onKeyUp={handleKeyUp(header)}
                            data-can-sort={canSort(header)}
                            data-is-sort={identifySortKey(sortKey, header)}
                            tabIndex={canSort(header) ? 0 : -1}
                        >
                            {header}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody className={styles.tbody}>
                {applicantList.map((applicant, index) => (
                    <ApplicantItem
                        key={applicant.email + applicant.lastName}
                        {...{ applicant, index }}
                    />
                ))}
            </tbody>
        </table>
    );
};

export default ApplicantList;
