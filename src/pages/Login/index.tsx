import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import "./index.css"
import Swal from 'sweetalert2'

import { CallLogin } from '../../API'

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useNavigate();

  const handleEmailChange = (e: any) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
  };

  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    var jsonParam: any = {
      username: username,
      password: password
    }
    CallLogin(jsonParam).then((resp: any)=> {
      localStorage.setItem("token", resp.data.token)
      history("/todos")
    }).catch((err: any)=> {
      Swal.fire({
          icon: 'error',
          title: err.response.data.status,
          text: err.response.data.message
        })
  })
  };

  const handleRegisterClick = () => {
    history("/register")
  };

  return (
    <div className="login-page">
      <form onSubmit={handleFormSubmit}>
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="username" style={{color: "black"}}>Username</label>
          <input
            type="username"
            id="username"
            placeholder="Enter your username"
            value={username}
            onChange={handleEmailChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" style={{color: "black"}}>Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <div className="button-group">
          <button type="submit">Login</button>
          <button type="button" onClick={handleRegisterClick} style={{ backgroundColor: "red", marginLeft: "5px" }}>Register</button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
