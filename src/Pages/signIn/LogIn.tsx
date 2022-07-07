import React, { ChangeEvent, FC, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import Modal from 'react-modal';
import close from '../../assets/zondicons/close.svg';
import { AnyAction } from 'redux';
import {
  CloseLogInAction,
  OpenRegisterAction,
} from '../../redux/actions/header/headerActions';
import { ThunkDispatch } from 'redux-thunk';
import { Box, TextField } from '@material-ui/core';
import { SignInAction } from '../../redux/actions/auth/authActions';

import './index.scss';
import MyTextInput from '../../components/common/myInputs/myTextInput';
interface Props {
  closeModal: () => void;
  openRegister: () => void;
}
interface State {
  email: string;
  password: string;
}

const LogIn: FC<Props> = (props) => {
  const dispatch = useDispatch();
  const [state, setState] = useState<State>({
    email: '',
    password: '',
  });

  const [error, setError] = useState({
    emailError: '',
    passwordError: '',
  });

  const closeSignIn = () => {
    props.closeModal();
  };

  const openRegister = () => {
    props.closeModal();
    props.openRegister();
  };
  const handleChange = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    setState({
      ...state,
      [event.currentTarget.name]: event.currentTarget.value,
    });
    setError({ emailError: '', passwordError: '' });
  };
  const handleSubmit = async () => {
    const result: any = await dispatch(SignInAction(state));
    if (result.error) {
      debugger
      const resultError = result.error.toString() as string;
      setError({
        emailError: resultError.toLowerCase().includes('email') ? resultError : '',
        passwordError: resultError.toLowerCase().includes('password')
          ? resultError
          : '',
      });
      return;
    }
    props.closeModal();
    localStorage.setItem('access', result.AccessToken);
    localStorage.setItem('refresh', result.RefreshToken);
  };
  return (
    <Modal isOpen={true} ariaHideApp={false}>
      <div className="modal-header">
        <img
          src={close}
          onClick={closeSignIn}
          className="close-modal"
          alt="close"
        />
      </div>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        marginTop="3em"
        marginBottom="3em"
      >
        <form className="login-container">
          <div className="form-group">
            <label htmlFor="email" className="base-label">
              Email
            </label>
            <input
              className="base-input"
              onChange={handleChange}
              name="email"
            />
          </div>
          <div className="error">{error.emailError}</div>
          <div className="form-group">
            <label htmlFor="password" className="base-label">
              Pasword
            </label>
            <input
              className="base-input"
              onChange={handleChange}
              name="password"
            />
          </div>
          <div className="error">{error.passwordError}</div>
          <div className="button-container-1">
            <span className="mas">Log In</span>
            <button id="work" type="button" name="Hover" onClick={handleSubmit}>
              Log In
            </button>
          </div>
          <div className="button-container-3">
            <span className="create-account">Create Account</span>
            <button type="button" name="Hover" onClick={openRegister}> 
              Create Account
            </button>
          </div>
        </form>
      </Box>
    </Modal>
  );
};

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
  return {
    closeModal: () => dispatch(CloseLogInAction()),
    openRegister: () => dispatch(OpenRegisterAction()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
