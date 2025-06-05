import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useRouter } from "next/navigation";
import LoginPage from "../page";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("LoginPage", () => {
  let mockPush: jest.Mock;

  beforeEach(() => {
    mockPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
  });

  test("should render login form", () => {
    render(<LoginPage />);

    expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByText("Login")).toBeInTheDocument();
  });

  test("should display error message on failed login", async () => {
    const mockResponse = { message: "Invalid credentials" };
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: false,
      json: async () => mockResponse,
    });

    render(<LoginPage />);

    fireEvent.change(screen.getByPlaceholderText("Username"), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "wrongpassword" },
    });

    fireEvent.click(screen.getByText("Login"));

    await waitFor(() => {
      expect(screen.getByText("Invalid credentials")).toBeInTheDocument();
    });
  });

  test("should redirect to /products on successful login", async () => {
    const mockResponse = {};
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    render(<LoginPage />);

    fireEvent.change(screen.getByPlaceholderText("Username"), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "correctpassword" },
    });

    fireEvent.click(screen.getByText("Login"));

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith("/products");
    });
  });

  test("should show a default error message when login fails", async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: false,
      json: async () => ({ message: "" }),
    });

    render(<LoginPage />);

    fireEvent.change(screen.getByPlaceholderText("Username"), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "wrongpassword" },
    });

    fireEvent.click(screen.getByText("Login"));

    await waitFor(() => {
      expect(screen.getByText("Something went wrong")).toBeInTheDocument();
    });
  });
});
