import {NextRequest, NextResponse} from "next/server";
import {readdirFilter} from "@/lib/file";

// 遍历获取videos下所有文件和文件夹 string
export async function GET(req: NextRequest) {
    let dir = await readdirFilter('./public/videos', 'mp4')
    let dir1 = await readdirFilter('./public/videos', 'mkv')
    return NextResponse.json({videos: [...dir, ...dir1]})
}