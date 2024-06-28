'use client';
import {useRouter, useSearchParams} from "next/navigation";
import {useEffect, useState} from "react";
import Draggable from 'react-draggable';

// import {DragDropContext, Droppable,Draggable} from 'react-beautiful-dnd';
// error
export default function SortPage() {
    const nav = useRouter()
    // 目录名
    let name = useSearchParams().get('name')

    const [imgs, setImgs] = useState([])
    const [newImgs, setNewImgs] = useState([])
    const [curItem, setCurItem] = useState()

    useEffect(() => {
        // reset();
        (async () => {
            let res = await fetch(`/api/image/${name}`, {method: 'GET'})
            let photos = await res.json()
            // console.log(photos.images.slice(start, end));
            let ps = photos.images.map((p: string) => p.replace('public/', ''))
            setImgs(ps)
            let ps2 = ps.map((p, i) => {
                return {
                    img: p,
                    id: i
                }
            })
            ps2.sort((a, b) => {
                let a1 = a.img.split('_')[0].split('/')
                let b1 = b.img.split('_')[0].split('/')
                console.log(a1, b1)
                console.log(a1.length, b1.length)
                // 默认比较字符串, 这里用 减号 进行数值比较
                return (
                    (a1[a1.length - 1]) - (b1[b1.length - 1])
                )
            })
            console.log(ps2)
            setNewImgs(ps2)
        })()
    }, [])
    // console.log(imgs)


    // 浏览图片, 拖拽排序
    // 重命名接口 -> oldName, newName -> 本页面拖拽时在前面添加1,2,3...序号,然后提交
    return (
        <div className={'2xl:pt-14 pt-20 flex flex-row flex-wrap gap-3'}>
            <div className={'w-full'}></div>
            {newImgs.map((item: { id: number, img: string }, index: number) => (
                    <Draggable
                        key={index}>
                        <div className={'relative'}>
                            <img
                                id={index + ''}
                                src={'/' + item.img} alt=""
                                className={'img w-44 h-56'}
                            />
                            <span
                                onClick={() => {
                                    // console.log(newImgs)
                                    let cur = newImgs.filter((i) => i.id === item.id)[0]
                                    setCurItem(cur) // 记录当前
                                    // setNewImgs(ps)
                                    console.log(curItem)
                                }}
                                className={'hover:opacity-100 cursor-pointer absolute text-center w-10 h-10 opacity-80 inset-x-1 inset-y-1 p-2 rounded-full bg-blue-500'}>
                            {item.id}
                        </span>
                            <span>

                            </span>
                            <span
                                onClick={() => {
                                    console.log(newImgs.length)
                                    let arr = newImgs
                                    let cur = {
                                        id: item.id,
                                        img: item.img
                                    }

                                    if (curItem && parseInt(curItem.id) !== item.id) {
                                        // 如果刚刚点击了标签, 再点击左或右, 则将该标签放入当前元素的左或右
                                        console.log(1)
                                        arr = arr.filter((a) => a.id !== curItem.id)
                                        cur = curItem
                                        setCurItem(undefined)
                                    } else {
                                        arr = newImgs.filter((a) => a.id !== (item.id))
                                    }

                                    let idx = index - 1 < 0 ? 0 : index - 1
                                    arr.splice(idx, 0, cur)
                                    setNewImgs(arr)
                                }}
                                className={'hover:opacity-100 opacity-90 inset-y-2/4 w-10 h-10 -inset-x-2 cursor-pointer absolute text-center p-2 bg-blue-500 rounded-lg'}
                            >&lt;</span>
                            <span
                                onClick={() => {
                                    let arr = newImgs
                                    let cur = {
                                        id: item.id,
                                        img: item.img
                                    }

                                    if (curItem && parseInt(curItem.id) !== item.id) {
                                        // 如果刚刚点击了标签, 再点击左或右, 则将该标签放入当前元素的左或右
                                        arr = arr.filter((a) => a.id !== curItem.id)
                                        cur = curItem
                                        setCurItem(undefined)
                                    } else {
                                        arr = newImgs.filter((a) => a.id !== (item.id))
                                    }

                                    let idx = index + 1 > imgs.length - 1 ? imgs.length - 1 : index + 1
                                    arr.splice(idx, 0, cur)
                                    setNewImgs(arr)
                                }}
                                className={'hover:opacity-100 opacity-90 inset-y-2/4 w-10 h-10 inset-x-3/4 cursor-pointer absolute text-center p-2 bg-blue-500 rounded-lg'}
                            >&gt;</span>
                        </div>
                    </Draggable>
                )
            )}
            <div className={'w-full p-2 flex flex-row justify-center items-center'}>
                <button
                    onClick={async () => {
                        await fetch(`/api/image/sort/public/photos/${name}`, {
                            method: 'POST',
                            headers: {
                                "Content-type": "application/json"
                            },
                            body: JSON.stringify(newImgs)
                        })
                        nav.back()
                    }}
                    className={'py-2 bg-pink-200 rounded-lg px-3'}>提交
                </button>
            </div>
        </div>
    )
}