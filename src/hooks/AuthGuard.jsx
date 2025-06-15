import { useKeycloak } from "@react-keycloak/web";
import { useEffect } from "react";

export const useAuthGuard = () => {
  const { keycloak, initialized } = useKeycloak();
  const isLoggedIn = keycloak?.authenticated;

  useEffect(() => {
    //console.log("Keycloak initialized:", initialized);
    console.log("Keycloak authenticated:", keycloak?.authenticated);
    console.log("isLoggedIn "+ isLoggedIn);
    if (isLoggedIn === false) {
        console.log("not logged in");
      keycloak?.login();
    }
  }, [initialized, isLoggedIn, keycloak]);

  
};
  
