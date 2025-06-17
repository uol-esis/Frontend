import { useEffect, useState } from "react"
import keycloak from "../keycloak";

let apiInstance = null;

export async function getApiInstance() {
  if (apiInstance) return apiInstance;

  const module = await import('th1');
  const client = new module.ApiClient(import.meta.env.VITE_API_ENDPOINT);
  const oAuth2Auth = client.authentications["oAuth2Auth"];
  oAuth2Auth.accessToken = keycloak.token;

  apiInstance = new module.DefaultApi(client);
  return [apiInstance, module];
}
