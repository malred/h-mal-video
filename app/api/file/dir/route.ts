import {NextRequest, NextResponse} from "next/server";
import {readdirFilter} from "@/lib/file";

export async function GET(req: NextRequest) {
    const path = req.nextUrl.searchParams.get('path');
    const type = req.nextUrl.searchParams.get('type');
    console.log(path, type)
    const dir = await readdirFilter(path, type)
    return NextResponse.json({dir})
}