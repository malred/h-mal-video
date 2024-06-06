import {NextRequest, NextResponse} from "next/server";
import {readdirFilter} from "@/lib/file";

export async function GET(req: NextRequest) {
    let dir = await readdirFilter('./public/audios', 'mp3')
    return NextResponse.json({audios: dir})
}