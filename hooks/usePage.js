import {useState} from "react";

/**
 * 分页钩子
 * @param pageSize 每页大小
 * @param length 被分页的数组的长度
 */
export const usePage = (pageSize, length) => {
    // 防止视频过多卡死 设置分页
    const [start, setStart] = useState(0)
    const [end, setEnd] = useState(pageSize)

    // 重置索引
    const reset = () => {
        setStart(0);
        setEnd(pageSize);
    }

    const onPageAdd = () => {
        if ((start + pageSize) > length) return
        setStart(start + pageSize)
        setEnd(end + pageSize)
    }
    const onPageSub = () => {
        if ((start - pageSize) < 0) return
        setStart(start - pageSize)
        setEnd(end - pageSize)
    }

    const getPage = () => {
        return start / pageSize
    }

    const setPage = (num) => {
        // 超过了最大页数
        if (length / pageSize < num) {
            // length/size -> 有小数点,被取整,所以 * page的结果是整数
            setStart(length / pageSize * pageSize)
            setEnd(length - 1)
            return length / pageSize
        }
        setStart(num * pageSize)
        setEnd(start + pageSize)
        return start / pageSize
    }

    return {
        start, end, reset, onPageSub, onPageAdd, getPage, setPage
    }
}