import { connect } from 'react-redux';
import React, { FC } from 'react';
import Modal from "react-modal";
import close from "../../assets/zondicons/close.svg";
import { AnyAction } from 'redux';
import { CloseLogInAction } from '../../redux/actions/header/headerActions';
import { ThunkDispatch } from 'redux-thunk';
import "./index.css"
import TextField from '@material-ui/core/TextField';


interface Props {
    closeModal: () => void
}

const LogIn: FC<Props> = (props) => {
    const closeSignIn = () => {
        props.closeModal()
    }
    return (
        <Modal
         isOpen={true}
        
        >
            <div className="modal-header">
                <img src={close} onClick={closeSignIn} className="close-modal" alt="close" />
            </div>
            <div className="login-container">
                <TextField label="Email"/>
            </div>
        </Modal>
    )
}

const mapStateToProps = () => {
    return {

    }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
    return {
        closeModal: () => dispatch(CloseLogInAction())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(LogIn)