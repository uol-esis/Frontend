import KeycloakReal from "keycloak-js";
import KeycloakMock from "./__mocks__/keycloak-js";

const KeycloakLib =
    import.meta.env.VITE_OAUTH_ENABLE === "false" ? KeycloakMock : KeycloakReal;

const keycloak = new KeycloakLib({
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