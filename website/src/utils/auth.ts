import { useAuth0 } from "@auth0/auth0-react";

export function useAuth() {
  const { loginWithRedirect, logout, isAuthenticated, user, getAccessTokenSilently } = useAuth0();

  const signIn = async () => {
    await loginWithRedirect();
  };

  const signOut = async () => {
    logout({ logoutParams: { returnTo: window.location.origin } });
  };

  const getToken = async () => {
    try {
      const token = await getAccessTokenSilently();
      return token;
    } catch (error) {
      console.error("Failed to get access token", error);
      return null;
    }
  };

  return {
    isAuthenticated,
    user,
    signIn,
    signOut,
    getToken,
  };
}

