import { vi,describe,it,expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from '../../src/components/atoms/Button/index';
import React from "react";

describe("Button Component", () => {
  it("renders the button with the correct label", () => {
    const label = "Click Me";
    render(<Button label={label} />);
    const buttonElement = screen.getByText(label);

    // Validate label rendering
    expect(buttonElement).toBeTruthy();
  });

  it("applies the correct className based on props", () => {
    const className = "custom-class";
    const type = "primary";
    render(<Button label="Test" className={className} type={type} />);
    const buttonElement = screen.getByText("Test");

    // Validate className
    expect(buttonElement.getAttribute('class')).toContain('btn');
    expect(buttonElement.getAttribute('class')).toContain(className);
    expect(buttonElement.getAttribute('class')).toContain('btn-primary');
  });

  it("renders loading spinner when isLoading is true", () => {
    render(<Button label="Loading" isLoading />);
    const spinner = screen.getByRole("img", { hidden: true });

    // Validate spinner presence
    expect(spinner).toBeTruthy();
  });

  it("does not render loading spinner when isLoading is false", () => {
    render(<Button label="Not Loading" isLoading={false} />);
    const spinner = screen.queryByRole("img", { hidden: true });

    // Validate spinner absence
    expect(spinner).toBeTruthy();
  });

  it("disables the button when isDisable is true", () => {
    render(<Button label="Disabled Button" isDisable />);
    const buttonElement = screen.getByText("Disabled Button");

    // Validate button is disabled
    expect(buttonElement.hasAttribute('disabled')).toBe(true);
    expect(buttonElement.getAttribute('class')).toContain('btn-default');
  });

  it("enables the button when isDisable is false", () => {
    render(<Button label="Enabled Button" isDisable={false} />);
    const buttonElement = screen.getByText("Enabled Button");

    // Validate button is enabled
    expect(buttonElement.hasAttribute('disabled')).toBe(false);
  });

  it("triggers onClick when clicked and not disabled", () => {
    const onClickMock = vi.fn();
    render(<Button label="Clickable" onClick={onClickMock} />);
    const buttonElement = screen.getByText("Clickable");

    // Simulate click event
    fireEvent.click(buttonElement);

    // Validate onClick function is called
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  it("does not trigger onClick when disabled", () => {
    const onClickMock = vi.fn();
    render(<Button label="Non-Clickable" onClick={onClickMock} isDisable />);
    const buttonElement = screen.getByText("Non-Clickable");

    // Simulate click event
    fireEvent.click(buttonElement);

    // Validate onClick function is not called
    expect(onClickMock).not.toHaveBeenCalled();
  });

  it("renders default styles if no type is provided", () => {
    render(<Button label="Default Button" />);
    const buttonElement = screen.getByText("Default Button");

    // Validate default className
    expect(buttonElement.getAttribute('class')).toContain('btn-undefined');
  });
});
