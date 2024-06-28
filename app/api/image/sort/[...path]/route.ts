import {NextRequest, NextResponse} from "next/server";
import {readdirChildLevel} from "@/lib/file";
import {rename} from 'fs/promises'

// 重命名
export async function POST(req: NextRequest) {
    let path = req.nextUrl.pathname.replace('/api/image/sort', '')
    path = decodeURI(path).replace('/', '')
    console.log(path)
    let dir = await readdirChildLevel(path)

    let imgs = await req.json()
    for (let i = 0; i < imgs.length; i++) {
        console.log(imgs[i].img);
        console.log(imgs[i].img.slice(
            imgs[i].img.lastIndexOf('/'),
            imgs[i].img.length
        ))
        await rename(
            'public/' + imgs[i].img,
            path + '/' +
            i + "_" + imgs[i].img.slice(
                imgs[i].img.lastIndexOf('/') + 1,
                imgs[i].img.length
            ),
        )
    }

    return NextResponse.json({msg: 'ok'})
}