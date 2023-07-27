import styled from "styled-components";
import EditIcon from "@mui/icons-material/Edit";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

export const EditActionImage = styled(EditIcon)`
  cursor: pointer;
  min-width: 16px;
  padding: 8px;
  background-color: transparent;
  overflow: visible;
  border: none;
  font-size: 2.5rem !important;
  text-align: center;
  transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  border-radius: 50%;
`;

export const RemoveActionImage = styled(HighlightOffIcon)`
  color: rgb(216, 21, 21);
  cursor: pointer;
  min-width: 16px;
  padding: 8px;
  background-color: transparent;
  overflow: visible;
  border: none;
  font-size: 2.5rem !important;
  text-align: center;
  transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  border-radius: 50%;
`;

export const AddTopicName = styled("div")`
display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 18px;
  div {
    
  }
`