import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CallChangePassword, CallGetUserDetail } from '../../API';
import LogoutIcon from '@mui/icons-material/Logout';
import KeyIcon from '@mui/icons-material/Key';
import "./index.css"
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import { baseAPIURL } from '../../constant';

const Fab = (props: any) => {
  const [showPopup, setShowPopup] = useState(false);
  const { LogoutHandle, changePasswordHandle } = props;
  const handleFabClick = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div className="fab-container">

      {showPopup && (
        <div className="popup">

          <button className="more-button" onClick={changePasswordHandle}><KeyIcon /></button>
          <button className="more-button" onClick={LogoutHandle}><LogoutIcon /></button>
        </div>

      )}
      <button className="fab" onClick={handleFabClick}>
        {showPopup ? '−' : '+'}
      </button>

    </div>
  );
};

const ContentLayout = (props: any) => {

  const { children } = props;

  const history = useNavigate();

  const LogoutHandle = () => {
    Cookies.remove("jwtToken");
    history("/");
  }

  const changePasswordHandle = () => {
    Swal.fire({
      title: 'Change Password',
      html: `<input type="text" id="username" class="swal2-input" placeholder="Username">
             <input type="password" id="old-password" class="swal2-input" placeholder="Old Password">
             <input type="password" id="new-password" class="swal2-input" placeholder="New Password">`,
      confirmButtonText: 'Submit',
      focusConfirm: false,
      preConfirm: () => {

        const username: any = Swal.getPopup()?.querySelector<HTMLInputElement>('#username')?.value;
        const oldPassword: any = Swal.getPopup()?.querySelector<HTMLInputElement>('#old-password')?.value;
        const newPassword: any = Swal.getPopup()?.querySelector<HTMLInputElement>('#new-password')?.value;


        if (!username || !oldPassword || !newPassword) {
          Swal.showValidationMessage(`Please enter login, old and new password`)
        }

        return { username: username, oldPassword: oldPassword, newPassword: newPassword }
      }
    }).then((result: any) => {

      var jsonParam: any = {
        username: result.value.username,
        oldPassword: result.value.oldPassword,
        newPassword: result.value.newPassword
      }
      CallChangePassword(jsonParam).then((resp: any) => {
        Swal.fire({
          icon: 'success',
          title: resp.data.status,
          text: resp.data.message
        })
      }).catch((err: any) => {
        Swal.fire({
          icon: 'error',
          title: err.response.data.status,
          text: err.response.data.message
        })
      })
    })
  }

  useEffect(() => {

    console.log("boss", Cookies.get('jwtToken'))
    // if (!Cookies.get('jwtToken')) {
    //   window.location.replace(`${baseAPIURL}/auth/login`);
    // }

    CallGetUserDetail().then((resp: any) => {
      console.log(resp);
    }).catch((err: any) => {
      console.log(err);
      window.location.href = `${baseAPIURL}/auth/login`
    })}, [])


  return (
    <div>
      <div className='flex'>
        {children}
      </div>
      <Fab
        LogoutHandle={LogoutHandle}
        changePasswordHandle={changePasswordHandle} />
    </div>
  );
};

export default ContentLayout;