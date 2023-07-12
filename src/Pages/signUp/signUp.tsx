import React, { FC, useState } from "react";
import { useDispatch } from "react-redux";
import Modal from "react-modal";
import { Box, Button, TextField } from "@mui/material";
import { Form, Formik, Field } from "formik";

import close from "../../assets/zondicons/close.svg";
import MyTextInput from "../../components/common/myInputs/myTextInput";
import { useModalState } from "../../components/hooks/modal";
import { registerObject } from "../../helper/yupValidationSchemas";
import { registerAction } from "../../redux/actions/auth/authActions";
import { RegisterForm } from "../../types/auth";
import "./index.css";
import { useAppDispatch } from "../../redux/store";
import { handleRegisterModal } from "../../redux/reducers/headerReducer";

const Register: FC = () => {
  const dispatch = useAppDispatch();
  const [state, setState] = useState({
    confirmPassword: "",
    isPasswordMatchError: false,
    isSuccess: false,
  });

  const closeModal = () => {
    dispatch(handleRegisterModal(false));
  };

  const handleSubmit = (values: RegisterForm) => {
    if (values.password !== state.confirmPassword) {
      setState({ ...state, isPasswordMatchError: true });
      return;
    }
    dispatch(registerAction(values));
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      isPasswordMatchError: false,
      confirmPassword: event.currentTarget.value,
    });
  };

  return (
    <>
      <Modal isOpen={true} ariaHideApp={false}>
        <div className="modal-header">
          <img
            src={close}
            onClick={closeModal}
            className="close-modal"
            alt="close"
          />
        </div>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          onSubmit={handleSubmit}
          validationSchema={registerObject}
        >
          <Box display="flex" justifyContent="center" marginTop="5em">
            <Form>
              <MyTextInput label="First Name" name="firstName" />
              <MyTextInput label="Last Name" name="lastName" />
              <MyTextInput label="Email" name="email" />
              <MyTextInput label="Password" name="password" />
              <TextField
                onChange={handleChange}
                className="base-input"
                label="Confirm Password"
                name="confirmPassword"
              />
              {state.isPasswordMatchError && (
                <div className="error">Password did not match</div>
              )}
              <Box display="flex" justifyContent="center" marginTop="1em">
                <div className="button-container-1">
                  <span className="mas">Register</span>
                  <button
                    id="work"
                    type="submit"
                    name="Hover"
                    onClick={() => handleSubmit}
                  >
                    Register
                  </button>
                </div>
              </Box>
            </Form>
          </Box>
        </Formik>
      </Modal>
    </>
  );
};

export default Register;
