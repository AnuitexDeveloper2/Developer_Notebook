import { connect, useSelector } from 'react-redux';
import React, { FC, useEffect, useState } from 'react';
import LogIn from '../../../Pages/signIn/LogIn';
import { AppState } from '../../../redux/reducers/rootReducer';

interface ModalProps {
    popUpState: AppState
}

const ModalManager: FC<any> = (props) => {
    const test = useSelector((state: AppState) => state)
    if (props.popUpState.openLogin) {
        return (
            <LogIn />
        )
    }
    return (
        <div></div>
    )
}

const mapStateToProps = (state: AppState) => {
    return {
        popUpState: state.headerManager
    }
}

export default connect(mapStateToProps, null)(ModalManager)