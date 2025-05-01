import { useKeycloak } from "@react-keycloak/web";
import { useEffect, useState } from "react";

const Apis = () => {
    const { keycloak } = useKeycloak();

    useEffect(() => {
        const getData = async () => {
            try {
                if (keycloak && keycloak.authenticated) {
                    await keycloak?.updateToken();
                    console.log('authenticated');
                }
                else {
                    console.log('not authenticated');
                }
            } catch (e) {
                console.log("ERROR", e);
            }
        };
        getData();
    }, [keycloak]);
    return (
        <>
            <button
                type="button"
                className="text-blue-800"
                onClick={() => keycloak.logout()}
            >
                Logout ({keycloak?.tokenParsed?.preferred_username})
            </button>
        </>
    );
};
export default Apis;