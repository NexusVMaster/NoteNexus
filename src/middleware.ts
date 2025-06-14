// middleware.ts
import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

const publicRoutes = ["/", "/sign-in", "/sign-up"];

export default clerkMiddleware(async (auth, req: NextRequest) => {
  const { userId } = await auth(); // ✅ Must await here!

  if (publicRoutes.some((route) => req.nextUrl.pathname.startsWith(route))) {
    return;
  }

  if (!userId) {
    return Response.redirect(new URL("/sign-in", req.url));
  }
});

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};
