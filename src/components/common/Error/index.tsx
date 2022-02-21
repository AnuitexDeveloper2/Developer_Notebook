import React, { FC } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import './index.css';

import { CloseErrorAction } from '../../../redux/actions/header/headerActions';

const ErrorModal: FC<{ error: boolean }> = ({ error }) => {
  const dispatch = useDispatch();
  const closeModal = () => {
    dispatch(CloseErrorAction());
  };

  useEffect(() => {
    setTimeout(() => {
      closeModal();
    }, 8000);
  }, []);
  return (
    <div className="error-wrapper">
      {' '}
      <div className="error-close" onClick={closeModal}>
        x
      </div>{' '}
      <div className="error-content">{error}</div>
    </div>
  );
};

export default ErrorModal;
