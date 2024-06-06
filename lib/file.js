// 读取指定路径下的指定文件类型的所有文件名
import {recursiveReadDir} from "next/dist/lib/recursive-readdir";
import {readdir, stat} from "fs/promises";
import node_path from "path";

// import {readdir, stat} from "fs";

export async function readdirFilter(path, fileType) {
    let dir = []
    // let path = './public/audios'
    dir = await recursiveReadDir(path)
    dir = dir.map((p) => p.replaceAll("\\", '/'))
    dir = dir.filter((p) => p.endsWith(fileType))
    return dir
}

// 读取某文件夹下子文件夹
export async function readdirChildLevel(path) {
    let dir = []
    // let path = './public/audios'
    dir = await readdir(path)
    dir = dir.map((p) => p.replaceAll("\\", '/'))
    // 判断是不是目录
    dir = dir.filter(async (p) => await stat(node_path.join(path, p)))
    return dir
}
