import {NextRequest, NextResponse} from "next/server";
import {readdirChildLevel} from "@/lib/file";
import {readFile} from "fs/promises";

// 获取game-store下某个存档下的存档文件
export async function GET(req: NextRequest) {
    let path = req.nextUrl.pathname.replace('/api/store/', '')
    path = decodeURI(path)
    console.log(path)

    let base = 'public/game-store/'
    let dir
    try {
        dir = await readdirChildLevel(base + path)
    } catch (e) {
        console.log(e)
    }

    let res = []
    if (dir) {
        for (let i = 0; i < dir.length; i++) {
            let f = await readFile(base + path + '/' + dir[i], {encoding: 'utf-8'})
            res.push({key: dir[i], val: f})
        }
    }

    return NextResponse.json({res})
}