import { useSession } from "@/shared/model/session.ts";
import { ROUTES } from "@/shared/model/routes.tsx";
import { Navigate, Outlet } from "react-router-dom";
import {enableMocking} from "@/shared/api/mocks";

export function ProtectedRoute() {
  const { session } = useSession();
  if (!session) {
    return <Navigate to={ROUTES.LOGIN} />;
  }
  return <Outlet />;
}

export async function protectedLoader() {
  await enableMocking();
  const token = useSession.getState().refreshToken();
  if (!token) {
    return { redirectTo: ROUTES.LOGIN };
  }
  return null;
}
