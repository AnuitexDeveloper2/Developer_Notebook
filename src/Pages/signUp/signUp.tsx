import { Box, Button } from '@material-ui/core';
import { Form, Formik } from 'formik';
import React, { FC } from 'react';
import Modal from 'react-modal';
import { useDispatch } from 'react-redux';
import close from '../../assets/zondicons/close.svg';
import MyTextInput from '../../components/common/myInputs/myTextInput';
import { useModalState } from '../../components/hooks/modal';
import { registerObject } from '../../helper/yupValidationSchemas';
import { RegisterAction } from '../../redux/actions/auth/authActions';
import { CloseRegisterAction } from '../../redux/actions/header/headerActions';
import { RegisterRequest } from '../../types/auth';

const Register: FC = () => {
  const dispatch = useDispatch();
  const { isOpen, onToggle } = useModalState();

  const handleClick = () => {
    onToggle();
  };

  const closeModal = () => {
    dispatch(CloseRegisterAction());
  };

  const handleSubmit = (values: RegisterRequest) => {
    dispatch(RegisterAction(values))
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
          <Box display="flex" justifyContent="center" marginTop="5em">
            <Form>
              <MyTextInput label="First Name" name="firstName" />
              <MyTextInput label="Last Name" name="lastName" />
              <MyTextInput label="Email" name="email" />
              <MyTextInput label="Password" name="password" />
              <MyTextInput label="Confirm Password" name="confirmPassword" />
              <Box display="flex" justifyContent="center" marginTop="1em">
                <button type="submit">Submit</button>
              </Box>
            </Form>
          </Box>
        </Formik>
      </Modal>
    </>
  );
};

export default Register;
