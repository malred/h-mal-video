import {NextRequest, NextResponse} from "next/server";
import {readdirFilter} from "@/lib/file";

// 获取videos下某个文件夹下的文件夹和文件
export async function GET(req: NextRequest) {
    let path = req.nextUrl.pathname.replace('/api/image', '')
    path = decodeURI(path)
    console.log('public/photos' + path)
    let dir = await readdirFilter('public/photos' + path, 'jpg')
    let dir1 = await readdirFilter('public/photos' + path, 'png')
    let dir2 = await readdirFilter('public/photos' + path, 'webp')
    return NextResponse.json({images: [...dir, ...dir1, ...dir2]})
}