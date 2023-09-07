import { Navigate, Outlet } from "react-router-dom";
import useUserAuth from "../../hooks/useUserAuth";
import appRouteNameConstants from "../../constants/routes";

export default function AuthenticatedPage() {
  const { isAuthenticated } = useUserAuth();
  if (!isAuthenticated) {
    return <Navigate replace to={appRouteNameConstants.LOGIN} />;
  }
  return <Outlet />;
}
