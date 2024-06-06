'use client';

import {Suspense, useEffect, useState} from "react";
import {usePage} from "@/hooks/usePage";
import {PageBottom} from "@/components/PageBottom";

export default function PhotoPage() {
    const [imgs, setImgs] = useState([])
    const {
        start, end, reset, onPageSub, onPageAdd, getPage
    } = usePage(10, imgs.length)
    // 当前要点击放大的图
    const [idx, setIdx] = useState(0)
    // 是否放大图 (铺满页面)
    const [expend, setExpend] = useState(false)

    useEffect(() => {
        reset();
        (async () => {
            let res = await fetch(`api/image`, {method: 'GET'})
            let photos = await res.json()
            console.log(photos.images.slice(start, end));
            let ps = photos.images.map((p: string) => p.replace('public/', ''))
            setImgs(ps)
        })()
    }, [])

    return (
        <>
            {expend && <div className={'w-full h-full max-h-screen '}>
                <Suspense fallback={<div>loading</div>}>
                    <img className={'object-contain h-screen'}
                         onClick={(e) => {
                             if (idx + 1 > imgs.length) {
                                 setExpend(false)
                                 return
                             }
                             setIdx(idx + 1)
                         }}
                         onDoubleClick={(e) => setExpend(false)}
                         src={imgs[start + idx]} alt=""/>
                </Suspense>
            </div>}
            {!expend && <div className={'flex flex-col gap-2 md:pt-12 pt-12 bg-gray-100 min-h-screen'}>
                {/* 纯色背景 加 搜索词或页面标题 */}
                <div className={'text-center md:p-20 p-14 bg-amber-200'}>
                    <span className={' text-2xl '}>图片</span>
                </div>
                <div className={'mt-2 flex flex-col gap-4 items-center'}>
                    {imgs
                        .slice(start, end)
                        .map((img, index) => (
                            <img
                                onClick={(e) => {
                                    setExpend(true)
                                    setIdx(index)
                                }}
                                className={'shadow-lg object-contain rounded max-h-screen w-3/4'}
                                src={img} alt=""/>
                        ))}
                </div>
                <PageBottom onPageAdd={onPageAdd} onPageSub={onPageSub} getPage={getPage}/>
            </div>}
        </>)
}