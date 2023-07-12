import React from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../../redux/store";
import { Role } from "../../../types/auth";

interface Props {
  children: any;
}

const AdminRoute: React.FC<Props> = ({ children }) => {
  const selector = useAppSelector((state) => state);

  const { authReducer } = selector;

  if (authReducer.user?.role === Role.ADMIN) {
    return <React.Fragment>{children}</React.Fragment>;
  } else {
    return <Navigate to={{ pathname: "/" }} />;
  }
};

export default AdminRoute;
