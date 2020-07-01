import React, { useContext } from "react";
import { GlobalContext } from "../../context/GlobalState";
import styled from "styled-components";

// Styled Components
const Button = styled.button`
    cursor: pointer;
    background-color: ${(props) => (props.clicked === true ? "#8171d1" : "#9c88ff")};
    box-shadow: var(--box-shadow);
    color: #fff;
    border: 0;
    font-size: 14px;
    padding: 5px;
    margin: ${(props) => (props.seperate ? "15px 5px 0px 5px" : "5px 5px 0px 5px")};
    width: 90%;
    &:hover {
        background-color: #8171d1;
    }
`;

const Wrapper = styled.div`
    position: absolute;
    left: 0px;
    top: 40%;
    max-width: 300px;
`;

const Ul = styled.ul`
    list-style-type: none;
    display: flex;
    padding: 0px;
`;

const Li = styled.li`
    width: 47.5%;
`;

/*
    SUMMARY:
        Options for main page.  Can view shopping list or add recipes to shopping list

    PARAMS: 
        togglePopUpFunc: togle the shopping list popup window

*/
export const Options = ({ togglePopUpFunc }) => {
    // Context
    const { setCreateShoppingListBool, creatingShoppingList, saveAddedRecipes, signOut } = useContext(GlobalContext);

    // Options for main page
    return (
        <Wrapper>
            <Button middle clicked={creatingShoppingList} onClick={togglePopUpFunc}>
                View Shopping List
            </Button>
            <Button middle clicked={creatingShoppingList} onClick={() => setCreateShoppingListBool("close")}>
                Add To Shopping List
            </Button>
            {creatingShoppingList ? (
                <Ul>
                    <Li>
                        <Button bottom onClick={saveAddedRecipes}>
                            Save
                        </Button>
                    </Li>
                    <Li>
                        <Button bottom onClick={() => setCreateShoppingListBool("cancel")}>
                            Cancel
                        </Button>
                    </Li>
                </Ul>
            ) : null}
            <Button seperate onClick={signOut}>
                Logout
            </Button>
        </Wrapper>
    );
};
