// 转换音乐格式
import {readdir, stat, rename} from 'fs/promises'
import ffmpeg from 'fluent-ffmpeg'
import node_path from "path";


export async function readdirChildLevel(path) {
    let dir = []
    // let path = './public/audios'
    dir = await readdir(path)
    dir = dir.map((p) => p.replaceAll("\\", '/'))
    // 判断是不是目录
    dir = dir.filter(async (p) => await stat(node_path.join(path, p)))
    return dir
}

let child = await readdirChildLevel('.')
child = child.filter(c => c.includes('.ogg'))
console.log(child)

for (let i = 0; i < child.length; i++) {
    ffmpeg()
        .input(child[i])
        .output(child[i].replace('ogg', 'm4a'))
        .on('end', function () {
            console.log('音频已转换');
        })
        .run();
}