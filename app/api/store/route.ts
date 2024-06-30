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
    const game = req.nextUrl.searchParams.get('game');
    try {
        let dir = await readdirChildLevel(`public/game-store/${game ? game : ''}`)
        return NextResponse.json({last: dir[dir.length - 1]})
    } catch (e) {
        return NextResponse.json({msg: 'error'})
    }
}

export async function POST(req: NextRequest) {
    // 当前要保存的游戏
    const game = req.nextUrl.searchParams.get('game');
    let add = ''
    if (game) {
        add = game
    }

    let send = await req.json()

    const formattedTime = year + '-' + month + '-' + day + '-' + hours + '-' + minutes;

    let base = 'public/game-store/';
    try {
        await mkdir(base + add)
    } catch (e) {
        console.log(e)
    }
    try {
        await mkdir(base + add + '/' + formattedTime)
    } catch (e) {
        console.log(e)
    }
    for (let i = 0; i < send.length; i++) {
        console.log(send[i].key)
        await writeFile(
            base + add + '/' + formattedTime + '/' + send[i].key + '.txt',
            send[i].val,
        )
    }

    return NextResponse.json({msg: "ok"})
}