

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const videoUrl = searchParams.get('url');

  if (!videoUrl) return new Response("Missing URL", { status: 400 });

  // 1. Fetch from the external source
  const externalRes = await fetch(videoUrl);

  // 2. Stream the body directly back to the client
  return new Response(externalRes.body, {
    headers: {
      "Content-Type": "video/mp4",
      "Content-Disposition": `attachment; filename="video.mp4"`, 
      // Optional: Pass along the file size if the external server provided it
      "Content-Length": externalRes.headers.get("Content-Length"),
    },
  });
}
