import React, { useState, useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import styled from "styled-components";

const Span = styled.span`
    color: blue;
    font-size: 80%;
    &:hover {
        cursor: pointer;
    }
    margin-bottom: 5px;
`;
const Wrapper = styled.div`
    text-align: center;
`;
const OAuthWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    @media (max-width: 500px) {
        flex-direction: column;
    }
`;
const ButtonWrapper = styled.div`
    margin: 5px;
    background-color: ${(props) => (props.facebook ? "#3c589c" : "#df4b3b")};
    border-radius: 0.25rem;
    width: 90%;
`;

/*
    SUMMARY:
        Login screen, also links to website for new users

    PARAMS: 

*/
export const Login = () => {
    // Context
    const { signIn } = useContext(GlobalContext);

    // State
    const [username, setUserName] = useState("");
    const [placeholder, setPlaceHolder] = useState("username");
    const [password, setPassword] = useState("");

    //Variables
    const googleRedirect = process.env.NODE_ENV === "production" ? "https://myindividualist.com/api/login/google" : "http://localhost:5000/api/login/google";
    const facebookRedirect =
        process.env.NODE_ENV === "production" ? "https://myindividualist.com/api/login/facebook" : "http://localhost:5000/api/login/facebook";

    // Functions
    const onSubmit = (e) => {
        e.preventDefault();
        signIn({ username: username, password: password }).then((result) => {
            if (!result) {
                setUserName("");
                setPlaceHolder("invalid user/password");
                setPassword("");
            } else {
                //return <Redirect to="/" />;
                console.log("Signed In");
            }
        });
    };

    // Functions
    // const onSubmit = (e) => {
    //     e.preventDefault();
    //     signIn({ username: username, password: password }).then((result) => {
    //         if (!result) {
    //             setUserName("invalid user/password");
    //             setPassword("");
    //         } else {
    //             console.log("Signed In");
    //         }
    //     });
    // };

    return (
        <Wrapper>
            <form className="form-signin" onSubmit={onSubmit}>
                <h1 className="h3 mb-3 font-weight-normal"> Sign in</h1>
                <OAuthWrapper>
                    <ButtonWrapper facebook>
                        <a className="btn facebook-btn social-btn" href={facebookRedirect} target="_blank">
                            <span style={{ color: "white" }}>
                                <i className="fab fa-facebook-f"></i> Sign in with Facebook
                            </span>{" "}
                        </a>
                    </ButtonWrapper>
                    <ButtonWrapper google>
                        <a className="btn google-btn social-btn" href={googleRedirect} target="_blank">
                            <span style={{ color: "white" }}>
                                <i className="fab fa-google-plus-g"></i> Sign in with Google+
                            </span>{" "}
                        </a>
                    </ButtonWrapper>
                </OAuthWrapper>
                <p style={{ textAlign: "center" }}> OR </p>
                <input
                    type="username"
                    value={username}
                    onChange={(e) => setUserName(e.target.value)}
                    className="form-control"
                    placeholder={placeholder}
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
            </form>
        </Wrapper>
    );
};
