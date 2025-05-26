import { ROUTES } from "@/shared/model/routes";
import { rqClient } from "@/shared/api/instance";
import { useQueryClient } from "@tanstack/react-query";
import { href, useNavigate } from "react-router-dom";

export function useCreateBoard() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const createBoardMutation = rqClient.useMutation("post", "/boards", {
        onSettled: async () => {
            await queryClient.invalidateQueries(
                rqClient.queryOptions("get", "/boards")
            );
        },
        onSuccess: (data) => {
            console.log("Созданная доска:", data)
            navigate(href(ROUTES.BOARD,{ boardId: data.id }));
        },
    });

    return {
        createBoard: () => createBoardMutation.mutate({}),
        isPending: createBoardMutation.isPending,
    }
}