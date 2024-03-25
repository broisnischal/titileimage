// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { decodeBase64 } from "https://deno.land/std@0.220.1/encoding/base64.ts";
import { Base64 } from "https://deno.land/x/bb64/mod.ts";
import handler from "./handler.tsx";

console.log("Hello from Functions!");

Deno.serve(async (req) => {
  console.log("Method:", req.method);

  const uri = new URL(req.url);
  console.log("Path:", uri.pathname);

  const url = uri.searchParams.get("url");

  const title = uri.searchParams.get("title");
  // console.log("Query parameters:", url.searchParams);

  if (!url) {
    return new Response(
      JSON.stringify({ error: "url is required" }),
      { headers: { "Content-Type": "application/json" } },
    );
  }

  try {
    const imageurl = new URL(url);

    if (imageurl.protocol !== "http:" && imageurl.protocol !== "https:") {
      throw new Error("Invalid URL");
    }

    const blob = await fetch(url).then((res) => res.blob());

    const base648arrya = await blobToBase64(blob);

    const pngImage = Base64.fromUint8Array(base648arrya);

    return handler(req, blob, title!);
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: "Invalid URL" }),
      { headers: { "Content-Type": "application/json" } },
    );
  }
});

async function blobToBase64(blob: Blob) {
  return new Uint8Array(await blob.arrayBuffer());
}

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/titleimage' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
