'use client';
import {useSearchParams} from "next/navigation";
import {Suspense, useEffect, useState} from "react";
import {PageBottom} from "@/components/PageBottom";
import {usePage} from "@/hooks/usePage";
import Link from "next/link";
import Image from "next/image";
import {Slider} from "@radix-ui/themes";
// import { Slider } from "@/components/ui/slider"


export default function MangaPage() {
    // 目录名
    let name = useSearchParams().get('name')

    const [imgs, setImgs] = useState([])
    // let pageSize = 50
    // const {
    //     start, end, reset, onPageSub, onPageAdd, getPage, setPage
    // } = usePage(pageSize, imgs.length)
    // 当前要点击放大的图
    const [idx, setIdx] = useState(0)
    // 是否放大图 (铺满页面)
    const [expend, setExpend] = useState(false)
    // 当前滚动距离
    // const [curH, setCurH] = useState(150)
    const [curH, setCurH] = useState(0)
    const [scrolling, setScrolling] = useState(false)

    window.onscroll = () => {
        console.log(window.scrollX)
        console.log(window.scrollY)
    }

    useEffect(() => {
        // reset();
        (async () => {
            // 使用cache则排序后最新结果不会显示
            // let res = await fetch(`api/image/${name}`, {method: 'GET', cache: 'force-cache'})
            let res = await fetch(`api/image/${name}`, {method: 'GET'})
            console.log(res)
            let photos = await res.json()
            // console.log(photos.images.slice(start, end));
            let ps = photos.images.map((p: string) => p.replace('public/', ''))
            ps.sort((a: string, b: string) => {
                console.log(
                    a.split('_'),
                    b.split('_')
                )
                let a1 = a.split('_')[0].split('/')
                let b1 = b.split('_')[0].split('/')

                console.log(a1, b1)
                console.log(a1.length, b1.length)
                // 默认比较字符串, 这里用 减号 进行数值比较
                return (
                    // @ts-ignore
                    (a1[a1.length - 1]) - (b1[b1.length - 1])
                )
            })
            console.log('ps', ps)
            setImgs(ps)
        })()
    }, [])
    // 变动时滚动
    useEffect(() => {
        console.log(curH)
        // if (curH > (window.outerHeight * pageSize)) {
        //     console.log('stop')
        //     setTimeout(() => {
        //         setCurH(0)
        //     })
        //     // 移动端有bug, 建议手动
        //     // window.scrollTo(0, 0)
        //     // onPageAdd()
        //     return () => {
        //         // onPageAdd()
        //     }
        // } else {
        //     console.log('scroll')
        // 1s后更改h, 触发effect, effect先执行滚动, 然后又设置延时set, 循环触发
        let id = setTimeout(() => {
            setCurH(curH + 500)
            // setCurH(window.scrollY + 400)
        }, 1200)
        // 下一次进入时触发滚动
        return () => {
            clearTimeout(id)
            window.scrollTo(0, curH)
            // window.scrollTo(0, window.scrollY)
        }
        // }
        // if (curH > window.outerHeight) {
        //     console.log(222)
        //     window.scrollTo(0, 0)
        //     setCurH(0)
        //     onPageAdd()
        // }
    }, [curH]);

    return (
        <>
            <div
                onClick={() => {
                    setScrolling(false)
                    setCurH(window.scrollY)
                }}
                onDoubleClick={() => {
                    window.scrollTo(0, 0)
                    setCurH(0)
                }}>
                <Link
                    className={"rounded-lg p-2 w-12 y-12 z-20 inset-x-24 inset-y-24 sticky bg-green-200"}
                    href={`/manga/sort?name=${name}`}>
                    排序
                </Link>
                {/*<Slider defaultValue={[33]} max={100} step={1} />*/}
                {!expend && <div
                    // @ts-ignore
                    //ref={ptopRef}
                    className={'flex flex-col gap-2 2xl:mt-14 mt-16 bg-gray-100 min-h-screen'}>
                    {/* 纯色背景 加 搜索词或页面标题 */}
                    {/*<div className={'text-center md:p-20 p-14 bg-amber-200'}>*/}
                    {/*    <span className={' text-2xl '}>图片</span>*/}
                    {/*</div>*/}
                    <div className={'mt-2 flex flex-col gap-4 items-center'}>
                        {imgs
                            // .slice(start, end)
                            .map((img, index) => (
                                <Image
                                    width={800}
                                    height={900}
                                    fetchPriority={'high'}
                                    onClick={(e) => {
                                        setExpend(true)
                                        setIdx(index)
                                    }}
                                    className={'shadow-lg object-contain rounded max-h-screen w-3/4'}
                                    src={'/' + img} alt=""/>
                            ))}
                    </div>
                    {/*<PageBottom onPageAdd={onPageAdd} onPageSub={onPageSub} getPage={getPage}/>*/}
                </div>}
            </div>
        </>)
}