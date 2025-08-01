import { useKeycloak } from "@react-keycloak/web";
import { useEffect } from "react";

export const useAuthGuard = () => {
  const { keycloak, initialized } = useKeycloak();
  const isLoggedIn = keycloak?.authenticated;

  useEffect(() => {
    if (initialized && isLoggedIn === false) {
      keycloak?.login();
    }
  }, [initialized, isLoggedIn, keycloak]);

  return isLoggedIn;
};
