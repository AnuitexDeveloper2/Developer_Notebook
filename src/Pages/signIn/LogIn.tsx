import React, { ChangeEvent, useState } from "react";
import Modal from "react-modal";
import close from "../../assets/zondicons/close.svg";
import "./index.css";
import { Box, TextField } from "@mui/material";
import { useAppDispatch } from "../../redux/store";
import {
  handleLoginModal,
  handleRegisterModal,
} from "../../redux/reducers/headerReducer";
import { signInAction } from "../../redux/actions/auth/authActions";
import { ActionResponse } from "../../models/response/types";
import { LoginResponse } from "../../redux/actions/auth/types";

interface State {
  email: string;
  password: string;
}

const LogIn: React.FC = () => {
  const dispatch = useAppDispatch();
  const [state, setState] = useState<State>({
    email: "",
    password: "",
  });

  const [error, setError] = useState<string>("");

  const closeSignIn = () => {
    dispatch(handleLoginModal(false));
  };

  const openRegister = () => {
    dispatch(handleLoginModal(false));
    dispatch(handleRegisterModal(true));
  };
  const handleChange = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setState({
      ...state,
      [event.currentTarget.name]: event.currentTarget.value,
    });
    setError("");
  };
  const handleSubmit = async () => {
    const { payload } = (await dispatch(
      signInAction(state)
    )) as ActionResponse<LoginResponse>;
    if (payload.error) {
      setError(payload.error);
      return;
    }
    dispatch(handleLoginModal(false));
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
        marginTop="5em"
      >
        <div className="login-container">
          <div className="email-field">
            <TextField
              label="Email"
              className="base-input"
              onChange={handleChange}
              name="email"
            />
          </div>
          <div className="password-field">
            <TextField
              label="Password"
              className="base-input"
              onChange={handleChange}
              name="password"
            />
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
          <div>{error}</div>
        </div>
      </Box>
    </Modal>
  );
};

export default LogIn;
