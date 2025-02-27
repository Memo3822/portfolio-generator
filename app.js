import inquirer from "inquirer"
import {writeFile, copyFile} from './utils/generate-site.js'

import generatePage from './src/page-template.js';

// const pageHTML = generatePage(name,github);

// fs.writeFile('./index.html', pageHTML, err => {
//     if (err) throw new Error(err);

//     console.log('Portfolio complete! Check out index.html to see the output!')
// });
const promptUser =() => {
   
    return inquirer.prompt([
        {
        type: 'input',
        name: 'name',
        message: 'What is your name? (Required)',
        validate: nameInput => {
            if (nameInput) {
                return true;
            } else {
                console.log(`Please enter your name!`);
                return false;
            }
        }
        },
        {
            type:'input',
            name: 'github',
            message: 'Enter your GutHub Username',
            validate: gitHubInput => {
                if (gitHubInput) {
                    return true;
                } else {
                    console.log("Please enter a Github name!")
                    return false;
                }
            }
        },
        {
            type: 'confirm',
            name: 'confirmAbout',
            message: 'Would you like to enter some information about yourself for an "About" section?',
            default: true
        },
        {
            type:'input',
            name:'about',
            message: 'Provide some information about yourself:',
            when: ({confirmAbout}) => {
                if (confirmAbout) {
                    return true;
                } else {
                    return false;
                }
            }
        }
    ]);
};
const promptProject = portfolioData => {
   
    console.log(`
    ==================
    Add a New Project
    ==================    
    `);
    if (!portfolioData.projects) {
        portfolioData.projects = [];
    };
    return inquirer.prompt([
        {
            type:'input',
            name: 'name',
            message: 'What is the name of your project?'
        },
        {
            type: 'input',
            name:'description',
            message:'Provide a description of the project (Required)',
            validate: projectDescription => {
                if(projectDescription) {
                    return true;
                } else {
                    console.log("Please enter a description!")
                    return false;
                }
            }
        },
        {
            type:'checkbox',
            name:'languages',
            message:'What did you build this project with? (Check all that apply)',
            choices: ['JavaScript','HTML','CSS','ES6','jQuery','Bootstrap','Node']
        },

        {
            type: 'input',
            name: 'link',
            message: 'Enter the GitHub link to your project. (Required)',
            validate: projectLink => {
                if(projectLink) {
                    return true;
                } else {
                    console.log("Please enter a link!")
                    return false;
                }
            }
        },

        {
            type: 'confirm',
            name:'feature',
            message:  'Would you like to feature this project?',
            default: false
        },
        {
            type: 'confirm',
            name: 'confirmAddProject',
            message: 'Would you like to enter another project?',
            default: false
        }
    ])
    .then(projectData => {
        portfolioData.projects.push(projectData);
        if (projectData.confirmAddProject) {
            return promptProject(portfolioData);
        } else {
            return portfolioData;
        }
    });
};

promptUser()
  .then(promptProject)
  .then(portfolioData => {
    return generatePage(portfolioData);
  })
  .then(pageHTML => {
    return writeFile(pageHTML);
  })
  .then(writeFileResponse => {
    console.log(writeFileResponse);
    return copyFile();
  })
  .then(copyFileResponse => {
    console.log(copyFileResponse);
  })
  .catch(err => {
    console.log(err);
  });
    // .then(projectAnswers => console.log(projectAnswers));