import {Innertube} from "youtubei.js"
import YtChapters from "get-youtube-chapters"

export async function GET(req: Request) {
    const {searchParams} = new URL(req.url)
    const vidId = searchParams.get("id")
    const tube = await Innertube.create()
    const info = await tube.getBasicInfo(vidId);
    const chapters = YtChapters(info?.basic_info?.short_description)

    return Response.json(chapters)
}