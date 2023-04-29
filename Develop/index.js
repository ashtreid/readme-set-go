// TODO: Include packages needed for this application
// const fs = require('fs');
const { writeFile } = require('fs').promises;

const inquirer = require('inquirer');
const createMd = require('./utils/generateMarkdown');
const licenses = require('./utils/license-data');

const licenseNames = Object.values(licenses).map((license) => {
    // console.log("Licenses:", license.name);
    return license.name;
});

// TODO: Create an array of questions for user input
const questions = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is your name?'
        },
        {
            type: 'input',
            name: 'title',
            message: 'What is the title of your project?'
        },
        {
            type: 'input',
            name: 'github',
            message: 'What is your GitHub link?'
        },
        {
            type: 'input',
            name: 'deployedApp',
            message: 'What is your deployed app link?'
        },
        {
            type: 'confirm',
            name: 'isLicense',
            message: 'Would you like to add a License?',
            default: false
        },
        {
            type: 'list',
            name: 'license',
            message: 'Select a license.',
            choices: licenseNames,
            when: function(answers) {return answers.isLicense;}
        },
        {
            type: 'confirm',
            name: 'isTOC',
            message: 'Do you want to include a table of contents?',
            default: false
        },
        {
            type: 'input',
            name: 'description',
            message: 'Add a description of your project.'
        },
        {
            type: 'input',
            name: 'screenshot',
            message: 'Provide a filename or link to an image of your app.'
        },
        {
            type: 'confirm',
            name: 'isInstallation',
            message: 'Would you like to add an Installation section?',
            default: false
        },
        {
            type: 'editor',
            name: 'installation',
            message: 'Add steps required to install your project.',
            when: function(answers) {return answers.isInstallation;}
        },
        {
            type: 'confirm',
            name: 'isUsage',
            message: 'Would you like to add a Usage section?',
            default: false
        },
        {
            type: 'editor',
            name: 'usage',
            message: 'Add instructions and examples for use.',
            when: function(answers) {return answers.isUsage;}
        },
        {
            type: 'confirm',
            name: 'isFeatures',
            message: 'Would you like to add a Features section?',
            default: false
        },
        {
            type: 'editor',
            name: 'features',
            message: 'List the features of your project.',
            when: function(answers) {return answers.isFeatures;}
        },
        {
            type: 'confirm',
            name: 'isContribute',
            message: 'Would you like to add a How to Contribute section?',
            default: false
        },
        {
            type: 'editor',
            name: 'contribute',
            message: 'Add guidelines on how others can contribute.',
            when: function(answers) {return answers.isContribute;}
        },
        {
            type: 'confirm',
            name: 'isTests',
            message: 'Would you like to add a Test section?',
            default: false
        },
        {
            type: 'editor',
            name: 'tests',
            message: 'Add examples on how to run your tests.',
            when: function(answers) {return answers.isTests;}
        }
    ]);
};

// TODO: Create a function to write README file
// TODO: use generatemarkdown func here
// function writeToFile(fileName, data) {

// };

// TODO: Create a function to initialize app
function init() {
    questions()
        .then((answers) => writeFile('../README.md', createMd.generateMarkdown(answers)))
        .then(() => console.log('Answers successfully written to README file'))
        .catch((err) => console.error(err));
};

// Function call to initialize app
init();
