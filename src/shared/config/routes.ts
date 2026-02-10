export const routes = {
  auth: {
    login: "/auth/login",
    verify: "/auth/verify",
  },
  protected: {
    dashboard: "/dashboard",
  },
  public: {
    home: "/",
  },
} as const;
