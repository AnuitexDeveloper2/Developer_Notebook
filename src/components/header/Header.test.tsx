import { mount } from "enzyme";
import { wrapWithProvider } from "../../utils/enzyme";
import Header from "./Header";

describe("Header", () => {
  jest.mock("../../assets/zondicons/user.svg", () => {
    return {
      default: "user.svg",
    };
  });

  const component = mount(wrapWithProvider(<Header />));

  it("should render without error", () => {
    expect(component.html()).toBeTruthy();
  });
});
