import { useEffect, useState } from "react"
import keycloak from "../keycloak";

export async function getApiInstance() {
  return (async () => {
    const module = await import('th1');

    const client = new module.ApiClient(import.meta.env.VITE_API_ENDPOINT);
    const oAuth2Auth = client.authentications["oAuth2Auth"];

    if (!keycloak?.token) {
      throw new Error("Keycloak-Token ist nicht gesetzt.");
    }

    oAuth2Auth.accessToken = keycloak.token;

    const api = new module.DefaultApi(client);

    return { api, Th1: module };
  })();

}

