import {NextRequest, NextResponse} from "next/server";
import {readdirChildLevel} from "@/lib/file";
import {readFile} from "fs/promises";

export async function GET(req: NextRequest) {
    let date = req.nextUrl.pathname.replace('/api/store/', '')

    let base = 'public/game-store/'
    let dir = await readdirChildLevel(base + date)

    let res = []
    for (let i = 0; i < dir.length; i++) {
        let f = await readFile(base + date + '/' + dir[i], {encoding: 'utf-8'})
        res.push({key: dir[i], val: f})
    }
    return NextResponse.json({res})
}