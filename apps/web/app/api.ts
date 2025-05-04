import hono from "~/server";

export async function loader({ request }: { request: Request }) {
  return hono.fetch(request);
}

// Handles POST, PUT, PATCH, DELETE, etc.
export async function action({ request }: { request: Request }) {
  return hono.fetch(request);
}
