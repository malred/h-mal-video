export function getAll() {
    var len = localStorage.length;  // 获取长度
    console.log(len) // 输出5
    var arr = new Array(); // 定义数据集
    for (var i = 0; i < len; i++) {
        // 获取key 索引从0开始
        var getKey = localStorage.key(i);
        // 获取key对应的值
        var getVal = localStorage.getItem(getKey);
        // 放进数组
        arr[i] = {
            'key': getKey,
            'val': getVal,
        }
    }
    return arr
}

export function getAllRPGStorage() {
    var len = localStorage.length;  // 获取长度
    var arr = []; // 定义数据集
    for (var i = 0; i < len; i++) {
        // 获取key 索引从0开始
        var getKey = localStorage.key(i);
        // 同时不包含 RPG config file global的就不保存
        if (!getKey.includes('RPG') &&
            !getKey.includes('config') &&
            !getKey.includes('file') &&
            !getKey.includes('global')) {
            continue
        }
        // 获取key对应的值
        var getVal = localStorage.getItem(getKey);
        // 放进数组
        arr.push({
            'key': getKey,
            'val': getVal,
        })
    }
    return arr
}

export async function setAll(arr) {
    if (arr && arr.length > 0) {
        for (let i = 0; i < arr.length; i++) {
            let name = arr[i].key.slice(
                0,
                arr[i].key.lastIndexOf('.'),
            )
            console.log(name)
            // console.log('set', arr[i].key, arr[i].val)
            // localStorage.setItem(arr[i].key.replace('.txt', ''), arr[i].val)
            await localStorage.setItem(name, arr[i].val)
        }
    }
}