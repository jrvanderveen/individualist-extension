import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "./context/GlobalState";
import { MainPage } from "./screens/MainPage";
import { Login } from "./screens/Login";

/*
    SUMMARY:
        Routes encapsulated by the global providor
        
    PARAMS: 

*/
export const DirectScreens = () => {
    //Context
    const { isUserSignedIn, loggedIn } = useContext(GlobalContext);

    //State
    const [render, setRender] = useState(false);

    // Functions
    // Wait to hear back about user status before rendering page
    // no one wants to see a flash of the main page before being routed to the login
    useEffect(() => {
        isUserSignedIn().then(() => {
            setRender(true);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // New recipe form (no ingredients added at start)
    if (render) {
        return (
                <>
                {loggedIn ? (<MainPage />) : (<Login/>) }
            </>
        );
    } else {
        return <></>;
    }
};
