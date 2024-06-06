export async function getCurVideo(path) {
    let res = await fetch(
        `/api/video/${path}`,
        {method: 'GET', cache: 'no-cache'}
    )
    return await res.json()
}