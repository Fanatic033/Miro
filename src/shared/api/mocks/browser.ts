import { setupWorker } from "msw/browser";
import { boardsHandlers } from "./handlers/boards.ts";
import { authHandlers } from "./handlers/auth.ts";

export const worker = setupWorker(...authHandlers, ...boardsHandlers);
