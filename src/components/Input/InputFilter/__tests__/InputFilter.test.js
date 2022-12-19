import {
  cleanup,
  render,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import InputFilter from "../InputFilter";
import "@testing-library/jest-dom/extend-expect";

afterEach(cleanup);

it("InputFilter", () => {
  render(
    <InputFilter
      labelText="For monthly points, type in full month"
      placeHolderText="december"
    />
  );
  expect(
    screen.getByText("For monthly points, type in full month")
  ).toBeInTheDocument();
  expect(screen.getByPlaceholderText("december")).toBeInTheDocument();
});

it("Input Change", async () => {
  const handleInputSubmit = jest.fn();
  render(
    <InputFilter
      labelText="foo"
      placeHolderText="month"
      handleInputSubmit={handleInputSubmit}
    />
  );
  const inputElement = screen.getByTestId("input-element");
  fireEvent.change(inputElement, { target: { value: "december" } });
  expect(inputElement.value).toBe("december");
});

it("handleInputSubmit -click enter", async () => {
  const handleInputSubmit = jest.fn();
  render(
    <InputFilter
      labelText="foo"
      placeHolderText="month"
      handleInputSubmit={handleInputSubmit}
    />
  );
  const inputElement = screen.getByTestId("input-element");
  const inputForm = screen.getByTestId("input-form");
  fireEvent.change(inputElement, { target: { value: "december" } });
  fireEvent.submit(inputForm);
  await waitFor(() => handleInputSubmit);
  expect(handleInputSubmit).toHaveBeenCalled();
});
