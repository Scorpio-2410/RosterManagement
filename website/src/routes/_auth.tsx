import { useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useAuth0 } from "@auth0/auth0-react";

const AuthHandler = () => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  useEffect(() => {
    if (!isAuthenticated) {
      loginWithRedirect();
    }
  }, [isAuthenticated, loginWithRedirect]);

  return null;
};

export const Route = createFileRoute("/_auth")({
  beforeLoad: () => {
    return <AuthHandler />;
  },
});
