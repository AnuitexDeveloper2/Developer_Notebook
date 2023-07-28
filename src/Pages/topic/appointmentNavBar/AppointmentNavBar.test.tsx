import { render, screen } from "@testing-library/react";
import { Record } from "../../../types/content";
import { mount } from "enzyme";

import AppointmentNavBar from "./AppointmentNavBar";

describe("AppointmentNavBar", () => {
  const defaultProps = {
    items: Array<Record>(),
    active: "",
    selectAppointment: jest.fn(),
  };
  const mountComponent = (props = defaultProps) => mount(<AppointmentNavBar {...defaultProps}/>);
  it("should return component", () => {
    const wrapper = mountComponent()
    expect(wrapper).not.toBeNull();
  });
});
