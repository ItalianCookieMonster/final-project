import Validations from "./validations";
export default class SignUpValidation {
    constructor(email, password, name, surname) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.surname = surname;
    }

    checkValidation(){
        let errors = [];
        if (!Validations.checkEmail(this.email)) {
        
            console.log(this.email);
            errors.push("Email is invalid");
        }

        if(!Validations.minLength(this.name, 1)) {
            console.log(this.name);
            errors.push("Name is required");
        }

        if(!Validations.minLength(this.surname, 1)) {
            errors.push("Surname is required");
        }

        if(!Validations.checkPassword(this.password)){
            errors.push("Password is invalid");
        }

        return errors;
    }
}


