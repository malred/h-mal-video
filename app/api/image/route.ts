import {NextRequest, NextResponse} from "next/server"; 
import {readdirFilter} from "@/lib/file";

export async function GET(req: NextRequest) {
    let dir1 = await readdirFilter('./public/photos', 'png')
    let dir2 = await readdirFilter('./public/photos', 'jpg')
    return NextResponse.json({images: [...dir1,...dir2]})
}