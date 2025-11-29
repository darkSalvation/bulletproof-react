export const AUTH_TOKEN_COOKIE_NAME = 'bulletproof_react_app_token';

export const getAuthTokenCookie = () => {
  if (typeof window !== 'undefined') return '';
  // In Nuxt, we would use useCookie or get from request headers
  return '';
};

export const checkLoggedIn = () => {
  if (typeof window === 'undefined') return false;
  const cookies = document.cookie.split(';');
  const isLoggedIn = cookies.some((cookie) =>
    cookie.trim().startsWith(`${AUTH_TOKEN_COOKIE_NAME}=`),
  );
  return isLoggedIn;
};
