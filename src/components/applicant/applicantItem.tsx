import { ApplicantType } from "../../types/types";
import styles from "./ApplicantList.module.css";
import { calculateAge } from "../../controller/applicantController";

type ApplicantListItem = {
    applicant: ApplicantType;
};

export const getApplicantForKey = (key: string, applicant: ApplicantType) => {
    const applicantProperty = applicant[key as keyof ApplicantType];
    if (!/dob/i.test(key)) return applicantProperty;
    return calculateAge(applicant.dob);
};

/**
 * Generate a key for the table cell
 * @param key
 * @param applicant
 * @returns
 */
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
