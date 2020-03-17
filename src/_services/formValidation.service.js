import { Subject } from 'rxjs';

const formIsValidSubject= new Subject(false);
const formErrrsSubject= new Subject({Email: '', Password: '', Name:'', Message:'', Phone:'', Address:'', Quantity:''});

let state = {

    formErrors: {Email: '', Password: '', Name:'', Message:'', Phone:'', Address:'', Quantity:''},
    
    valids : {
      addressValid: false, 
      quantityValid: false, 
      emailValid: false,
      passwordValid: false,
      nameValid: false,
      messageValid: false,
      phoneValid: false
    }
};


export const formValidationService = {
    validateField,
    //validateForm,
    formIsValid: formIsValidSubject.asObservable(),
    get isValid () { return formIsValidSubject.value },
    formErrrs: formErrrsSubject.asObservable(),
    get getformErrors(){return formErrrsSubject.value},
};

function validateField(fieldName, value) {
    let fieldValidationErrors = state.formErrors;
  
    switch(fieldName) {
      case 'Email':
        let emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.Email = emailValid ? '' : ' is invalid';
        state.valids.emailValid = emailValid ;
        break;
      case 'Password':
        let passwordValid = value.length >= 6;
        fieldValidationErrors.Password = passwordValid ? '': ' is too short';
        state.valids.passwordValid = passwordValid ;
        break;
        case 'Name':
        let nameValid = value.length >3;
        fieldValidationErrors.Name = nameValid ? '': ' Name is too short';
        state.valids.nameValid = nameValid;
        break;
        case 'Message':
        let messageValid = value.length >3;
        fieldValidationErrors.Message = messageValid ? '': ' Message is required';
        state.valids.messageValid = messageValid;
        break;
        case 'Phone':// only allow real positive numbers
        let phoneValid = value.match(/^\d+$/) !== null && parseInt(value) > 4;
        fieldValidationErrors.Phone = phoneValid ? '': ' Phone Number not valid';
        state.valids.phoneValid = phoneValid ;
        break;
        case 'Address':
        let addressValid = value.length > 0;
        fieldValidationErrors.Address = addressValid ? '': ' not valid';
        state.valids.addressValid = addressValid;
        break;
        case 'Quantity':// only allow real positive numbers
        let quantityValid = value.match(/^\d+$/) !== null && parseInt(value) > 0;
        fieldValidationErrors.Quantity = quantityValid ? '': ' Quantity Number not valid';
        state.valids.quantityValid = quantityValid ;
        break;
      default:
        break;
    }
    formErrrsSubject.next(fieldValidationErrors);
    formIsValidSubject.next({...state.valids});

    /*state.valids.forEach(e => {
      console.log(e.value)
    }); */

    /*for (let i in valids) {
      valids[i];
    }; */
 
  }
  
