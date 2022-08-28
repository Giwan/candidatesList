import { ApplicantType } from "../../features/applicant/applicantSlice";
import ApplicantItem from "./applicantItem";

export type ApplicantListProps = {
    applicantList: ApplicantType[];
};

const ApplicantList = ({ applicantList }: ApplicantListProps) => {
    return (
        <table>
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
