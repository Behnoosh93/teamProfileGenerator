const path = require("path");
const fs = require("fs");
const Employee = require("./Employee");

const tempDiraction= path.resolve(__dirname, "../Templates ");

const render = (employees) => {
    const html =[];

    html.push (...employees.filter ((employee)=>employee.getRole() === "Manager")
    .map((manager) => renderManager(manager)));

    html.push (...employees.filter ((employee)=>employee.getRole() === "Engineer")
    .map((engineer) => renderManager(engineer)));

    html.push (...employees.filter ((employee)=>employee.getRole() === "Intern")
    .map((intern) => renderManager(intern)));

    return renderMain(html.join(""))

};

const renderManager = (manager) => {
    let template = fs.readFileSync( path.resolve(tempDiraction, "manager.html"), "utf8");
    template = repholders(template, "name", manager.getName());
    template = repholders(template, "email", manager.getEmail());
    template = repholders(template, "id", manager.getId());
    template = repholders(template, "role", manager.getRole());
    template = repholders(template, "officeNumber", manager.getOfficeNumber());
    return template;
}
const renderEngineer = (engineer) => {
	let template = fs.readFileSync(
		path.resolve(tempDiraction, "engineer.html"),
		"utf8"
	);
	template = repholders(template, "name", engineer.getName());
	template = repholders(template, "email", engineer.getEmail());
	template = repholders(template, "id", engineer.getId());
    template = repholders(template, "role", engineer.getRole());
	template = repholders(template, "github", engineer.getGithub());
	return template;
};

const renderIntern = (intern) => {
	let template = fs.readFileSync(
		path.resolve(tempDiraction, "intern.html"),
		"utf8"
	);
	template = repholders(template, "name", intern.getName());
	template = repholders(template, "email", intern.getEmail());
	template = repholders(template, "id", intern.getId());
    template = repholders(template, "role", intern.getRole());
	template = repholders(template, "school", intern.getSchool());
	return template;
};
const renderMain = (html) => {
	const template = fs.readFileSync(
		path.resolve(tempDiraction, "main.html"),
		"utf8"
	);
	return repholders(template, "team", html);
};

const repholders = (template, placeholder, value) => {
	const pattern = new RegExp("{{ " + placeholder + " }}", "gm");
	return template.replace(pattern, value);
};

module.exports = render;