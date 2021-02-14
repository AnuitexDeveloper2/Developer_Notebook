import { Box, Button, TextField } from '@material-ui/core';
import { Form, Formik, Field } from 'formik';
import React, { FC, useState } from 'react';
import Modal from 'react-modal';
import { useDispatch } from 'react-redux';
import close from '../../assets/zondicons/close.svg';
import MyTextInput from '../../components/common/myInputs/myTextInput';
import { registerObject } from '../../helper/yupValidationSchemas';
import { CloseRegisterAction } from '../../redux/actions/header/headerActions';
import { RegisterForm } from '../../types/auth';
import './index.scss';

const Register: FC = () => {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    confirmPassword: '',
    isPasswordMatchError: false,
    isSuccess: false,
  });

  const closeModal = () => {
    dispatch(CloseRegisterAction());
  };

  const handleSubmit = (values: RegisterForm) => {
    if (values.password !== values.confirmPassword) {
      setState({ ...state, isPasswordMatchError: true });
    }
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
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
          }}
          onSubmit={handleSubmit}
          validationSchema={registerObject}
        >
          <Box display="flex" justifyContent="center">
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
              {state.isPasswordMatchError && <div className="error">Password did not match</div>}
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
