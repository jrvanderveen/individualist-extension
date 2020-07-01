import React, { useState, useRef, useEffect, useContext } from "react";
import { GlobalContext } from "../../context/GlobalState";
import { ShoppingListIngredient } from "./ShoppingListIngredient";
import { List, AccordionButton, Input, AccordionContent } from "../../elements/index";
import styled from "styled-components";

// Styled Components
const Wrapper = styled.div`
    margin: auto;
`;

/*
    SUMMARY:
        Display grocery sections in shopping list.
        Display ingredients in accordion content.
            display add ingredient at end 

    PARAMS: 
        sectionName: grocery section name
        section: list of ingredients in grocery section
        clearSwitch: bool updated when user hits clear shopping list

*/
export const ShoppingListGrocerySection = ({ sectionName, section, clearSwitch }) => {
    // Context
    const { addIngredientToShoppingListSection } = useContext(GlobalContext);

    // State
    const [setActive, setActiveState] = useState("active");
    const [setHeight, setHeightState] = useState("0px");
    const [newIngredient, setNewIngredient] = useState("");
    const [placeHolderText] = useState(`Enter ${sectionName}...`);

    // Window
    const content = useRef(null);

    // Functions
    // Open or close accordion content
    const toggleAccordion = (props) => {
        setActiveState(setActive === "" ? "active" : "");
        setHeightState(setActive === "active" ? "0px" : `${content.current.scrollHeight}px`);
    };

    // Create new ingredient, update accordion content height, reset new ingredient
    const handleOnClick = () => {
        if (newIngredient.length === 0) {
            return;
        }
        addIngredientToShoppingListSection(sectionName, newIngredient);
        setHeightState(`${content.current.scrollHeight + 36}px`);
        setNewIngredient("");
    };

    // Hit enter for new ingredient
    const handleKeyDown = (key) => {
        if (key === "Enter") {
            handleOnClick();
        }
    };

    // When clearSwitch is updated if there are no ingredients reset height to only dipslay new ingredient form
    useEffect(() => {
        if (section.length === 0) {
            setHeightState("56px");
        } else {
            setHeightState(`${content.current.scrollHeight}px`);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [clearSwitch]);

    //
    return (
        <>
            <AccordionButton isShoppingList onClick={toggleAccordion}>
                <List active={setActive} isGrocerySectionHeader key={sectionName} ingredientCount={section.length}>
                    {sectionName}
                </List>
            </AccordionButton>
            <AccordionContent ref={content} maxHeight={setHeight}>
                <ul>
                    {section.map((ingredient, index) => (
                        <ShoppingListIngredient key={`${index}-${ingredient._id}`} ingredient={ingredient.name} />
                    ))}
                    <List isShoppingListIngredient isForm>
                        <Input
                            onKeyDown={(e) => handleKeyDown(e.key)}
                            isShoppingListIngredient
                            value={newIngredient}
                            onChange={(e) => setNewIngredient(e.target.value)}
                            placeholder={placeHolderText}
                        />
                        <Wrapper>
                            <button className="float-right btn btn-success btn-sm" onClick={handleOnClick}>
                                +
                            </button>
                        </Wrapper>
                    </List>
                </ul>
            </AccordionContent>
        </>
    );
};
