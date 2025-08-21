import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
    url: import.meta.env.VITE_OAUTH_URL,
    realm: import.meta.env.VITE_OAUTH_REALM,
    clientId: import.meta.env.VITE_OAUTH_CLIENT_ID,
});

// Configure token expiration handler
keycloak.onTokenExpired = () => {
    keycloak
        .updateToken(30)
        .then((refreshed) => {
            if (!refreshed) {
                keycloak.login();
            }
        }).catch(() => {
            keycloak.login();
        });
};

export default keycloak;