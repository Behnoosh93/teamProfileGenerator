const Employee = require("./Employee");

class Engineer extends Employee {

    constructor (name , email , id , github ){
        super (name,email,id);
        this.github = github;
    }
    //return engireer 
    getRole(){
        return "Engineer"
    }
    // return github 
    getGithub(){
        return this.getGithub;
    }
}

module.exports = Engineer;