import {NextRequest, NextResponse} from "next/server";
import {readdirChildLevel, readdirFilter} from "@/lib/file";

export async function GET(req: NextRequest) {
    let dir = await readdirChildLevel('public/games')
    return NextResponse.json({games: dir})
}