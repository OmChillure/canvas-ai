/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
// middleware.ts
import {
  clerkMiddleware,
  createRouteMatcher
} from "@clerk/nextjs/server"

const isProtectedRoute = createRouteMatcher(["/dashboard"])

export default clerkMiddleware((auth, request) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (isProtectedRoute(request)) auth().protect()
})

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"]
}