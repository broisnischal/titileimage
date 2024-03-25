import React from "https://esm.sh/react@18.2.0";
import { ImageResponse } from "https://deno.land/x/og_edge@0.0.6/mod.ts";

export default function handler(req: Request, blob: Blob, title: string) {
  const imageUrl = URL.createObjectURL(blob);

  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "lavender",
        }}
      >
        <img
          src={imageUrl}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
          }}
          alt="Cool from image"
        />
        <div
          style={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            fontSize: "55px",
            background:
              "linear-gradient(to top, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0))",
            color: "white",
            textAlign: "center",
            padding: "20px",
            boxSizing: "border-box",
          }}
        >
          {title}
        </div>
      </div>
    ),
  );
}
