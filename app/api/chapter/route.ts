import YtChapterGetter from "youtube-chapters-finder";

export async function GET(req: Request) {
    const {searchParams} = new URL(req.url)
    const vidId = searchParams.get("id")
    const chapters = await YtChapterGetter.getChapter(vidId);
    return Response.json(chapters);
}