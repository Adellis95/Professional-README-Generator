const axios = require("axios");
const inquirer = require("inquirer");
const fs = require("fs");
const template = require('./utils/generateMarkdown');
const validator = require('email-validator');

let gitHubUserData;
let gitHubRepos;
let selectedRepo;


// Verify that a given GitHub exists and has at least one repo
async function verifyGitHubAccount(username) {

    if(username.length === 0) 
        return 'username cannot be blank';
    else{

        const url = `https://api.github.com/users/${username}`;

        // User GitHubUser Data
        const userResp = await axios.get(url)

        gitHubUserData = userResp.data;

        reposUrl = userResp.data.repos_url;

        if(typeof reposUrl === 'undefined')
            return `GitHub username ${username} does not exist`;

        reposResp = await axios.get(reposUrl);

        const reposData = reposResp.data;

        if(reposData.length === 0)
            return `GitHub user ${username} has no repos`;

        gitHubRepos = reposData;
        
        questions[1].choices = reposData.map(repo => repo.name);

        return true;
    };
};

// Filter callback for repo selection question. Sets defaults for subsequent
// questions based on selected repo
function setRepoDefaults(repoName) {

    return new Promise((resolve,reject) => {

        selectedRepo = gitHubRepos.find(repo => repo.name == repoName);

        // Set repo name and description as defaults for Title and Description 
        // question
        questions[2].default = selectedRepo.description;

        // Get contributors and tags from repo
        axios.all([
            axios.get(selectedRepo.contributors_url),
            axios.get(selectedRepo.tags_url)
        ])
        .then(respArr => {
            // Set repo contributors as default for Contributors question
            questions[7].default = respArr[0].data.map(contributor => contributor.login).join(',');

            resolve(repoName);
        })
        .catch(err => {
            reject(new Error("Could not set defaults"));
        });
    })
}

// array of questions for user
const questions = [
    {
        name: "username",
        message: "What is your GitHub username?",
        default: "Github username",
        validate: verifyGitHubAccount
    },
    {
        type: "list",
        name: "repoName",
        message: "Select the project repo:",
        filter:setRepoDefaults
    },
    {
        name: "title",
        message: "Enter a project title:",
    },
    {
        name: "description",
        message: "Enter a project description:",
    },
    {
        name: "installation",
        message: "Enter installation instructions:"
    },
    {
        name: "usage",
        message: "Enter usage directions:"
    },
    {
        type: "list",
        name: "badge",
        message: "Select license type:",
        choices: [
        "[![License: Apache-2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)", 
        "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)", 
        "[![License: GPLv3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://opensource.org/licenses/GPL-3.0)", 
        "[![License: BSD-3-Clause](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)"]
    },
    {
        type: "list",
        name: "license",
        message: "Provide the license associated to the selected badge:",
        choices: [
        "Apache-2.0",
        "MIT",
        "GPL-3.0",
        "BSD-3-Clause"]
    },
    {
        name: "contributors",
        message: "Enter contibutors:",
        default: "Github profile"
    },
    {
        name: "tests",
        message: "Enter tests:"
    },
    {
        name: "email",
        message: "Enter contact email:"
    }
];

// function to write README file
function writeToFile(fileName, data) {
}

// function to initialize program
function init() {

}

// function call to initialize program
init();
