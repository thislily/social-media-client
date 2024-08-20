import { login } from "./login";
import { logout } from "./logout";

// Mock local storage
global.localStorage = {
  store: {},
  getItem(key) {
    return this.store[key] || null;
  },
  setItem(key, value) {
    this.store[key] = value.toString();
  },
  removeItem(key) {
    delete this.store[key];
  },
  clear() {
    this.store = {};
  },
};

// Mock fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ accessToken: "mockToken" }),
  }),
);

// Tests
describe("Auth Functions", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("stores a token when provided with valid credentials on login", async () => {
    await login("validEmail@noroff.no", "validPassword");

    const storedToken = localStorage.getItem("token");
    // Parse the stored token if it's a JSON string
    const parsedToken = JSON.parse(storedToken);

    expect(parsedToken).toBe("mockToken");
  });

  it("clears the token from local storage when logging out", () => {
    logout();

    expect(localStorage.getItem("token")).toBeNull();
  });
});

// Reset mocks
afterEach(() => {
  jest.resetAllMocks();
});
