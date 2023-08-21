import { mount } from "enzyme";
import { ContentItem } from "../../../types/content";
import ContentSection from "./ContentSection";

describe("ContentSection", () => {
  const defaultProps = {
    items: Array<ContentItem<string>>(),
  };
  const mountComponent = (props = defaultProps) =>
    mount(<ContentSection {...props} />);
  const wrapper = mountComponent();

  it("shold return component", () => {
    expect(wrapper).not.toBeNull();
  });
});
