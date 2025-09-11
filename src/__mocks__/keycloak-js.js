// AI generated

export default class Keycloak {
    constructor() {
        this.authenticated = false; // Start as not authenticated
        this.token = "fake-jwt-token";
        this.tokenParsed = {
            preferred_username: "demo_user",
            realm_access: { roles: ["user", "demo"] }
        };
        this.onTokenExpired = null;
        // Optionally add event handlers if your wrapper uses them
        this.onReady = null;
        this.onAuthSuccess = null;
        this.onAuthError = null;
        this.onAuthLogout = null;
        this.onAuthRefreshSuccess = null;
        this.onAuthRefreshError = null;
    }

    init() {
        // Simulate async init and authentication
        return new Promise((resolve) => {
            setTimeout(() => {
                this.authenticated = true;
                if (typeof this.onReady === "function") this.onReady();
                if (typeof this.onAuthSuccess === "function") this.onAuthSuccess();
                resolve(true);
            }, 100); // short delay to simulate async
        });
    }

    login() {
        this.authenticated = true;
        if (typeof this.onAuthSuccess === "function") this.onAuthSuccess();
        return Promise.resolve();
    }

    logout() {
        this.authenticated = false;
        if (typeof this.onAuthLogout === "function") this.onAuthLogout();
        return Promise.resolve();
    }

    updateToken() {
        if (typeof this.onTokenExpired === "function") {
            setTimeout(() => this.onTokenExpired(), 1000);
        }
        if (typeof this.onAuthRefreshSuccess === "function") this.onAuthRefreshSuccess();
        return Promise.resolve(true);
    }

    loadUserInfo() {
        return Promise.resolve({
            sub: "123456",
            preferred_username: "demo_user",
            email: "demo@example.com",
            name: "Demo User"
        });
    }
}