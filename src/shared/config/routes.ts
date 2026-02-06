export const routes = {
  auth: {
    login: "/auth/login",
    verify: "/auth/verify",
  },
  protected: {
    dashboard: "/dashboard",
  },
} as const;
