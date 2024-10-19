import { describe, expect, it, jest } from "@jest/globals";
import { render } from "@testing-library/react-native";

import Login from "../(unprotected)/login";

// Mock the necessary dependencies
jest.mock("expo-router", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
  Link: ({ children }) => children, // Mock the Link component
}));

jest.mock("@clerk/clerk-expo", () => ({
  useOAuth: () => ({
    startOAuthFlow: jest.fn(),
  }),
}));

describe("Login", () => {
  it("renders without crashing", () => {
    render(<Login />);
    expect(true).toBe(true);
  });
});
