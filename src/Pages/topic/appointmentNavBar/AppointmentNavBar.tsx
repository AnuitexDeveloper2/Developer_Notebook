import React from "react";
import { Record } from "../../../types/content";
import { AppointmentNavBarWrapper } from "./AppointmentNavBar.styles";

interface Props {
  items: Array<Record>;
  active: string;
  selectAppointment: (event: React.MouseEvent<HTMLLIElement>) => Promise<void>;
}

const AppointmentNavBar: React.FC<Props> = ({ items, active, selectAppointment}) => {
  return (
    <AppointmentNavBarWrapper>
      <ul>
        {items.map((item) => (
          <li
            onClick={selectAppointment}
            key={item._id}
            className={`${item._id === active ? "active" : ""}`}
            id={item._id}
          >
            {item.title}
          </li>
        ))}
      </ul>
    </AppointmentNavBarWrapper>
  );
};

export default AppointmentNavBar;
