import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import "./index.css"
import Swal from 'sweetalert2'

import { CallRegister } from '../../API'

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const history = useNavigate();

  const handleUsernameChange = (e: any) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
  };

  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
  };

  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    var jsonParam: any = {
      username: username,
      password: password,
      email: email
    }
    console.log(jsonParam);

    CallRegister(jsonParam).then((resp: any) => {
      Swal.fire({
        icon: 'success',
        title: resp.data.status,
        text: resp.data.message
      }).then(() => {
        history("/login")
      })
    }).catch((err: any) => {
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
          <label htmlFor="username" style={{ color: "black" }}>Username</label>
          <input
            type="username"
            id="username"
            placeholder="Enter your username"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email" style={{ color: "black" }}>Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" style={{ color: "black" }}>Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <div className="button-group">
          <button type="submit">Submit</button>
          <button type="button" onClick={handleRegisterClick} style={{ backgroundColor: "red", marginLeft: "5px" }}>Back</button>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
