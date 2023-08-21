import React from "react";
import ProgressBar from "../../../components/progressBar/ProgressBar";
import { useAppSelector } from "../../../redux/store";
import { Record } from "../../../types/content";
import { AppointmentNavBarWrapper } from "./AppointmentNavBar.styles";

interface Props {
  items: Array<Record>;
  active: string;
  selectAppointment: (event: React.MouseEvent<HTMLLIElement>) => Promise<void>;
}

const AppointmentNavBar: React.FC<Props> = ({
  items,
  active,
  selectAppointment,
}) => {
  const { searchedContent } = useAppSelector((state) => state.contentReducer);
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
            {searchedContent.some((c) => c.appointment === item._id) &&
            item._id !== active ? (
              <ProgressBar text={item.title} />
            ) : (
              item.title
            )}
          </li>
        ))}
      </ul>
    </AppointmentNavBarWrapper>
  );
};

export default AppointmentNavBar;
