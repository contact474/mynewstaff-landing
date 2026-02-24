import { NextRequest, NextResponse } from "next/server";

const VPS_ORIGIN = "http://82.25.92.135";

// Headers to strip from the proxy request
const STRIP_REQ_HEADERS = new Set([
  "host",
  "connection",
  "transfer-encoding",
]);

async function proxyToVPS(req: NextRequest) {
  const url = new URL(req.url);
  // /vps-api/api/carousels → /api/carousels
  const path = url.pathname.replace(/^\/vps-api/, "");
  const target = `${VPS_ORIGIN}${path}${url.search}`;

  // Forward headers (except host/connection)
  const headers: Record<string, string> = {};
  req.headers.forEach((value, key) => {
    if (!STRIP_REQ_HEADERS.has(key.toLowerCase())) {
      headers[key] = value;
    }
  });

  // Stream body for non-GET requests
  const body =
    req.method !== "GET" && req.method !== "HEAD"
      ? await req.arrayBuffer()
      : undefined;

  const upstream = await fetch(target, {
    method: req.method,
    headers,
    body,
  });

  // Build response, forwarding status + headers
  const respHeaders = new Headers();
  upstream.headers.forEach((value, key) => {
    // Skip hop-by-hop headers
    if (key.toLowerCase() !== "transfer-encoding") {
      respHeaders.set(key, value);
    }
  });

  // Allow CORS from our own domain
  respHeaders.set("Access-Control-Allow-Origin", "*");

  return new NextResponse(upstream.body, {
    status: upstream.status,
    statusText: upstream.statusText,
    headers: respHeaders,
  });
}

export async function GET(req: NextRequest) {
  return proxyToVPS(req);
}
export async function POST(req: NextRequest) {
  return proxyToVPS(req);
}
export async function PATCH(req: NextRequest) {
  return proxyToVPS(req);
}
export async function PUT(req: NextRequest) {
  return proxyToVPS(req);
}
export async function DELETE(req: NextRequest) {
  return proxyToVPS(req);
}
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Max-Age": "86400",
    },
  });
}
