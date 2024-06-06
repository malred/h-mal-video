import {NextRequest, NextResponse} from "next/server";
import {readdirFilter} from "@/lib/file";

// 获取videos下某个文件夹下的文件夹和文件
export async function GET(req: NextRequest) {
    let path = req.nextUrl.pathname.replace('/api/video', '')
    path = decodeURI(path)
    console.log('public/videos' + path)
    let dir = await readdirFilter('public/videos' + path, 'mp4')
    console.log(dir)
    return NextResponse.json({videos: dir})
}