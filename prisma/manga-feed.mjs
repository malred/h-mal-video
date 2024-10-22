import {PrismaClient} from "@prisma/client";

const db = new PrismaClient({
    log: [{emit: 'stdout', level: 'query'}]
})


const path = 'public/photos'

let res = await fetch(
    'http://localhost:3000/api/file/dir/child?path=' + path,
    // {method: 'GET', cache: 'no-cache'}
    {method: 'GET'}
)
let {dir} = await res.json()
dir = dir.map((d) => d.replace('public', ''))
console.log(dir)
console.log(dir.length)

await db.manga.deleteMany()
await db.img.deleteMany()

for (let i = 0; i < dir.length; i++) {
    // 获取cover
    let cover_res = await fetch(`http://localhost:3000/api/image/cover/public/photos/${dir[i]}`)
    let file = await cover_res.json()
    // console.log(file)

    // 获取页数
    let p_res = await fetch(
        'http://localhost:3000/api/file/dir/child/size?path=public/photos/' + dir[i],
        // {method: 'GET', cache: 'no-cache'}
        {method: 'GET'}
    )
    let {size} = await p_res.json()

    // 创建manga
    let manga = await db.manga.create({
        data: {
            name: dir[i],
            cover: file.f,
            size,
            tag: "丝袜,颜射,长筒袜,黑丝,白丝,裤袜,潮吹,纯爱"
        }
    })

    // let res = await fetch(`http://localhost:3000/api/file/dir?path=${path}&type=${type}`, {
    let res = await fetch(`http://localhost:3000/api/image/${dir[i]}`, {
        method: "GET"
    })
    let data = await res.json()
    data = data.images.map((d) => d.replace('public', ''))
    // console.log(data)

    for (let j = 0; j < data.length; j++) {
        await db.img.create({
            data: {
                url: data[j],
                mangaId: manga.id
            }
        })
    }
}

