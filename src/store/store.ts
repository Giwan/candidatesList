import { configureStore } from "@reduxjs/toolkit";
import applicantReducer from "../features/applicant/applicantSlice";

const store = configureStore({
    reducer: {
        applicantReducer
    }
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 