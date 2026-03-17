export const PORTAL_ACCESS_TOKEN_KEY = "portal_access_token";
export const PORTAL_REFRESH_TOKEN_KEY = "portal_refresh_token";
export const PORTAL_USER_KEY = "portal_user";
export const PORTAL_ROLE_KEY = "portal_role";

export const savePortalSession = ({ access, refresh, user, role }) => {
  if (access) {
    localStorage.setItem(PORTAL_ACCESS_TOKEN_KEY, access);
  }

  if (refresh) {
    localStorage.setItem(PORTAL_REFRESH_TOKEN_KEY, refresh);
  }

  if (user) {
    localStorage.setItem(PORTAL_USER_KEY, JSON.stringify(user));
  }

  if (role) {
    localStorage.setItem(PORTAL_ROLE_KEY, role);
  }
};

export const clearPortalSession = () => {
  localStorage.removeItem(PORTAL_ACCESS_TOKEN_KEY);
  localStorage.removeItem(PORTAL_REFRESH_TOKEN_KEY);
  localStorage.removeItem(PORTAL_USER_KEY);
  localStorage.removeItem(PORTAL_ROLE_KEY);
};

export const getPortalAccessToken = () => {
  return localStorage.getItem(PORTAL_ACCESS_TOKEN_KEY);
};

export const getPortalRefreshToken = () => {
  return localStorage.getItem(PORTAL_REFRESH_TOKEN_KEY);
};

export const getPortalUser = () => {
  const raw = localStorage.getItem(PORTAL_USER_KEY);

  if (!raw) return null;

  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

export const getPortalRole = () => {
  return localStorage.getItem(PORTAL_ROLE_KEY);
};

export const isPortalAuthenticated = () => {
  return !!getPortalAccessToken();
};