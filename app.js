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

// an empty array that will have the employee objects created by the CLI pushed into it
const employees = [];

// function that will ask the user if they want to create a new employee
function start() {
    inquirer.prompt(
        {
            type: "confirm",
            message: "Do you want to create a new employee?",
            name: "create"
        }
    ).then((response) => {
        // if the user answers yes then run the create Employee function
        if (response.create) {
            createEmployee()
        }
        // else take all the input data we have gathered so far, pass it into the render function to get HTML returned, and write it to a new html file in the output folder
        else {
            fs.writeFile(outputPath, render(employees), function (err) {
                if (err) {throw err}
            });
        };
    });
};

// function asking what type of employee object will be created and runs the correct function depending on the answer
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

// function that will create a new manager object and push it into the employee array
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
        let managerInput = response.managerName;
        managerInput = new Manager(response.managerName, response.idNumber, response.emailAddress, response.offNumber);
        employees.push(managerInput);
        console.log(employees);
        start();
    });
};

// function that will create a new engineer object and push it into the employee array
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
        let engineerInput = response.engineerName;
        engineerInput = new Engineer(response.engineerName, response.idNumber, response.emailAddress, response.gitName);
        employees.push(engineerInput);
        console.log(employees);
        start();
    });
};

// function that will create a new intern object and push it into the employee array
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
        let internInput = response.internName;
        internInput = new Intern(response.internName, response.idNumber, response.emailAddress, response.schoolName);
        employees.push(internInput);
        console.log(employees);
        start();
    });
};

// calls the function when the app is run with "node app" in the CLI
start();