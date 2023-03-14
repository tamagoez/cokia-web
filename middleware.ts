// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // const response = NextResponse.next();
  const url = request.nextUrl.pathname;
  let lang = "en";
  if (request.cookies.has("lang")) {
    lang = request.cookies.get("lang")?.value;
  } else {
    // request.cookies.set('lang', 'fast')
  }
  if (
    request.nextUrl.pathname.startsWith("/p/") &&
    !request.nextUrl.pathname.startsWith(`/p/${lang}`)
  ) {
    const endIndex = url.indexOf("/", 1) + 1;
    const targetSegment = url.substring(0, endIndex);
    const urlarray = url.split("/");
    const redpageurl = `${targetSegment}${lang}/${
      urlarray[urlarray.length - 1]
    }`;
    console.log(redpageurl);
    return NextResponse.redirect(new URL(redpageurl, request.url));
  }
}
