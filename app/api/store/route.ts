import {NextRequest, NextResponse} from "next/server";
import {writeFile, readdir, rmdir, mkdir} from "fs/promises";
import {readdirChildLevel} from "@/lib/file";


const now = new Date();

const year = now.getFullYear();
const month = ('0' + (now.getMonth() + 1)).slice(-2);
const day = ('0' + now.getDate()).slice(-2);
const hours = ('0' + now.getHours()).slice(-2);
const minutes = ('0' + now.getMinutes()).slice(-2);
const seconds = ('0' + now.getSeconds()).slice(-2);

export async function GET(req: NextRequest) {
    let dir = await readdirChildLevel('public/game-store/')
    return NextResponse.json({last: dir[dir.length - 1]})
}

export async function POST(req: NextRequest) {
    let send = await req.json()

    const formattedTime = year + '-' + month + '-' + day + '-' + hours + '-' + minutes;
    console.log(formattedTime)

    try {
        await mkdir('public/game-store/' + formattedTime)
    } catch (e) {
        console.log(e)
    }
    for (let i = 0; i < send.length; i++) {
        console.log(send[i].key)
        await writeFile(
            'public/game-store/' + formattedTime + '/' + send[i].key + '.txt',
            send[i].val,
        )
    }

    return NextResponse.json({msg: "ok"})
}