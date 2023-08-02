import React, { FC, useState } from "react";
import User from "../../assets/zondicons/user.svg";
import ModalManager from "../common/modalManager";
import { handleLoginModal } from "../../redux/reducers/headerReducer";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { logOutAction } from "../../redux/reducers/authReducer";
import { HeaderTitle, HeaderUserIcon, HeaderWrapper } from "./Header.styles";
import { HeaderMenu } from "./menu/Menu";

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
    <HeaderWrapper>
      <div></div>
      <HeaderTitle>
        <a href="/">Notebook</a>
      </HeaderTitle>
      <div>
        <HeaderUserIcon
          src={User}
          onClick={showDropdownMenu}
          alt="menu"
          width={40}
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
    </HeaderWrapper>
  );
};

export default Header;
