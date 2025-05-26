import { useDebouncedValue } from "@/shared/lib/react";
import { ROUTES } from "@/shared/model/routes";
import { Button } from "@/shared/ui/kit/button";
import { Card, CardFooter, CardHeader } from "@/shared/ui/kit/card";
import { Switch } from "@/shared/ui/kit/switch";
import { useState } from "react";
import { Link, href } from "react-router-dom";
import {
  BoardListLayout,
  BoardListLayoutFilters,
  BoardListLayoutHeader,
} from "./ui/board-list-layout";
import { BoardsSearchInput } from "./ui/boards-search-input";
import { BoardsSortSelect } from "./ui/boards-sort-select";
import { useBoardsFilters } from "./model/use-boards-filters";
import { useBoardsList } from "./model/use-boards-list";
import { useCreateBoard } from "./model/use-create-board";
import { useDeleteBoard } from "./model/use-delete-board";
import { useUpdateFavorite } from "./model/use-update-favorite";
import { ViewModeToggle, type ViewMode } from "./ui/view-mode-toggle";
import { PlusIcon } from "lucide-react";

type BoardsSortOption = "createdAt" | "updatedAt" | "lastOpened" | "name";

function BoardsListPage() {
  const boardsFilters = useBoardsFilters();
  const boardsQuery = useBoardsList({
    search: useDebouncedValue(boardsFilters.search, 300),
    sort: boardsFilters.sort,
  });

  const createBoard = useCreateBoard();
  const deleteBoard = useDeleteBoard();
  const updateFavorite = useUpdateFavorite();

  const [viewMode, setViewMode] = useState<ViewMode>("list");

  return (
    <BoardListLayout
      header={
        <BoardListLayoutHeader
          title="Доски"
          description="Здесь вы можете управлять своими досками"
          actions={
            <Button
              onClick={createBoard.createBoard}
              disabled={createBoard.isPending}
            >
              <PlusIcon />
              Создать доску
            </Button>
          }
        />
      }
      filters={
        <BoardListLayoutFilters
          sort={
            <BoardsSortSelect
              value={boardsFilters.sort}
              onValueChange={(value) =>
                boardsFilters.setSort(value as BoardsSortOption)
              }
            />
          }
          filters={
            <BoardsSearchInput
              value={boardsFilters.search}
              onChange={(value) => boardsFilters.setSearch(value)}
            />
          }
          actions={
            <ViewModeToggle
              value={viewMode}
              onChange={(value) => setViewMode(value)}
            />
          }
        />
      }
    >
      {boardsQuery.isPending ? (
        <div className="text-center py-10">Загрузка...</div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {boardsQuery.boards.map((board) => (
              <Card key={board.id} className="relative">
                <div className="absolute top-2 right-2 flex items-center gap-2">
                  <span className="text-sm text-gray-500">
                    {board.isFavorite ? "В избранном" : ""}
                  </span>
                  <Switch
                    checked={updateFavorite.isOptimisticFavorite(board)}
                    onCheckedChange={() => updateFavorite.toggle(board)}
                  />
                </div>
                <CardHeader>
                  <div className="flex flex-col gap-2">
                    <Button
                      asChild
                      variant="link"
                      className="text-left justify-start h-auto p-0"
                    >
                      <Link to={href(ROUTES.BOARD, { boardId: board.id })}>
                        <span className="text-xl font-medium">
                          {board.name}
                        </span>
                      </Link>
                    </Button>
                    <div className="text-sm text-gray-500">
                      Создано: {new Date(board.createdAt).toLocaleDateString()}
                    </div>
                    <div className="text-sm text-gray-500">
                      Последнее открытие:{" "}
                      {new Date(board.lastOpened).toLocaleDateString()}
                    </div>
                  </div>
                </CardHeader>
                <CardFooter>
                  <Button
                    variant="destructive"
                    disabled={deleteBoard.getIsPending(board.id)}
                    onClick={() => deleteBoard.deleteBoard(board.id)}
                  >
                    Удалить
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {boardsQuery.boards.length === 0 && !boardsQuery.isPending && (
            <div className="text-center py-10">Доски не найдены</div>
          )}

          {boardsQuery.hasNextPage && (
            <div ref={boardsQuery.cursorRef} className="text-center py-8">
              {boardsQuery.isFetchingNextPage &&
                "Загрузка дополнительных досок..."}
            </div>
          )}
        </>
      )}
    </BoardListLayout>
  );
}

export const Component = BoardsListPage;
