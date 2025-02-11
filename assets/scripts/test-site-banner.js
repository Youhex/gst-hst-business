"use strict";

let getGithubURL = function (pageURL) {
        let pageName = "", 
            githubURL = null;

        if (pageURL.indexOf(".htm") === -1) {
            pageName = "index.html";
        }

        switch (true) {
            // Generate github.com URL's from [repo name].github.io URL's
            case pageURL.indexOf(".github.io/") > -1:
                githubURL = pageURL.toString().replace(new RegExp("^https:\/\/(.*?)\.github\.io\/(.*?)\/((?:.*)(?=\/))?(\/?.*\..+)?"), "https:\/\/github\.com\/$1\/$2\/blob\/main\/$3$4" + pageName);
                break;
            // Generate github.com URL's from test.canada.ca URL's
            case pageURL.indexOf("://test.canada.ca/") > -1:
                githubURL = pageURL.toString().replace(new RegExp("^https:\/\/test\.canada\.ca\/(.*?)\/((?:.*)(?=\/))?(\/?.*\..+)?"), "https:\/\/github\.com\/gc-proto\/$1\/blob\/master\/$2$3" + pageName);
                break;
            // Generate github.com URL's from [repo name].alpha.canada.ca URL's
            case pageURL.indexOf(".alpha.canada.ca/") > -1:
                githubURL = pageURL.toString().replace(new RegExp("^https:\/\/design\.cra-arc\.alpha\.canada\.ca\/(.*?)\/((?:.*)(?=\/))?(\/?.*\..+)?"), "https:\/\/github\.com\/alpha-canada-ca\/cra-ucd-guide\/blob\/main\/$1\/$2$3" + pageName);
                break;
        }
        if (githubURL !== null) {
            document.getElementById("githubBtnGrp").classList.remove("hide-devmenu");
            document.getElementById("devtoolbar").classList.add("mrgn-rght-md");
            document.getElementById("githubBtn").href = githubURL;
        }
    };

if (document.getElementById("devtoolbar")) {
    // Initalize Edit button
    document.getElementById("editBtn").addEventListener("click", function (event) {
        if (document.getElementsByTagName("main").contentEditable === "true") {
            document.getElementsByTagName("main").contentEditable = "false";
            document.designMode = "off";
            void 0;
            // saves cuurent modified page content to local storage
            localStorage.setItem("content", document.getElementsByTagName("main").innerHTML);
            this.classList.add("btn-default");
            this.classList.remove("btn-primary");
        } else {
            document.getElementsByTagName("main").contentEditable = "true";
            document.designMode = "on";
            void 0;
            this.classList.add("btn-primary");
            this.classList.remove("btn-default");
        }
        event.preventDefault();
    });

    // Initalize Github button
    getGithubURL(window.location.origin + window.location.pathname);

    // Load modied page content if it exists from local Storage
    window.onload = function () {
        if (localStorage.getItem("content")) {
            document.getElementsByTagName("main").innerHTML = localStorage.getItem("content");
        }
    }
}
