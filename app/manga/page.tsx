'use client';
import {useSearchParams} from "next/navigation";
import {Suspense, useEffect, useState} from "react";
import {PageBottom} from "@/components/PageBottom";
import {usePage} from "@/hooks/usePage";

export default function MangaPage() {
    // 目录名
    let name = useSearchParams().get('name')

    const [imgs, setImgs] = useState([])
    let pageSize = 50
    const {
        start, end, reset, onPageSub, onPageAdd, getPage, setPage
    } = usePage(pageSize, imgs.length)
    // 当前要点击放大的图
    const [idx, setIdx] = useState(0)
    // 是否放大图 (铺满页面)
    const [expend, setExpend] = useState(false)
    // 当前滚动距离
    // const [curH, setCurH] = useState(150)
    const [curH, setCurH] = useState(0)

    useEffect(() => {
        reset();
        (async () => {
            let res = await fetch(`api/image/${name}`, {method: 'GET'})
            console.log(res)
            let photos = await res.json()
            console.log(photos.images.slice(start, end));
            let ps = photos.images.map((p: string) => p.replace('public/', ''))
            setImgs(ps)
        })()
    }, [])
    // 变动时滚动
    useEffect(() => {
        console.log(curH)
        if (curH > (window.outerHeight * pageSize)) {
            console.log('stop')
            setTimeout(() => {
                setCurH(0)
            })
            // 移动端有bug, 建议手动
            // window.scrollTo(0, 0)
            // onPageAdd()
            return () => {
                onPageAdd()
            }
        } else {
            console.log('scroll')
            // 0.5s后更改h, 触发effect, effect先执行滚动, 然后又设置延时set, 循环触发
            let id = setTimeout(() => {
                setCurH(curH + 400)
            }, 500);
            // 下一次进入时触发滚动
            return () => {
                clearTimeout(id)
                window.scrollTo(0, curH)
            }
        }
        // if (curH > window.outerHeight) {
        //     console.log(222)
        //     window.scrollTo(0, 0)
        //     setCurH(0)
        //     onPageAdd()
        // }
    }, [curH]);

    return (
        <>
            {expend && <div className={'w-full h-full max-h-screen'}>
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
            {!expend && <div
                // @ts-ignore
                //ref={ptopRef}
                className={'flex flex-col gap-2 md:pt-12 pt-12 bg-gray-100 min-h-screen'}>
                {/* 纯色背景 加 搜索词或页面标题 */}
                {/*<div className={'text-center md:p-20 p-14 bg-amber-200'}>*/}
                {/*    <span className={' text-2xl '}>图片</span>*/}
                {/*</div>*/}
                <div className={'mt-2 flex flex-col gap-4 items-center'}>
                    {imgs
                        .slice(start, end)
                        .map((img, index) => (
                            <img
                                fetchPriority={'high'}
                                onClick={(e) => {
                                    setExpend(true)
                                    setIdx(index)
                                }}
                                className={'shadow-lg object-contain rounded max-h-screen w-3/4'}
                                src={(img)} alt=""/>
                        ))}
                </div>
                <PageBottom onPageAdd={onPageAdd} onPageSub={onPageSub} getPage={getPage}/>
            </div>}
        </>)
}