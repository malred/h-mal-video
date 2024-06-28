import {NextRequest, NextResponse} from "next/server";
import {getMangaNotWithImgs} from "@/lib/manga";

export async function GET(req: NextRequest) {
    let mangas = await getMangaNotWithImgs()

    return NextResponse.json({
        mangas
    })
}