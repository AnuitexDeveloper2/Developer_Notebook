import React from "react";
import { mount } from "enzyme";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import AddContent from "./AddContent";
import { Topic } from "../../../types/content";

describe("AddContent Component", () => {
  const onCloseMock = jest.fn();
  const content = null;
  const topic: Topic = {
    _id: "topicId",
    description: 'description',
    title: 'title',
    topic: '',
    img: ''
  };

  it("should render without errors", () => {
    mount(<AddContent content={content} onClose={onCloseMock} topic={topic} />);
  });

  it("should call onClose when Submit button is clicked", () => {
    const { getByText } = render(
      <AddContent content={content} onClose={onCloseMock} topic={topic} />
    );

    fireEvent.click(getByText("Submit"));
    expect(onCloseMock).toHaveBeenCalled();
  });

  // You can write more tests to cover various aspects of the component
});
