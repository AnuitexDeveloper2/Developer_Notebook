import { mount } from "enzyme";
import { HeaderMenu } from "./Menu";
import { act } from "react-dom/test-utils";
import { Role } from "../../../types/auth";

describe("HeaderMenu", () => {
  const defaultProps = {
    handleSelect: jest.fn(),
    role: undefined,
    logOut: jest.fn(),
  };
  const mountComponent = (props = defaultProps) =>
    mount(<HeaderMenu {...props} />);

  const component = mountComponent();
  afterAll(() => {
    component.unmount();
  });

  it("should render without error", () => {
    expect(component.html()).toBeTruthy();
  });

  it("unathorized user should see login button", () => {
    expect(
      component.findWhere((node) => {
        return node.type() === "a" && node.text() === "Sign In";
      })
    ).toHaveLength(1);
  });

  it("admin shoul see two items in menu", () => {
    act(() => {
      component.setProps({
        role: Role.ADMIN,
      });
    });
    expect(
      component.findWhere((node) => {
        return node.type() === "a";
      })
    ).toHaveLength(2);
  });
});
