import styled from "styled-components";
import { teal } from "../../../styles/colors";

export const AppointmentNavBarWrapper = styled("div")`
  min-height: calc(100vh - 81px);;
  min-width: 20%;
  border-right: 1px solid #e5e5e5;
  background-color: #824c67;
  box-shadow: rgba(0, 0, 0, 0.35) 4px 4px 5px 0px;
  ul {
    margin: 0;
    padding: 0;
    li {
      padding: 10px;
      cursor: pointer;
      border-bottom: 1px solid #e5e5e5;
      font-weight: 700;
      color: #e5e5e5;
      &:hover {
        color: ${teal};
      }
      &.active {
        background-color: blue;
        &:hover {
          color: #e5e5e5;
        }
      }
    }
  }
`;
