import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
    url: import.meta.env.VITE_OAUTH_URL,
    realm: import.meta.env.VITE_OAUTH_REALM,
    clientId: import.meta.env.VITE_OAUTH_CLIENT_ID,
});

export default keycloak;