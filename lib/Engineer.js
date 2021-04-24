class Employee {
    constructor(name,email,id){

        this.name=name;
        this.email= email;
        this.id = id;
    }
    getName (){
        if(this.name !== null){
            return this.name;
        } 
        else{
            throw new Error ("Please enter your name ..");
        }
    }
    getEmail (){
        return this.email;
    
    }
    getId(){
        return this.id;
    }
    getRole(){
        return "Employee"
    }

}
module.exports = Employee;