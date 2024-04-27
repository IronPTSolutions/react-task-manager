import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import LoginPage from "./login";
import * as authContext from "../../contexts/auth-context";
import * as apiService from "../../services/api-service";
import { BrowserRouter } from "react-router-dom";

describe("<Login/>", () => {
  beforeEach(() => {
    cleanup();
  });

  test("happy case: render OK", () => {
    // Given
    vi.spyOn(authContext, "useAuthContext").mockReturnValue({
      onLogin: vi.fn(),
    });

    // When
    render(<LoginPage />, { wrapper: BrowserRouter });

    // Then
    expect(screen.getAllByText("Login")).toBeTruthy();
    expect(screen.getByLabelText("Email address")).toBeTruthy();

    expect(document.body).toMatchSnapshot();
  });

  test("happy case", async () => {
    // Given
    const onLogin = vi.fn();

    vi.spyOn(authContext, "useAuthContext").mockReturnValue({
      onLogin,
    });

    const loginServiceMock = vi.spyOn(apiService, "login").mockResolvedValue({
      response: {},
    });

    // When
    render(<LoginPage />, { wrapper: BrowserRouter });

    const email = screen.getByLabelText("Email address");
    const password = screen.getByLabelText("Password");

    fireEvent.change(email, { target: { value: "john@example.com" } });
    fireEvent.change(password, { target: { value: "123" } });

    const form = screen.getByTestId("login-form");

    fireEvent.submit(form);

    // Then
    await waitFor(() => {
      expect(loginServiceMock).toHaveBeenCalledWith({
        email: "john@example.com",
        password: "123",
      });

      expect(onLogin).toBeCalledWith({ response: {} });
    });
  });
});
