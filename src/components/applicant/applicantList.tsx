import { useEffect } from "react";
import { useAppDispatch } from "../../hooks/hooks";
import { fetchApplicantList } from "../../controller/applicantController";

const ApplicantList = () => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchApplicantList());
    }, [dispatch]);

    return <h1>application list</h1>;
};

export default ApplicantList;
