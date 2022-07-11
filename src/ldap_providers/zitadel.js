import { AuthProvider } from "oidc-react";
const oidcConfig = {
    onSignIn: async (response) => {
      alert(
        "You logged in :" +
          response.profile.given_name +
          " " +
          response.profile.family_name
      );
      window.location.hash = "";
    },
    authority: "https:/[your-domain]-[random-string].zitadel.cloud", // replace with your instance
    clientId: "YOUR-CLIENT-ID",
    responseType: "code",
    redirectUri: "http://localhost:3000/",
    scope: "openid profile email",
    dev: process.env.REACT_APP_DEV_MODE
  };
const Zitadel = () => {
    return(
        <>
        <AuthProvider {...oidcConfig} />
        </>
    )
}
export default Zitadel