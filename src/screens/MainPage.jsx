/*global chrome*/
import React, { useContext, useState } from "react";
import { GlobalContext } from "../context/GlobalState";
import styled from "styled-components";
import acceptedSites from "../data/acceptedSites.json"
var URLparser = require('url');

const Wrapper = styled.div`
    text-align: center;
`;

const H4 = styled.h4`
    margin: 0px;
`;

/*
    SUMMARY:
        Display welcome Message.
        allow user to signout and save recipes

    PARAMS: 
*/
export const MainPage = () => {
    // Context
    const { signOut, username } = useContext(GlobalContext);
    const [buttonColor, setButtonColor] = useState("btn-danger")

    const whatPage = () => {
        console.log('clicked')
        // chrome.tabs.query({active: true, currentWindow: true}, tabs => {
        //     if (tabs.length > 0){
        //         let currURL = tabs[0].url
        //         if (currURL) {
        //             let parsedUrl = URLparser.parse(currURL, true);
        //             console.log(parsedUrl);
        //         }
        //     } else {
        //         console.log("no current url")
        //     }
        // });
    }


    chrome.webNavigation.onCompleted.addListener(function(details) {
        if(details.frameId === 0){
            chrome.tabs.query({active: true, currentWindow: true}, tabs => {
                if (tabs.length > 0){
                    let currURL = tabs[0].url
                    if (currURL) {
                        let parsedUrl = URLparser.parse(currURL, true);
                        if(acceptedSites[parsedUrl.hostname]){
                            setButtonColor("btn-primary")
                        } else {
                            setButtonColor("btn-danger")
                        }
                    }
                } else {
                    console.log("no current url")
                }
            });
        }
    });


    return (
        <>
            <Wrapper>
                <H4>INDIVIDUA&#8729;LIST&#8729;EXT</H4>
                <div>Welcome {username}</div>
            </Wrapper>
            <button className={`btn ${buttonColor} mr-1`} onClick={whatPage}>ADD RECIPE</button>
            <button className="btn btn-primary" onClick={signOut}>LOGOUT</button>
        </>
    );
};
