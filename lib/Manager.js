
const { extname } = require("node:path");
const Employee = require("./Employee");
class Manager extends Employee {
    constructor( name, email, id , OfficeNumber){
        super (name , email , id);
        this.OfficeNumber = OfficeNumber;

    }
    getOfficeNumber(){
        return this.getOfficeNumber;
    }
    getRole(){
        return "Manager"
    }
}
module.exports = Manager;