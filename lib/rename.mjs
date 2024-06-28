import {readdir, stat, rename} from 'fs/promises'
import path from "path";
import {recursiveReadDir} from "next/dist/lib/recursive-readdir.js";


let dir = []
// let path = './public/audios'
dir = await recursiveReadDir('./')
dir = dir.map((p) => p.replaceAll("\\", '/'))
// 判断是不是目录
// dir = dir.filter(async (p) => await stat(node_path.join('./' + p)))
// 找出带＃号的
dir = dir.filter((p) =>
    p.includes('#')
)
dir = dir.map((p) => {
    const pathToFile = path.join('./', p)
    const newPathToFile = path.join('./', p.replaceAll('#', ''))
    console.log(pathToFile, newPathToFile)
    rename(pathToFile, newPathToFile)
    return newPathToFile
})
console.log(dir)
