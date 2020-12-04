import React, { FC, useState } from 'react';
import "./index.css";
import user from "../../assets/zondicons/user.svg";
import ModalManager from '../common/modalManager';
import { connect } from "react-redux";
import { AppState } from '../../redux/reducers/rootReducer';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { OpenSignInAction } from '../../redux/actions/header/headerActions';

interface Props {
    openLogIn: () => void
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
                Notebook
                </div>
            <div>

                <img src={user} onClick={showDropdownMenu} className="user-icon" alt="" />
                {state.showMenu ? (
                    <ul>
                        <li><a className="active" id={"1"} onClick={handleSelect} href="#Create Page">Sign In</a></li>
                    </ul>
                ) :
                    (
                        null
                    )
                }
                <ModalManager />
            </div>
        </div>
    )
}

const mapStateToProps = (state: AppState) => {
    return {
        modalManeger: state.headerManager
    }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
    return {
        openLogIn: () => dispatch(OpenSignInAction())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Header)