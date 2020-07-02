/*global chrome*/
import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { GlobalContext } from "../context/GlobalState";
import acceptedSites from "../data/acceptedSites.json";
import styled from "styled-components";
const URLparser = require("url");

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

    // State
    const [buttonColor, setButtonColor] = useState("btn-danger");
    const [currURL, setCurrURL] = useState("");
    const [errors, setErrors] = useState([]);
    const [success, setSuccess] = useState([]);

    const scrapePage = async () => {
        const currErrors = [];
        const scraperURL = process.env.NODE_ENV === "development" ? "" : process.env.REACT_APP_DEV_API_SCRAPER_URL;
        const appURL = process.env.NODE_ENV === "development" ? "" : process.env.REACT_APP_DEV_API_APP_URL;
        setButtonColor("btn-light");
        await axios
            .post(scraperURL + "/api/v1/scraper/recipe", { url: currURL })
            .then((res) => {
                console.log(res.data);
                if (res.data.error) {
                    currErrors.push(res.data.error);
                } else {
                    console.log(res.data);
                    axios
                        .post(appURL + "/api/v1.1/recipes/addFull", res.data)
                        .then(() => {
                            setSuccess(["Added Recipe"]);
                        })
                        .catch((error) => {
                            currErrors.push(error);
                            console.log(error);
                        });
                }
            })
            .catch((error) => {
                currErrors.push(error);
                console.log(error);
            });
        if (currErrors.length > 0) {
            setButtonColor("btn-danger");
        } else {
            setButtonColor("btn-primary");
        }
        setErrors(currErrors);
    };

    useEffect(() => {
        updateButtonColor();
    }, []);

    chrome.webNavigation.onCompleted.addListener(function (details) {
        if (details.frameId === 0) {
            updateButtonColor();
        }
    });

    const updateButtonColor = () => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs.length > 0) {
                let siteUrl = tabs[0].url;
                setCurrURL(siteUrl);

                if (siteUrl) {
                    let parsedUrl = URLparser.parse(siteUrl, true);
                    if (acceptedSites[parsedUrl.hostname]) {
                        setButtonColor("btn-primary");
                    } else {
                        setButtonColor("btn-danger");
                    }
                }
            } else {
                setCurrURL("");
                console.log("no current url");
            }
        });
    };

    return (
        <>
            <Wrapper>
                <H4>INDIVIDUA&#8729;LIST&#8729;EXT</H4>
                <div>Welcome {username}</div>
            </Wrapper>
            {errors.map((error) => (
                <p className="error" key={error}>
                    {error}
                </p>
            ))}
            {success.map((msg) => (
                <p className="success" key={msg}>
                    {msg}
                </p>
            ))}
            <button className={`btn ${buttonColor} mr-1`} onClick={scrapePage} disabled={buttonColor === "btn-light" ? true : false}>
                ADD RECIPE
            </button>
            <button className="btn btn-primary" onClick={signOut}>
                LOGOUT
            </button>
        </>
    );
};
