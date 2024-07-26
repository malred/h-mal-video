import {PrismaClient} from "@prisma/client";

const db = new PrismaClient({
    log: [{emit: 'stdout', level: 'query'}]
})

let name = '[ネコゴショ (ヤナギユウ)] NekoNekoNote10.1 調教済み少女 おじさん達と乱交えっち｜NekoNekoNote10.1 被調教完成的少女與大叔們亂交性愛[中文][柚香農業]'

// 获取cover
let cover_res = await fetch(`http://localhost:3000/api/image/cover/public/photos/${name}`)
let file = await cover_res.json()
// console.log(file)

// 获取页数
let p_res = await fetch(
    'http://localhost:3000/api/file/dir/child/size?path=public/photos/' + name,
    // {method: 'GET', cache: 'no-cache'}
    {method: 'GET'}
)
let {size} = await p_res.json()

// 创建manga
let manga = await db.manga.create({
    data: {
        name,
        size,
        cover: file.f,
        tag: "丝袜,颜射,长筒袜,黑丝,白丝,裤袜,潮吹,纯爱"
    }
})

// 获取该漫画下的图片
// let res = await fetch(`http://localhost:3000/api/file/dir?path=${path}&type=${type}`, {
let res = await fetch(`http://localhost:3000/api/image/${name}`, {
    method: "GET"
})
let data = await res.json()
data = data.images.map((d) => d.replace('public', ''))
console.log(data)

// 创建图片数据
for (let j = 0; j < data.length; j++) {
    await db.img.create({
        data: {
            url: data[j],
            mangaId: manga.id
        }
    })
}

