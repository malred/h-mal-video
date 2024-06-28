import db from "./db";

export async function getMangas() {
    return await db.manga.findMany({
        include: {
            imgs: true
        }
    })
}

export async function getMangaNotWithImgs() {
    return await db.manga.findMany({})
}

export async function getMangaImgsById(id) {
    return await db.manga.findUnique({
        where: {
            id
        }
    })
}