import { useState } from "react";

export type BoardsSortOption = "createdAt" | "updatedAt" | "lastOpened" | "name";


export type BoardsFilters = {
    search?: string;
    sort?: BoardsSortOption;
    showFavorites?: boolean | null;
};



export function useBoardsFilters() {
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState<BoardsSortOption>("lastOpened");


    return { search, sort, setSearch, setSort };
}
