import apiClient from "./client";
import { savePortalSession, clearPortalSession } from "../utils/portalAuth";

export const loginPortalUser = async ({ username, password }) => {
  const { data } = await apiClient.post("/api/users/login/", {
    username,
    password,
  });

  const access = data?.access;
  const refresh = data?.refresh;

  if (!access || !refresh) {
    throw new Error("Login succeeded but tokens were not returned.");
  }

  let role = "client";

  if (data?.isAdmin) {
    role = "admin";
  } else if (data?.isDriver) {
    role = "driver";
  }

  savePortalSession({
    access,
    refresh,
    user: data,
    role,
  });

  return {
    user: data,
    role,
  };
};

export const logoutPortalUser = () => {
  clearPortalSession();
};