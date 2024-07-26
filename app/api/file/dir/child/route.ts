import {NextRequest, NextResponse} from "next/server";
import {readdirChildLevel} from "@/lib/file";

export async function GET(req: NextRequest) {
    const path = req.nextUrl.searchParams.get('path');
    if (!path) return NextResponse.error()
    let child
    try {
        // 读取子集文件夹下的文件名
        child = await readdirChildLevel(path);
        console.log(child)
        if (!child)
            throw new Error()
    } catch (e) {
        return NextResponse.error()
    }
    return NextResponse.json({dir: child})
}