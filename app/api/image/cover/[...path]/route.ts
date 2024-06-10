import {NextRequest, NextResponse} from "next/server";
import {readdirChildLevel} from "@/lib/file";

// 获取子目录下第一个文件
export async function GET(req: NextRequest) {
    let path = req.nextUrl.pathname.replace('/api/image/cover', '')
    path = decodeURI(path).replace('/', '')
    console.log(path)
    let dir = await readdirChildLevel(path)

    return NextResponse.json({f: path.replace('public/', '') + '/' + dir[0]})
}