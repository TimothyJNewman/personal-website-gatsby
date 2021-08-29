/*
* File with commonly used utility functions
*/
import React from "react";

const getFormattedDate = (dateString) => {
    var options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString([], options);
}

const getFormattedLink = (hostname, path) => {
    return hostname + path;
}

// get article start in navigation based nav button click
const getNewCurrentArticleStart = (navCode, currentArticleStart, articleCount) => {
    let newCurrentArticleStart = currentArticleStart;
    // navCode for prev page
    if (navCode === -2) {
        if (currentArticleStart >= 4) {
            newCurrentArticleStart = currentArticleStart - 4;
        } else {
            newCurrentArticleStart = 0;
        }
    // navCode for next page
    } else if (navCode === -1) {
        if (currentArticleStart + 4 < articleCount) {
            newCurrentArticleStart = currentArticleStart + 4;
        }
    } else {
        newCurrentArticleStart = 4 * (navCode - 1);
    }
    return newCurrentArticleStart
}

// get page nav buttons
const getNavPageNumbers = (articleCount, handlePageNavClick) => {
    const items = [];
    for (var i = 1; i <= Math.ceil(articleCount / 4); i++) {
        items.push(
            <button className="posts-navigation-button" onClick={handlePageNavClick.bind(this, i)} key={i}>
                {i}
            </button>
        )
    }
    return items;
}

export { getFormattedDate, getFormattedLink, getNewCurrentArticleStart, getNavPageNumbers };