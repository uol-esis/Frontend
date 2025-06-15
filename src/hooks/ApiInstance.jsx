import { useEffect } from "react"


export const getApiInstance = () => {

    const [Th1, setTh1] = useState(null);

    useEffect(() => {
        import('th1').then(module => {
            setTh1(module);
        }).catch(error => {
            console.error("Error loading th1 module:", error);
        });

        if (!Th1) {
            console.error("Th1 module is not loaded yet.");
            return;
        }
        const client = new Th1.ApiClient(import.meta.env.VITE_API_ENDPOINT);
        const oAuth2Auth = client.authentications["oAuth2Auth"];
        oAuth2Auth.accessToken = keycloak.token; // Use Keycloak token for authentication
        const api = new Th1.DefaultApi(client);
        return {TH1, api};
    })
}