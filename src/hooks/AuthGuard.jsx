import { useKeycloak } from "@react-keycloak/web";
import keycloak from "../keycloak";
import { useEffect, useCallback } from "react";

export const useAuthGuard = () => {
  const { keycloak, initialized } = useKeycloak();
  const isLoggedIn = keycloak?.authenticated;


  const refreshToken = useCallback(async () => {
    if (keycloak?.authenticated) {
      try {
        await keycloak.updateToken(30); // Refresh if token expires within 30 seconds
      } catch (error) {
        keycloak.login(); // Force login if rerefresh fails
      }
    }
  }, [keycloak]);

  useEffect(() => {
    if (initialized && isLoggedIn === false) {
      keycloak?.login();
    }
  }, [initialized, isLoggedIn, keycloak]);

  // Set up automatic token refresh
  useEffect(() => {
    if (initialized && keycloak?.authenticated) {
      // Check token validity every minute
      const interval = setInterval(() => {
        refreshToken();
      }, 60000);

      return () => clearInterval(interval); // Cleanup on unmount
    }
  }, [initialized, keycloak?.authenticated, refreshToken]);

  return isLoggedIn;
};
