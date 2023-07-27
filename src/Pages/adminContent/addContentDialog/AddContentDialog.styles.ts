import styled from "styled-components";
import { Dialog } from "@mui/material";
import { Button } from "antd";
import { RemoveActionImage } from "../../../styles/common.styles";
import { mainColor } from "../../../styles/colors";

export const AddContentDialog = styled(Dialog)`
  .MuiDialogContent-root {
    display: "flex";
    flex-direction: "column";
    justify-content: "flex-end";
  }
`;

export const AddContentModalTitle = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  margin-bottom: 20px;
`;

export const NewTitleInput = styled("input")`
  width: 10rem;
  height: 1.5rem;
`;

export const AppointmentSection = styled("div")``;

export const SelectAppointmentSection = styled("div")`
  margin-top: 20px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  position: relative;
  .switcher {
    position: absolute;
    right: -142px;
    top: -54px;
  }
`;

export const RemoveAppointment = styled(RemoveActionImage)`
  position: absolute;
  right: -40px;
  top: -7px;
  z-index: 99999;
`;

export const AppointmentItem = styled("div")`
  display: flex;
  justify-content: center;

  select {
    width: 10rem;
    height: 1.5rem;
  }

  button {
    color: #ffff;
    border: none;
    background-color: #824c67;
    padding: 5px;
    border-radius: 5px;
    display: block;
    cursor: pointer;
  }
`;

export const EditAppointmentButton = styled(Button)`
  border-radius: 5px;
  border: 1px solid blue;
  color: white;
  background-color: blue;
  font-weight: 400;
  &:hover {
    border-radius: 8px;
    color: white !important;
  }
  &.edit {
    background-color: #f3cdcd;
    color: blue;
    border: 1px solid #f3cdcd;
    &:hover {
      border-radius: 8px;
      color: blue !important;
    }
  }
`;

export const FormContent = styled("div")`
  width: 25rem;
`;

export const SubmitAddTopic = styled(Button)`
  border-radius: 5px;
  border: 1px solid ${mainColor};
  color: white;
  background-color: ${mainColor};
  font-weight: 400;
  &:hover {
    border-radius: 8px;
    color: white !important;
    border: 1px solid ${mainColor};
  }
`;
