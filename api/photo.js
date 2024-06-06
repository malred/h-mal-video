export async function getCurPhoto(path) {
    let res = await fetch(
        `/api/image/${path}`,
        {method: 'GET'}
    )
    return await res.json()
}