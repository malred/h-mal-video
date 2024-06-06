export async function getChildDir(path) {
    let res = await fetch(
        '/api/file/dir/child?path=' + path,
        {method: 'GET', cache: 'no-cache'}
    )
    return await res.json()
}