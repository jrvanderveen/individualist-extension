import React, { useState, useContext } from "react";
import { GlobalContext } from "../context/GlobalState";


/*
    SUMMARY:
        Displays recipes and shopping list will popup infront

    PARAMS: 
*/
export const MainPage = () => {
    // Context
    const { signOut } = useContext(GlobalContext);

    return (
        <>
            you are logged in
            <button onClick={signOut}>LOGOUT</button>
        </>
    );
};
