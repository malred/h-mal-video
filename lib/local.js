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
        if (!getKey.includes('RPG')) {
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

export function setAll(arr) {
    if (arr && arr.length > 0) {
        for (let i = 0; i < arr.length; i++) {
            console.log('set', arr[i].key, arr[i].val)
            localStorage.setItem(arr[i].key.replace('.txt', ''), arr[i].val)
        }
    }
}