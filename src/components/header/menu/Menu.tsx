import React from "react";
import { Role } from "../../../types/auth";
import { HeaderMenuContent } from "./Menu.styles";

interface Props {
  handleSelect: (event: any) => void;
  role?: Role;
  logOut: () => void;
}

export const HeaderMenu: React.FC<Props> = ({ handleSelect, role, logOut }) => {
  const goToPage = (path: string) => {
    window.location.href = path;
  };
  switch (role) {
    case Role.USER:
      return (
        <HeaderMenuContent>
          <li className="header-menu-item">
            <a className="active" id={"1"} onClick={logOut} href="#Create Page">
              Log Out
            </a>
          </li>
        </HeaderMenuContent>
      );
    case Role.ADMIN:
      return (
        <HeaderMenuContent>
          <li className="header-menu-item">
            <a
              className="active"
              id={"1"}
              onClick={() => goToPage("/content")}
              href="#Create Page"
            >
              Content
            </a>
          </li>
          <li className="header-menu-item">
            <a className="active" id={"1"} onClick={logOut} href="#Create Page">
              Log Out
            </a>
          </li>
        </HeaderMenuContent>
      );
    default:
      return (
        <HeaderMenuContent>
          <li className="header-menu-item">
            <a
              className="active"
              id={"1"}
              onClick={handleSelect}
              href="#Create Page"
            >
              Sign In
            </a>
          </li>
        </HeaderMenuContent>
      );
  }
};
