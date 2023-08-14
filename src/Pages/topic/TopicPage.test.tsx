import { mount } from "enzyme";
import { wrapWithProvider } from "../../utils/enzyme";
import AppointmentNavBar from "./appointmentNavBar/AppointmentNavBar";
import ContentSection from "./contenSection/ContentSection";
import TopicPage from "./TopicPage";

describe("TopicPage", () => {
  const component = mount(wrapWithProvider(<TopicPage />));
  it("should render without error", () => {
    expect(component.html()).toBeTruthy();
  });

  it("should render AppointmentNavBar component", () => {
    expect(component.find(AppointmentNavBar)).toHaveLength(1);
  });

  it("should render ContentSection component", () => {
    expect(component.find(ContentSection)).toHaveLength(1);
  });
});
