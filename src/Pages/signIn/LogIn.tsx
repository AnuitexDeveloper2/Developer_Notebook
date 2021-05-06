import { connect } from 'react-redux';
import React, { ChangeEvent, FC, useState } from 'react';
import Modal from 'react-modal';
import close from '../../assets/zondicons/close.svg';
import { AnyAction } from 'redux';
import { CloseLogInAction, OpenRegisterAction } from '../../redux/actions/header/headerActions';
import { ThunkDispatch } from 'redux-thunk';
import './index.css';
import { Box, TextField } from '@material-ui/core';

interface Props {
  closeModal: () => void;
  openRegister: () => void;
}

interface State {
  email: string;
  password: string;
}

const LogIn: FC<Props> = (props) => {
  const [state, setState] = useState<State>({
    email: '',
    password: '',
  });
  const closeSignIn = () => {
    props.closeModal();
  };

  const openRegister = () => {
    props.closeModal()
    props.openRegister()
  }
  const handleChange = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    setState({
      ...state,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };
  const handleSubmit = () => {};
  return (
    <Modal isOpen={true} ariaHideApp={false} >
      <div className="modal-header">
        <img
          src={close}
          onClick={closeSignIn}
          className="close-modal"
          alt="close"
        />
      </div>
      <Box display="flex" alignItems="center" justifyContent="center" marginTop="5em">
      <div className="login-container">
        <div className="email-field">
          <TextField label="Email" className="base-input" onChange={handleChange} name="email" />
        </div>
        <div className="password-field">
          <TextField label="Password" className="base-input" onChange={handleChange} name="password" />
        </div>
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
      </div>
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
    openRegister: () => dispatch(OpenRegisterAction())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
