export const kcConfig = {
  clientId: process.env.CLIENT_ID || "local-api-beet",
  bearerOnly: true,
  serverUrl: process.env.SERVER_URL || "https://keycloak.trn.beethub.com.mx/auth/",
  realm: process.env.REALM || "beet-staging"
};

export const services = {
  fileUrl: process.env.FILE_URL || "http://localhost:5000"
}