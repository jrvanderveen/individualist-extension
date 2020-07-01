import React from "react";
import ReactDOM from "react-dom";
import "./App.css"; // Styled components used instead
import { GlobalProvider } from "./context/GlobalState";
import { DirectScreens } from "./DirectScreens";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #f7f7f7;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-family: "Lato", sans-serif;
    min-width: 250px;
    margin: 5px;
  } 
  :root {
    --box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    }
    * {
        box-sizing: border-box;
    } 
    .error {
    color: #c0392b;
}
`;


// App pages:
//      Main Page - View/add/edit recipes and shoppinglist
//      Settings  - Update grocery sections / user settings (to come)
const App = () => {
    return (
        <GlobalProvider>
            <GlobalStyle />
            <DirectScreens />
        </GlobalProvider>
    );
}
ReactDOM.render(<App />, document.getElementById("root"));
