import { ApplicantType } from "../../types/types";
import { calculateAge } from "../../controller/applicantController";
import styles from "./ApplicantList.module.css";

type ApplicantListItem = {
    applicant: ApplicantType;
};

export const getApplicantForKey = (key: string, applicant: ApplicantType) => {
    let applicantProperty = applicant[key as keyof ApplicantType];
    if (!/birth_date/i.test(key)) return applicantProperty;

    return calculateAge(String(applicantProperty));
};
export const generateKey = (key: string, applicant: ApplicantType) =>
    key + getApplicantForKey(key, applicant);

const ApplicantItem = ({ applicant }: ApplicantListItem) => {
    const keys = Object.keys(applicant);
    return (
        <tr className={styles.applicantTableRow}>
            {keys.map((key: string) => (
                <td key={generateKey(key, applicant)}>
                    {getApplicantForKey(key, applicant)}
                </td>
            ))}
        </tr>
    );
};

export default ApplicantItem;
