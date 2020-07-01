export default (state, action) => {
    switch (action.type) {
        //////////////////////////////////////////////////////////////
        // LOGIN
        // Set login state
        // action.payload = {success: bool, username: string}
        case "LOG_IN_STATE":
            return {
                ...state,
                loggedIn: action.payload.success,
                username: action.payload.username,
            };

        // Log user out
        case "LOG_USER_OUT":
            state.loggedIn = false;
            state.username = "";
            return {
                ...state,
                loggedIn: state.loggedIn,
                username: state.username,
            };
        // Log user in by saving user name and setting logged in = true
        case "LOG_USER_IN":
            state.loggedIn = true;
            return {
                ...state,
                loggedIn: state.loggedIn,
                username: action.payload,
            };
        //ERRORS
        case "LOGIN_ERROR":
            console.log("Login " + action.payload);
            return {
                ...state,
                error: action.payload,
            };
        case "RECIPE_ERROR":
            console.log("Recipe " + action.payload);
            return {
                ...state,
                error: action.payload,
            };
        default:
            return state;
    }
};
