import {NextRequest, NextResponse} from "next/server";
import {readdirFilter} from "@/lib/file";
import fs from "fs";
import * as bmfont2json from 'bmfont2json'

export async function GET(req: NextRequest) {
    // var fs = require('fs');
    // var bmfont2json = require('bmfont2json');

//grab the Buffer or a string of our data
//     var data = fs.readFileSync('public/3d/font/NotoSansSC-VariableFont_wght.ttf');

//the bitmap font data as an object
//     var obj = bmfont2json(data);

//we can stringify it if we want...
//     var json = JSON.stringify(obj);

    let dir = await readdirFilter('./public/audios', 'mp3')
    return NextResponse.json({audios: dir})
}