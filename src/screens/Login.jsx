import React, { useState, useContext } from "react";
import { GlobalContext } from "../context/GlobalState";

/*
    SUMMARY:
        Page to allow users to chose between creating an account and loging in

    PARAMS: 

*/
export const Login = () => {
    // Context
    const { signIn } = useContext(GlobalContext);

    // State
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");

    // Functions
    const onSubmit = (e) => {
        e.preventDefault();
        signIn({ username: username, password: password }).then((result) => {
            if (!result) {
                setUserName("invalid user/password");
                setPassword("");
            } else {
                console.log("Signed In");
            }
        });
    };

    return (
        <div id="logreg-forms">
                        <form className="form-signin" onSubmit={onSubmit}>
            <h1 className="h3 mb-3 font-weight-normal" style={{ textAlign: "center" }}>
                {" "}
                Sign in
            </h1>
            <input
                type="username"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
                className="form-control"
                placeholder="User Name..."
                required="required"
                autoFocus
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
                placeholder="Password..."
                required="required"
            />

            <button className="btn btn-success btn-block" type="submit">
                <i className="fas fa-sign-in-alt"></i> Sign in
            </button>
            <hr />
            <a target="_blank" rel="noopener noreferrer" href="http://myindividualist.com">Sign up New Account</a>

        </form>
        </div>
    );
};
