import { it,expect,describe } from "vitest";
import { render, screen } from "@testing-library/react";
import { Typography } from '../../src/components/atoms/Typography/index';
import React from "react";

describe('Typography', () => {
    it("should render the correct variant element with the provided label", () => {
        const label = "Hello World";
        const variant = "h1";
    
        render(<Typography label={label} variant={variant} />);
    
        const element = screen.getByText(label);
    
        expect(element.tagName).toBe("H1");
        expect(element.textContent).toBe("Hello World");
      });

      it("should apply the custom className if provided", () => {
        const label = "Custom Class Test";
        const variant = "p";
        const customClass = "custom-class";
    
        render(<Typography label={label} variant={variant} className={customClass} />);
    
        const element = screen.getByText(label);
    
        expect(element.getAttribute('class')).toContain('typography');
        expect(element.getAttribute('class')).toContain(customClass);
      });

      it("should render the correct variant element even with a different variant", () => {
        const label = "Testing H3 Variant";
        const variant = "h3";
    
        render(<Typography label={label} variant={variant} />);
    
        const element = screen.getByText(label);
    
        expect(element.tagName).toBe("H3");
      });

      it("should throw an error if an unsupported variant is provided", () => {
        const label = "Invalid Variant Test";
        const variant = "unsupported";
    
        expect(() => {
          render(<Typography label={label} variant={variant as any} />);
        }).toThrow();
      });
})

