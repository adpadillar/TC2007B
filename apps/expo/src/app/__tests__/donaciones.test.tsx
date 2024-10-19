/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { describe, expect, it, jest } from "@jest/globals";
import { render } from "@testing-library/react-native";

import Donaciones from "../(protected)/donaciones";

// Mock expo-router
jest.mock("expo-router", () => ({
  usePathname: () => "/donaciones",
  Link: ({ children }) => children,
}));

// Mock react-native-safe-area-context
jest.mock("react-native-safe-area-context", () => ({
  useSafeAreaInsets: () => ({ bottom: 0 }),
}));

describe("Donaciones", () => {
  it("renders correctly", () => {
    const { getByText } = render(<Donaciones />);
    expect(getByText("¿Cómo donar?")).toBeTruthy();
  });

  // Add more tests here
});
