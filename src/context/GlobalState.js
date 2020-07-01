import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";
import axios from "axios";

// Initial state
const initialState = {
    loggedIn: false,
    username: ""
};

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    //////////////////////////////////////////////////////////////
    // SIGNIN
    // Check login state of user before initial render
    async function isUserSignedIn() {
        try {
            await axios
                .post("http://localhost:5000/api/v1.1/login/state")
                .then((res) => {
                    dispatch({
                        type: "LOG_IN_STATE",
                        payload: res.data,
                    });
                })
        } catch (error) {
            dispatch({
                type: "LOGIN_ERROR",
                payload: error,
            });
        }
    }
    // Log user in
    async function signOut() {
        try {
            await axios.get("http://localhost:5000/api/v1.1/login/signOut");
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
        try {
            const res = await axios.post("http://localhost:5000/api/v1.1/login/signIn", userObj);
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
                recipes: state.recipes,
                shoppingList: state.shoppingList,
                creatingShoppingList: state.creatingShoppingList,
                grocerySections: state.grocerySections,
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
