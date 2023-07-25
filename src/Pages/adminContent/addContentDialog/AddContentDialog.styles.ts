import styled from "styled-components";
import { Dialog } from "@mui/material";

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
