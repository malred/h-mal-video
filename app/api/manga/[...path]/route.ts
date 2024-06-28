import {NextRequest, NextResponse} from "next/server";

// 根据id获取manga imgs
export async function GET(req: NextRequest) {
    let path = req.nextUrl.pathname.replace('/api/manga', '')


    return NextResponse.json({})
}
