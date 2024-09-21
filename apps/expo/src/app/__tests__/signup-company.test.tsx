/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { describe, expect, test } from "@jest/globals";
import { fireEvent, render } from "@testing-library/react-native";

import SignUpCompany from "../(unprotected)/signup/company";

describe("/signup/company", () => {
  test("Signup company text renders correctly", () => {
    const { getByText } = render(<SignUpCompany />);

    expect(getByText("Crear cuenta de empresa")).toBeTruthy();
  });

  test("Text fields render correctly", () => {
    const { getByPlaceholderText } = render(<SignUpCompany />);

    expect(getByPlaceholderText("Razón social")).toBeTruthy();
    expect(getByPlaceholderText("Correo electrónico")).toBeTruthy();
    expect(getByPlaceholderText("Contraseña")).toBeTruthy();
    expect(getByPlaceholderText("Confirmar contraseña")).toBeTruthy();
  });

  test("Text fields change text correctly", () => {
    const { getByPlaceholderText } = render(<SignUpCompany />);

    const razonSocialInput = getByPlaceholderText("Razón social");
    const emailInput = getByPlaceholderText("Correo electrónico");
    const passwordInput = getByPlaceholderText("Contraseña");
    const confirmPasswordInput = getByPlaceholderText("Confirmar contraseña");

    fireEvent.changeText(razonSocialInput, "Test Company");
    fireEvent.changeText(emailInput, "test@company.com");
    fireEvent.changeText(passwordInput, "password123");
    fireEvent.changeText(confirmPasswordInput, "password123");

    expect(razonSocialInput.props.value).toBe("Test Company");
    expect(emailInput.props.value).toBe("test@company.com");
    expect(passwordInput.props.value).toBe("password123");
    expect(confirmPasswordInput.props.value).toBe("password123");
  });

  test("Links render correctly", () => {
    const { getByText } = render(<SignUpCompany />);

    expect(getByText("Inicia sesión")).toBeTruthy();
    expect(getByText("¿Eres un individuo?")).toBeTruthy();
  });
});
