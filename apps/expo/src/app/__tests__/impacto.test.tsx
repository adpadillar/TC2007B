import { describe, expect, it, jest } from "@jest/globals";
import { render } from "@testing-library/react-native";

import Impacto from "../(protected)/impacto";

// Mock expo-router
jest.mock("expo-router", () => ({
  usePathname: () => "/impacto",
  Link: ({ children }) => children,
}));

// Mock react-native-safe-area-context
jest.mock("react-native-safe-area-context", () => ({
  useSafeAreaInsets: () => ({ bottom: 0 }),
}));

// Mock the api
jest.mock("~/utils/api", () => ({
  api: {
    projects: {
      list: {
        useQuery: () => ({ data: [], isLoading: false }),
      },
    },
  },
}));

describe("Impacto", () => {
  it("renders correctly", () => {
    const { getByText } = render(<Impacto />);
    expect(getByText("Tu impacto")).toBeTruthy();
  });
});
