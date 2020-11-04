// function to generate markdown for README
module.exports.getReadMe = (userData,responses) => {

  function noneIfNone(response)
  {
      return response.length === 0 ? 'None' : response
  }
  
return `

# ${noneIfNone(responses.title)}

${noneIfNone(responses.badge)}

## Table Of Contents

  1. [Description](#description)
  2. [Github](#github)
  3. [Installation Instructions](#installation-instructions)
  4. [Usage](#usage)
  5. [Contributors](#contributors)
  6. [Tests](#tests)
  7. [License](#license)
  8. [Questions](#questions)


## Description


${noneIfNone(responses.description)}


## Github


Github profile: https://github.com/${noneIfNone(responses.username)}

Deployed site: https://${noneIfNone(responses.username)}.github.io/${noneIfNone(responses.repoName)}/


## Installation Instructions


${noneIfNone(responses.installation)}


## Usage


${noneIfNone(responses.usage)}


## Contributors


${noneIfNone(responses.contributors)}


## Tests


${noneIfNone(responses.tests)}


## License

Follow the link to know more about the selected license:

- "[![${responses.license}]](https://opensource.org/licenses/${responses.license})"


## Questions

If you have any questions, feel free to contact me either on Github or my email listed below:

Contatct: ${userData.login}

Email: <${responses.email}>

![profile image](${userData.avatar_url})
`

}
