import { ApplicantType } from "../../features/applicant/applicantSlice";
import ApplicantItem from "./applicantItem";
import { tableHeaderConstants } from "../../utils/constants";

export const tableHeader = [...Object.values(tableHeaderConstants)];

export type ApplicantListProps = {
    applicantList: ApplicantType[];
};

const ApplicantList = ({ applicantList }: ApplicantListProps) => {
    if (!applicantList || applicantList.length < 1) return null;

    return (
        <table>
            <thead>
                <tr>
                    {tableHeader.map((header) => (
                        <th>{header}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {applicantList.map((applicant, index) => (
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
