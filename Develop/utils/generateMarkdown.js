// TODO: Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string

const licenses = require('./license-data');

function findLicense(name) {
  for (const licenseName in licenses) {
    const license = licenses[licenseName];
    if (license.name === name) {
      return license;
    }
  }
  return null;
}

function renderLicenseBadge(license) {
  return findLicense(license) ? findLicense(license).badge : '';
};

// TODO: Create a function that returns the license link
// If there is no license, return an empty string
function renderLicenseLink(license) {
  return findLicense(license) ? findLicense(license).link : '';
};

// TODO: Create a function that returns the license section of README
// If there is no license, return an empty string
function renderLicenseSection(license) {
  if (findLicense(license)) {
    return `This project is licensed under the ${findLicense(license).name} license. [Click here](${renderLicenseLink(license)}) to view the license` 
  } else {
    return '';
  };
};

function license(data) {
  if (data.isLicense) {
    return `## License 
  [![License: ${findLicense(data.license).name}](${renderLicenseBadge(data.license)})](${renderLicenseLink(data.license)})
    
  ${renderLicenseSection(data.license)}
    `
  } else {
    return '';
  };
};

function installation(data) {
  if (data.isInstallation) { 
    return `## [Installation](#installation)
  ${data.installation}
    `
  } else {
    return '';
  };
};

function usage(data) {
  if (data.isUsage) { 
    return `## [Usage](#usage)
  ${data.usage}
    `
  } else {
    return '';
  };
};

function features(data) {
  if (data.isFeatures) { 
    return `## [Features](#features)
  ${data.features}
    `
  } else {
    return '';
  };
};

function contribute(data) {
  if (data.isContribute) { 
    return `## [How to Contribute](#contribute)
  ${data.contribute}
    `
  } else {
    return '';
  };
};

function tests(data) {
  if (data.isTests) { 
    return `## [How to Run Tests](#tests)
  ${data.tests}
    `
  } else {
    return '';
  };
};

function tableOfContents(data) {
  if (data.isTOC) {
    let toc = '';

    toc += '- [Description](#description)\n';
    toc += '- [Application Preview](#preview)\n';
    if (data.isInstallation) {
      toc += '- [Installation](#installation)\n';
    }
    if (data.isUsage) {
      toc += '- [Usage](#usage)\n';
    }
    if (data.isFeatures) {
      toc += '- [Features](#features)\n';
    }
    if (data.isContributing) {
      toc += '- [How to Contribute](#contribute)\n';
    }
    if (data.isTests) {
      toc += '- [How to Run Tests](#tests)\n';
    }
    
    return `## Table of Contents
  ${toc}
    `;
  } else {
    return '';
  }
}


function generateMarkdown(data) {
  return `
# ${data.title}

**GitHub:** [${data.name}](${data.github})  **|  Application Link:** [${data.title}](${data.deployedApp})

${license(data)}

${tableOfContents(data)}

## [Description](#description)
${data.description} 

### [Application Preview](#preview)
![Application Screenshot](./Images/${data.screenshot})

${installation(data)}

${usage(data)} 

${features(data)} 

${contribute(data)} 

${tests(data)} 
`;
}

module.exports = { generateMarkdown };

