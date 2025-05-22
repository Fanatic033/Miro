import { rqClient } from "@/shared/api/instance.ts";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/shared/model/routes.tsx";
import type { ApiSchemas } from "@/shared/api/schema";
import { useSession } from "@/shared/model/session";

export function useRegister() {
  const navigate = useNavigate();

  const session = useSession();
  const registerMutation = rqClient.useMutation("post", "/auth/register", {
    onSuccess(data) {
      session.login(data.accessToken);
      navigate(ROUTES.HOME);
    },
  });
  const register = (data: ApiSchemas["RegisterRequest"]) => {
    registerMutation.mutate({ body: data });
  };
  const errorMessage = registerMutation.isError
    ? registerMutation.error.message
    : undefined;

  return {
    register,
    isPending: registerMutation.isPending,
    errorMessage,
  };
}
