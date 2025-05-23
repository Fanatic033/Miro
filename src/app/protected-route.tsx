import { useSession } from "@/shared/model/session.ts";
import { ROUTES } from "@/shared/model/routes.tsx";
import { Navigate, Outlet } from "react-router-dom";

export function ProtectedRoute() {
  const { session } = useSession();
  if (!session) {
    return <Navigate to={ROUTES.LOGIN} />;
  }
  return <Outlet />;
}
