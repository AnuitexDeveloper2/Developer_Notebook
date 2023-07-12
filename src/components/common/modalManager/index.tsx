import { connect, useSelector } from "react-redux";
import React, { FC, useEffect, useState } from "react";
import LogIn from "../../../Pages/signIn/LogIn";
import { HeaderState } from "../../../redux/reducers/headerReducer";
import Register from "../../../Pages/signUp/signUp";
import { useAppSelector } from "../../../redux/store";

interface ModalProps {
  popUpState: HeaderState;
}

const ModalManager: FC<any> = (props) => {
  const selector = useAppSelector((state) => state);
  const { headerReducer } = selector;
  if (headerReducer.openLogin) {
    return <LogIn />;
  }
  if (headerReducer.openRegister) return <Register />;
  return <></>;
};

export default ModalManager;
