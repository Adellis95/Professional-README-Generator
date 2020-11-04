const axios = require("axios");
const inquirer = require("inquirer");
const fs = require("fs");
const template = require('./utils/generateMarkdown');
const validator = require('email-validator');

let gitHubUserData;


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

// array of questions for user
const questions = [
    {
        type: "input",
        name: "title",
        message: "What is your project title?"
    },
    {
        type: "input",
        name: "badge",
        message: "Please provide the badges links that you want"
    },
    {
        type: "input",
        name: "description",
        message: "Please provide your project's description"
    },
    {
        type: "input",
        name: "installation",
        message: "Please provide the installation instructions"
    },
    {
        type: "input",
        name: "usage",
        message: "Please provide the project usage"
    },
    {
        type: "input",
        name: "licence",
        message: "Please provide the project licence or your badge link"
    },
    {
        type: "input",
        name: "contributing",
        message: "Please provide the contributing parties"
    },
    {
        type: "input",
        name: "test",
        message: "Please provide the project tests"
    },
    {
        type: "input",
        name: "username",
        message: "What is your github user name?"
    },
    {
        type: "input",
        name: "repo",
        message: "What is your repo link?"
    },
];

// function to write README file
function writeToFile(fileName, data) {
}

// function to initialize program
function init() {

}

// function call to initialize program
init();
