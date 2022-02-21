import React, { FC } from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../../redux/reducers/rootReducer';
import { UserState } from '../../../redux/reducers/userReducer';
import { Route, Redirect, withRouter } from 'react-router-dom';

interface Props {
  user: UserState;
}

const AdminRoute: FC<Props> = ({ children, user }) => {
  if (user && user.role === 'Admin') {
    return <React.Fragment>{children}</React.Fragment>;
  } else {
    return <Redirect to={{ pathname: '/' }} />;
  }
};

const mapStateToProps = (state: AppState) => {
  return {
    user: state.auth.user,
  };
};

export default connect(mapStateToProps, null)(AdminRoute);
