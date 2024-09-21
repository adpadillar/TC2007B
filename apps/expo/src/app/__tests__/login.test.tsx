/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { describe, expect, test } from "@jest/globals";
import { fireEvent, render } from "@testing-library/react-native";

import Login from "../(unprotected)/login";

describe("/login", () => {
  test("Login text renders correctly", () => {
    const { getAllByText } = render(<Login />);

    expect(getAllByText("Iniciar sesión")).toHaveLength(2);
  });

  test("Text fields render correctly", () => {
    const { getAllByPlaceholderText } = render(<Login />);

    expect(getAllByPlaceholderText("Correo electrónico")).toHaveLength(1);
    expect(getAllByPlaceholderText("Contraseña")).toHaveLength(1);
  });

  test("Text fields change text correctly", () => {
    const { getByPlaceholderText } = render(<Login />);

    const emailInput = getByPlaceholderText("Correo electrónico");
    const passwordInput = getByPlaceholderText("Contraseña");

    fireEvent.changeText(emailInput, "test@example.com");
    fireEvent.changeText(passwordInput, "password123");

    expect(emailInput.props.value).toBe("test@example.com");
    expect(passwordInput.props.value).toBe("password123");
  });
});
