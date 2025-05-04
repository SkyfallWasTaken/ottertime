import type { ActionFunction, ActionFunctionArgs } from "react-router";

export const action: ActionFunction = ({ request }: ActionFunctionArgs) => {
  return new Response("api");
};
