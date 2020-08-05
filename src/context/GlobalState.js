import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";
import axios from "axios";

// Initial state
const initialState = {
    loggedIn: false,
    username: "",
    error: [],
};

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);
    const URL = process.env.NODE_ENV === "development" ? "http://localhost:5000" : process.env.REACT_APP_PROD_API_APP_URL;

    //////////////////////////////////////////////////////////////
    // SIGNIN
    // Check login state of user before initial render
    async function isUserSignedIn() {
        try {
            console.log(URL + "/api/login/state");
            await axios.post(URL + "/api/login/state", { mode: "cors" }).then((res) => {
                console.log(res.data);
                dispatch({
                    type: "LOG_IN_STATE",
                    payload: res.data,
                });
            });
        } catch (error) {
            console.log(error);
            dispatch({
                type: "LOGIN_ERROR",
                payload: error,
            });
        }
    }
    // Log user in
    async function signOut() {
        try {
            await axios.get(URL + "/api/login/signOut");
            dispatch({
                type: "LOG_USER_OUT",
            });
        } catch (error) {
            dispatch({
                type: "LOGIN_ERROR",
                payload: error,
            });
        }
    }

    // Log user in
    async function signIn(userObj) {
        const config = {
            headers: {
                "Content-Type": "text/plain",
            },
            mode: "cors",
        };
        try {
            const res = await axios.post(URL + "/api/login/signIn", userObj, config);
            dispatch({
                type: "LOG_USER_IN",
                payload: res.data.username,
            });
            return res.data.success;
        } catch (error) {
            dispatch({
                type: "LOGIN_ERROR",
                payload: error,
            });
            return false;
        }
    }

    return (
        <GlobalContext.Provider
            value={{
                loggedIn: state.loggedIn,
                username: state.username,
                error: state.error,
                signOut,
                isUserSignedIn,
                signIn,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};
