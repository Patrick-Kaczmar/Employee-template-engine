const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const Choice = require("inquirer/lib/objects/choice");
const Choices = require("inquirer/lib/objects/choices");
const { report } = require("process");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
const employees = []
// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!


// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
function start() {
    inquirer.prompt(
        {
            type: "confirm",
            message: "Do you want to create a new employee?",
            name: "create"
        }
    ).then((response) => {
        if (response.create) {
            createEmployee()
        }
        else {
            // render(employees);
            fs.writeFile(outputPath, render(employees), function (err) {
                if (err) {throw err;}
            })
        }
    })
};

function createEmployee() {
    inquirer.prompt(
        {
            type: "list",
            message: "Choose what type of employee template you would like to create:",
            choices: ["Manager", "Engineer", "Intern"],
            name: "template"
        }
    ).then((response) => {
        if (response.template == "Manager") {
            console.log("you have choosen the manager!")
            manager();
        }
        else if (response.template == "Engineer") {
            console.log("you have choosen the engineer!")
            engineer();
        }
        else if (response.template == "Intern") {
            console.log("you have choosen the intern!")
            intern();
        }
    });
};

function manager() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the name of this manager?",
            name: "managerName",
        },
        {
            type: "number",
            message: "What is the ID number of this employee?",
            name: "idNumber"
        },
        {
            type: "input",
            message: "What is this employee's email address?",
            name: "emailAddress"
        },
        {
            type: "number",
            message: "What is their office number?",
            name: "offNumber"
        }
    ]).then((response) => {
        let managerInput = response.managerName
        managerInput = new Manager(response.managerName, response.idNumber, response.emailAddress, response.offNumber)
        employees.push(managerInput)
        console.log(employees)
        start();
    });
};

function engineer() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the name of this engineer?",
            name: "engineerName",
        },
        {
            type: "number",
            message: "What is the ID number of this employee?",
            name: "idNumber"
        },
        {
            type: "input",
            message: "What is this employee's email address?",
            name: "emailAddress"
        },
        {
            type: "input",
            message: "What is this employee's GitHub name?",
            name: "gitName"
        }
    ]).then((response) => {
        let engineerInput = response.engineerName
        engineerInput = new Engineer(response.engineerName, response.idNumber, response.emailAddress, response.gitName)
        employees.push(engineerInput)
        console.log(employees)
        start();
    });
};

function intern() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the name of this intern?",
            name: "internName",
        },
        {
            type: "number",
            message: "What is the ID number of this employee?",
            name: "idNumber"
        },
        {
            type: "input",
            message: "What is this employee's email address?",
            name: "emailAddress"
        },
        {
            type: "input",
            message: "What is this employee's school name?",
            name: "schoolName"
        }
    ]).then((response) => {
        let internInput = response.internName
        internInput = new Intern(response.internName, response.idNumber, response.emailAddress, response.schoolName)
        employees.push(internInput)
        console.log(employees)
        start();
    });
};


start();