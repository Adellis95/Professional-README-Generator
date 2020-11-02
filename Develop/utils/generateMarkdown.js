// function to generate markdown for README
function generateMarkdown(data) {
  return `# ${data.title}

## Description 

// content goes here

## Table of contents

- [Description](#Description)
- [Installation](#Installation)
- [Usage](#Usage)
- [Contributors](#Contributors)
- [Repository Link](#Repository)
- [GitHub Info](#GitHub) 
- [Licence](#Licence)

## Installation

// content goes here

## Usage

// content goes here

## Contributors

// content goes here

## Github Info

// content goes here

## Licence

// content goes here

`;
}

module.exports = generateMarkdown;
