const licenses = require('./license-data');

// Searches for the license object of the given name value
function findLicense(name) {
  for (const licenseName in licenses) {
    const license = licenses[licenseName];
    if (license.name === name) {
      return license;
    }
  }
  return null;
}

// If the user chooses a license, it will extract the appropriate badge image from license-data.js.
// If the user opts out of a license, it will render an empty string.
function renderLicenseBadge(license) {
  return findLicense(license) ? findLicense(license).badge : '';
};


// If the user chooses a license, it will extract the appropriate link to the license from license-data.js.
// If the user opts out of a license, it will render an empty string.
function renderLicenseLink(license) {
  return findLicense(license) ? findLicense(license).link : '';
};

// If the user chooses a license, it will extract the appropriate name of the licence from license-data.js.
// Then, it will compose a short description of which license is being used along with the license link.
// If the user opts out of a license, it will render an empty string.
function renderLicenseSection(license) {
  if (findLicense(license)) {
    return `This project is licensed under ${findLicense(license).name}. [Click here](${renderLicenseLink(license)}) to view the license.` 
  } else {
    return '';
  };
};

// If the user wants a license, it will render an h2 heading along with a license, badge, and description 
// using the renderLicense... functions above.
// Composed for markdown.
function license(data) {
  if (data.isLicense) {
    return `## License 
  [![License: ${findLicense(data.license).badgeName}](${renderLicenseBadge(data.license)})](${renderLicenseLink(data.license)})
    
  ${renderLicenseSection(data.license)}
    `
  } else {
    return '';
  };
};

// If the user wants an installation section, it will render an h2 heading along with the relevant answer.
// Composed for markdown.
function installation(data) {
  if (data.isInstallation) { 
    return `## [Installation](#installation)
  ${data.installation}
    `
  } else {
    return '';
  };
};


// If the user wants a usage section, it will render an h2 heading along with the relevant answer.
// Composed for markdown.
function usage(data) {
  if (data.isUsage) { 
    return `## [Usage](#usage)
  ${data.usage}
    `
  } else {
    return '';
  };
};

// If the user wants a features section, it will render an h2 heading along with the relevant answer.
// Composed for markdown.
function features(data) {
  if (data.isFeatures) { 
    return `## [Features](#features)
  ${data.features}
    `
  } else {
    return '';
  };
};

// If the user wants a contribution section, it will render an h2 heading along with the relevant answer.
// Composed for markdown.
function contribute(data) {
  if (data.isContribute) { 
    return `## [How to Contribute](#how-to-contribute)
  ${data.contribute}
    `
  } else {
    return '';
  };
};

// If the user wants a tests section, it will render an h2 heading along with the relevant answer.
// Composed for markdown.
function tests(data) {
  if (data.isTests) { 
    return `## [How to Run Tests](#how-to-run-tests)
  ${data.tests}
    `
  } else {
    return '';
  };
};

// If the user wants a table of contents section, it will render the links of the user-opted sections + the fixed ones in generateMarkdown().
// Composed for markdown.
function tableOfContents(data) {
  if (data.isTOC) {
    let toc = '';

    toc += '- [Description](#description)\n';
    toc += '- [Application Preview](#application-preview)\n';
    if (data.isInstallation) {
      toc += '- [Installation](#installation)\n';
    }
    if (data.isUsage) {
      toc += '- [Usage](#usage)\n';
    }
    if (data.isFeatures) {
      toc += '- [Features](#features)\n';
    }
    if (data.isContribute) {
      toc += '- [How to Contribute](#how-to-contribute)\n';
    }
    if (data.isTests) {
      toc += '- [How to Run Tests](#how-to-run-tests)\n';
    }

    toc += '- [Questions](#questions)\n';

    return `## Table of Contents
${toc}
    `;
  } else {
    return '';
  }
}

// Composes a dynamic markdown document with some fixed and optional sections
function generateMarkdown(data) {
  return `
# ${data.title}

${license(data)}

${tableOfContents(data)}

## [Description](#description)
${data.description}\n 

**Application Link:** [${data.title}](${data.deployedApp})

## [Application Preview](#application-preview)
![Application Screenshot](./Images/${data.screenshot})

${installation(data)}

${usage(data)} 

${features(data)} 

${contribute(data)}

${tests(data)}

## [Questions?](#questions)
If you have any questions about my project, please contact me via the following:\n
**${data.name}**  |  *GitHub:* [${data.githubUser}](${data.github})  |  *Email:* ${data.email}
`;
}

module.exports = { generateMarkdown };

