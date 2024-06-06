export async function getCurVideo(path) {
    let res = await fetch(
        `/api/video/${path}`,
        {method: 'GET'}
    )
    return await res.json()
}