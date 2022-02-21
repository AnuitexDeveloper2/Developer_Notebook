import { connect, useSelector } from 'react-redux';
import React, { FC, useEffect, useState } from 'react';
import LogIn from '../../../Pages/signIn/LogIn';
import { AppState } from '../../../redux/reducers/rootReducer';
import { HeaderState } from '../../../redux/reducers/headerReducer';
import Register from '../../../Pages/signUp/signUp';
import ErrorModal from '../Error';

interface ModalProps {
  popUpState: HeaderState;
}

const ModalManager: FC<any> = (props) => {
  if (props.popUpState.openLogin) return <LogIn />;
  if (props.popUpState.openRegister) return <Register />;
  if (props.popUpState.openError)
    return <ErrorModal error={props.popUpState.openError} />;

  return <></>;
};

const mapStateToProps = (state: AppState) => {
  return {
    popUpState: state.headerManager,
  };
};

export default connect(mapStateToProps, null)(ModalManager);
