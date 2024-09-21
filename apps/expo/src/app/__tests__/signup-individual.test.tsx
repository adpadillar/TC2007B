/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { describe, expect, test } from "@jest/globals";
import { fireEvent, render } from "@testing-library/react-native";

import SignUpIndividual from "../(unprotected)/signup/individual";

describe("/signup/individual", () => {
  test("Signup individual text renders correctly", () => {
    const { getByText } = render(<SignUpIndividual />);

    expect(getByText("Crear cuenta individual")).toBeTruthy();
  });

  test("Text fields render correctly", () => {
    const { getByPlaceholderText } = render(<SignUpIndividual />);

    expect(getByPlaceholderText("Nombre completo")).toBeTruthy();
    expect(getByPlaceholderText("Correo electrónico")).toBeTruthy();
    expect(getByPlaceholderText("Contraseña")).toBeTruthy();
    expect(getByPlaceholderText("Confirmar contraseña")).toBeTruthy();
  });

  test("Text fields change text correctly", () => {
    const { getByPlaceholderText } = render(<SignUpIndividual />);

    const fullNameInput = getByPlaceholderText("Nombre completo");
    const emailInput = getByPlaceholderText("Correo electrónico");
    const passwordInput = getByPlaceholderText("Contraseña");
    const confirmPasswordInput = getByPlaceholderText("Confirmar contraseña");

    fireEvent.changeText(fullNameInput, "John Doe");
    fireEvent.changeText(emailInput, "john@example.com");
    fireEvent.changeText(passwordInput, "password123");
    fireEvent.changeText(confirmPasswordInput, "password123");

    expect(fullNameInput.props.value).toBe("John Doe");
    expect(emailInput.props.value).toBe("john@example.com");
    expect(passwordInput.props.value).toBe("password123");
    expect(confirmPasswordInput.props.value).toBe("password123");
  });

  test("Links render correctly", () => {
    const { getByText } = render(<SignUpIndividual />);

    expect(getByText("Inicia sesión")).toBeTruthy();
    expect(getByText("¿Eres una empresa?")).toBeTruthy();
  });
});
