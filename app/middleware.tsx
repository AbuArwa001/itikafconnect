import { match } from "assert";

export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/events/new", "/events/edit/:id+"],
};
