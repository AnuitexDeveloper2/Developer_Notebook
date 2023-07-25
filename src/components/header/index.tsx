import React, { FC, useState } from "react";
import user from "../../assets/zondicons/user.svg";
import ModalManager from "../common/modalManager";
import {
  handleLoginModal,
  HeaderState,
} from "../../redux/reducers/headerReducer";
import { HeaderMenu } from "./menu";

import "./index.css";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { logOutAction } from "../../redux/reducers/authReducer";

const Header: FC = () => {
  const dispatch = useAppDispatch();
  const selector = useAppSelector((state) => state);

  const { authReducer } = selector;

  const [state, setState] = useState({
    showModal: false,
    showMenu: false,
    selectedItem: 0,
  });

  const handleSelect = () => {
    setState({ ...state, showMenu: false });
    dispatch(handleLoginModal(true));
  };

  const showDropdownMenu = (event: React.MouseEvent<HTMLImageElement>) => {
    event.preventDefault();
    setState({ ...state, showMenu: !state.showMenu });
  };

  const logOut = () => {
    dispatch(logOutAction());
  };

  return (
    <div className="header">
      <div></div>
      <div className="header-title">
        <a href="/">Notebook</a>
      </div>
      <div>
        <img
          src={user}
          onClick={showDropdownMenu}
          className="user-icon"
          alt=""
        />
        {state.showMenu ? (
          <HeaderMenu
            handleSelect={handleSelect}
            role={authReducer.user?.role}
            logOut={logOut}
          />
        ) : null}
        <ModalManager />
      </div>
    </div>
  );
};

export default Header;
