const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "view");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/renderer");

const employees = [];

function createManager() {
	inquirer
		.prompt([
			{
				type: "input",
				message:
					" Please enter the name of the manager?",
				name: "managerName",
				validate: function (managerName) {
                    // if the name of the manager is less that 3 word it will ask again
					if (managerName.length < 3) {
						console.log(managerName);
						return "Please enter a correct name";
					}
					return true;
				},
			},
			{
				type: "input",
				message: "Please enter the id number of the Manager?",
				name: "managerId",
				validate: function (managerId) {
                    // if hte number is less that 1 number it will ask again to enter 
					if (managerId.length < 1) {
						console.log(managerId);
						return "Please enter a correct ID number";
					}
					return true;
				},
			},
			{
				type: "input",
				message: "Please enter email of the Manager?",
				name: "managerEmail",
				validate: function (managerEmail) {
                    // if the lenght of email address is less than 7 , it will ask again
					if (managerEmail.length < 7) {
						console.log(managerEmail);
						return "Please enter a correct email address";
					}
					return true;
				},
			},
			{
				type: "input",
				message: "Please enter the office phone number of the Manager?",
				name: "managerOfficePhone",
				validate: function (managerOfficePhone) {
					if (managerOfficePhone.length < 10) {
						console.log(managerOfficePhone);
						return "Please enter a valid Office Phone Number";
					}
					return true;
				},
			},
		])
		.then((answers) => {
			console.log(answers);
			employees.push(
				new Manager(
					answers.managerName,
					answers.managerId,
					answers.managerEmail,
					answers.managerOfficePhone
				)
			);
			addToTeam();
		});
}

function addToTeam() {
	inquirer
		.prompt([
			{
				type: "list",
				message: "Would you like to add more members to your team?",
				name: "addMembers",
				choices: ["Intern", "Engineer", "It's complated"],
			},
		])
		.then((answers) => {
			const role = answers.addMembers;
			switch (role) {
				case "Intern":
					addIntern();
					break;
				case "Engineer":
					addEngineer();
					break;
				case "It's complated":
					buildHTML();
					break;
				default:
					buildHTML();
			}
		});
}

function addEngineer() {
	inquirer
		.prompt([
			{
				type: "input",
				message: "Please enter the name of the Engineer",
				name: "engineerName",
				validate: function (engineerName) {
					if (engineerName.length < 2) {
						console.log(engineerName);
						return "Please enter a valid name";
					}
					return true;
				},
			},
			{
				type: "input",
				message: "Please enter the phone number of the Engineer",
				name: "engineerPhoneNumber",
				validate: function (engineerPhoneNumber) {
					if (engineerPhoneNumber.length < 9) {
						console.log(engineerPhoneNumber);
						return "Please enter a valid phone number";
					}
					return true;
				},
			},
			{
				type: "input",
				message: "Please enter the ID number for the Engineer",
				name: "engineerId",
				validate: function (engineerId) {
					if (engineerId.length < 1) {
						console.log(engineerId);
						return "Please enter a valid ID number";
					}
					return true;
				},
			},
			{
				type: "input",
				message: "Please enter the email for the Engineer",
				name: "engineerEmail",
				validate: function (engineerEmail) {
					if (engineerEmail.length < 1) {
						console.log(engineerEmail);
						return "Please enter a valid email";
					}
					return true;
				},
			},
			{
				type: "input",
				message: "Please enter the Github user name for the Engineer",
				name: "engineerGithub",
				validate: function (engineerGithub) {
					console.log(engineerGithub);
					if (engineerGithub.length < 2) {
						return "Please enter a valid Github username";
					}
					return true;
				},
			},
		])
		.then((answers) => {
			console.log(answers);
			employees.push(
				new Engineer(
					answers.engineerName,
					answers.engineerId,
					answers.engineerEmail,
					answers.engineerGithub
				)
			);
			addToTeam();
		});
}

function addIntern() {
	inquirer
		.prompt([
			{
				type: "input",
				message: "Please enter the name of the Intern",
				name: "internName",
				validate: function (internName) {
					if (internName.length < 2) {
						console.log(internName);
						return "Please enter a valid name";
					}
					return true;
				},
			},
			{
				type: "input",
				message: "Please enter the ID number of the Intern",
				name: "internId",
				validate: function (internId) {
					if (internId.length < 1) {
						console.log(internId);
						return "Please enter a valid ID number";
					}
					return true;
				},
			},
			{
				type: "input",
				message: "Please enter the email of the Intern",
				name: "internEmail",
				validate: function (internEmail) {
					if (internEmail.length < 2) {
						console.log(internEmail);
						return "Please enter a valid email";
					}
					return true;
				},
			},
			{
				type: "input",
				message: "Please enter the school of the Intern",
				name: "internSchool",
				validate: function (internSchool) {
					if (internSchool.length < 2) {
						console.log(internSchool);
						return "Please enter a valid School name";
					}
					return true;
				},
			},
		])
		.then((answers) => {
			console.log(answers);
			employees.push(
				new Intern(
					answers.internName,
					answers.internId,
					answers.internEmail,
					answers.internSchool
				)
			);
			addToTeam();
		});
}

function buildHTML() {
	if (!fs.existsSync(OUTPUT_DIR)) {
		fs.mkdirSync(OUTPUT_DIR, (err) => {
			if (err) throw err;
		});
	}
	fs.writeFileSync(outputPath, render(employees), (err) => {
		if (err) throw err;
	});
	console.log("You're team has been created!");
}

createManager();