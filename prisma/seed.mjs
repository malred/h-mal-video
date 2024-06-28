import {PrismaClient} from "@prisma/client";

const db = new PrismaClient({
    log: [{emit: 'stdout', level: 'query'}]
})

let mangas = await db.manga.findMany({
    include: {
        imgs: true
    }
})
console.log(mangas[0].imgs)