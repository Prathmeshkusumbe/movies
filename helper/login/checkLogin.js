import jwt  from "jsonwebtoken";
import { getSiteCookie } from "../general_helper";

export default function checkLogin(e, p){
  const secret = process.env.NEXT_PUBLIC_JWT_SECRET;
  console.log(secret);
  if(e == 'testuser' && p=='testpass'){
    const data = { firstName:'testfirstname', lastName:'testLastName', username: 'testuser', email: 'test@test.com' }
    const authtoken = jwt.sign(data, secret);

    return {status:true, email:'test@test.com', username:'testUser', authtoken};
  }
  else{
    return {status:false}
  }
}

function validateEmail(email) {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
}

function validateUsername(username) {
  const regex = /^[a-zA-Z0-9_-]{3,20}$/;
  return regex.test(username);
}

export function checkValidation(firstName, lastName, email, password, username, cPass){

  if (firstName == '') {
    return { status: false, msg: 'please enter your first Name' };
  }
  // if (lastName == '') {
  //   return { status: false, msg: 'please enter your last Name' };
  // }

  if (!validateUsername(username)) {
    return { status: false, msg: 'please enter valid username.' };
  }
  if (email == '') {
    return {status:false, msg:'please enter your email.'};
  }
  else{
    const res = validateEmail(email);
    if (!res) return { status: false, msg: 'please enter  valid email' };
  }
  if (password == '') {
    return {status: false, msg: 'please enter your password'};
  }
  else{
    if(password.length < 8) return { status: false, msg: 'your password should be of min 8 characters' };
  }
  if (password != cPass) {
    return { status: false, msg: 'password and confirm password does not match' };
  }
  return {status:true}
}

export function checkValidationForUpdate(firstName, lastName){

  if (firstName == '') {
    return { status: false, msg: 'please enter your first Name' };
  }
  return { status: true }
}