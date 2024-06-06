export async function getChildDir(path) {
    let res = await fetch(
        '/api/file/dir/child?path=' + path,
        // {method: 'GET', cache: 'no-cache'}
        {method: 'GET'}
    )
    return await res.json()
}