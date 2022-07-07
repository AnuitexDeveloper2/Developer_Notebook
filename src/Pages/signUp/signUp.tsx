import { Box } from '@material-ui/core';
import { Form, Formik } from 'formik';
import React, { FC, useState } from 'react';
import Modal from 'react-modal';
import { useDispatch } from 'react-redux';

import close from '../../assets/zondicons/close.svg';
import MyTextInput from '../../components/common/myInputs/myTextInput';
import { registerObject } from '../../helper/yupValidationSchemas';
import { RegisterAction } from '../../redux/actions/auth/authActions';
import { CloseRegisterAction } from '../../redux/actions/header/headerActions';
import { RegisterForm } from '../../types/auth';
import './index.scss';

const Register: FC = () => {
  const dispatch = useDispatch();

  const [state, setState] = useState({
    confirmPassword: '',
    isPasswordMatchError: false,
    isSuccess: false,
    error: ''
  });

  const closeModal = () => {
    dispatch(CloseRegisterAction());
  };

  const handleSubmit = async(values: RegisterForm) => {
    if (values.password !== state.confirmPassword) {
      setState({ ...state, isPasswordMatchError: true });
      return;
    }
    const result = await dispatch(RegisterAction(values)) as any;
    if (result.error) {
      setState({...state, error: result.error})
      return
    }
    setState({...state, error: ''})
    localStorage.setItem('access', result.AccessToken);
    localStorage.setItem('refresh', result.RefreshToken);
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
          {(formik: any) => (
            <Box display="flex" justifyContent="center" marginTop="3em" marginBottom="2em">
              <Form>
                <MyTextInput label="First Name" name="firstName" />
                <MyTextInput label="Last Name" name="lastName" />
                <MyTextInput label="Email" name="email" />
                <div className='sign-up-group'>
                  <MyTextInput label="Password" name="password" />
                  <div className="form-group">
                    <label htmlFor="confirm" className="base-label">
                      Confirm Password
                    </label>
                    <input
                      className="base-input"
                      onChange={handleChange}
                      name="confirm"
                    />
                    {state.isPasswordMatchError && (
                      <div className="error">Password did not match</div>
                    )}
                  </div>
                </div>
                <Box display="flex" justifyContent="center" marginTop="">
                  <div className="button-container-1">
                    <span className="mas">Register</span>
                    <button
                      id="work"
                      type="submit"
                      name="Hover"
                      disabled={!(formik.isValid && formik.dirty)}
                    >
                      Register
                    </button>
                  </div>
                    <div className='error'>{state.error}</div>
                </Box>
              </Form>
            </Box>
          )}
        </Formik>
      </Modal>
    </>
  );
};

export default Register;
