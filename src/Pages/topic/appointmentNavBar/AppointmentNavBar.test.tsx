import { Record } from "../../../types/content";
import { mount } from "enzyme";

import AppointmentNavBar from "./AppointmentNavBar";
import { act } from "react-dom/test-utils";

describe("AppointmentNavBar", () => {
  const defaultProps = {
    items: Array<Record>(),
    active: "",
    selectAppointment: jest.fn(),
  };
  const mountComponent = (props = defaultProps) =>
    mount(<AppointmentNavBar {...props} />);
  const wrapper = mountComponent();

  it("should return component", () => {
    expect(wrapper).not.toBeNull();
  });

  it("should render appointments correctly", () => {
    act(() => {
      wrapper.setProps({
        items: [
          { _id: "1", title: "test" },
          { _id: "2", title: "test1" },
        ],
      });
    });
    expect(wrapper.findWhere((node) => node.type() === "li")).toHaveLength(2);
  });
});
