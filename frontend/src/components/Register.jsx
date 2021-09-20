import React, {useRef, useContext} from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { UserContext } from './UserContext';

const backEndUrl = "http://localhost:3001";

function Register() {
  let history = useHistory();
  const registerUsername = useRef()
  const registerPwd = useRef()
  const registerRePwd = useRef()
  const signinUsername = useRef()
  const signinPwd = useRef()

  const context = useContext(UserContext);

  function handleRegister(event) {
    const username = registerUsername.current.value;
    const pwd = registerPwd.current.value;
    const rePwd = registerRePwd.current.value;

    if (username === "" || pwd === "") {
      // TODO: Username and Password shouldn't be blank
      return;
    };
    if (pwd !== rePwd) {
      // TODO: Passwords do not match
      return;
    };
    
    const api = backEndUrl + `/api/signup`;
  
    axios({
        method: 'post',
        url: api,
        data: {username: username, password: pwd}
    })
    .then(function (response) {
        if (response.status === 200) {
          context.isAuth = true;
          history.push("/homepage");
        } else {
          context.isAuth = false;
          // TODO: Username is already taken
        }
    })
    .catch(function (error) {
        console.log(error);
    });
  }

  function handleSignin(event) {
    const username = signinUsername.current.value;
    const pwd = signinPwd.current.value;

    if (username === "" || pwd === "") return;

    const api = backEndUrl + `/api/login`;

    axios({
      method: "post",
      url: api,
      data: {username: username, password: pwd}
    })
    .then((response) => {
      if (response.status === 200) {
        context.isAuth = true;
        history.push("/homepage");
      } else {
        context.isAuth = false;
        // TODO: Invalid Username or Password
      }
    })
    .catch((error) => {
      console.log(error);
    })
  }
  
  return (
    <div className="App">
      <div className="register">
        <form>
          <input ref={registerUsername} type="text" placeholder="Username"></input>
          <input ref={registerPwd}      type="text" placeholder="Password"></input>
          <input ref={registerRePwd}    type="text" placeholder="Re-Enter Password"></input>
        </form>
        <button onClick={handleRegister}>Register</button>
      </div>
      <div className="signin">
        <form>
          <input ref={signinUsername} type="text" placeholder="Username"></input>
          <input ref={signinPwd}      type="text" placeholder="Password"></input>
        </form>
        <button onClick={handleSignin}>Sign in</button>
      </div>
    </div>
  );
}


export default Register;