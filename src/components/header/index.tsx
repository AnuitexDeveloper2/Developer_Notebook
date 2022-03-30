import React, { FC, useState } from 'react';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import user from "../../assets/zondicons/user.svg";
import ModalManager from '../common/modalManager';
import { connect } from "react-redux";
import { AppState } from '../../redux/reducers/rootReducer';
import { OpenSignInAction } from '../../redux/actions/header/headerActions';
import { LogOutAction } from '../../redux/actions/auth/authActions';
import { HeaderState } from '../../redux/reducers/headerReducer';
import { HeaderMenu } from "./menu";

import "./index.css";
import { UserState } from '../../redux/reducers/userReducer';
interface Props {
    logOut: () => void
    openLogIn: () => void
    modalManager: HeaderState
    user: UserState | undefined
}

const Header: FC<Props> = (props) => {
    const [state, setState] = useState({
        showModal: false,
        showMenu: false,
        selectedItem: 0
    })

    const handleSelect = (event: any) => {
        setState({ ...state, showMenu: false })
        props.openLogIn()

    }

    const showDropdownMenu = (event: React.MouseEvent<HTMLImageElement>) => {
        event.preventDefault();
        setState({ ...state, showMenu: !state.showMenu })
    }
    return (
        <div className="header">
            <div></div>
            <div className="header-title">
                <a href="/">
                    Notebook
                </a>
            </div>
            <div>

                <img src={user} onClick={showDropdownMenu} className="user-icon" alt="" />
                {state.showMenu ? (
                    <HeaderMenu handleSelect={handleSelect} role={props.user?.role} logOut={props.logOut} />
                ) :
                    (
                        null
                    )
                }
                <ModalManager popUpState={props.modalManager} />
            </div>
        </div>
    )
}

const mapStateToProps = (state: AppState) => {
    return {
        modalManeger: state.headerManager,
        user: state.auth.user
    }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
    return {
        logOut: () => dispatch(LogOutAction()),
        openLogIn: () => dispatch(OpenSignInAction())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Header)