'use client';

import {Suspense, useEffect, useRef, useState} from "react";
import {usePage} from "@/hooks/usePage";
import {PageBottom} from "@/components/PageBottom";
import Link from "next/link";
import {hoverShadowSetYClassname} from "@/constants/tailwindClass";

export default function PhotoPage() {
    // let res = await fetch('http://localhost:3000/api/audio')
    // let data = await res.json()
    // console.log(data)

    const [imgs, setImgs] = useState([])
    // 最后一级目录, 作为漫画名
    const [names, setNames] = useState([])
    // 封面
    const [covers, setCovers] = useState([])


    useEffect(() => {
        // reset();
        (async () => {
            let res = await fetch(`api/image`, {method: 'GET'})
            let photos = await res.json()
            // console.log(photos.images.slice(start, end));
            // console.log(photos.images)

            let ps = photos.images
                // photos/[RPG]零号羔羊CG/x.jpg
                .map((p: string) => p.replace('public/', ''))
            // setImgs(ps)

            let newArr: string[] = []
            let ps1 = ps
                // photos/[RPG]零号羔羊CG
                .map((p: string) => p.replace('photos', ''))
                .map((p: string) => p.slice(0, p.lastIndexOf('/')))
            let ps2 = ps1
                // 去重
                .filter((item: string, index: number) => {
                    return ps1.indexOf(item) === index
                })
            console.log(ps2)
            setImgs(
                ps2
            )

            ps
                // photos/x/[RPG]零号羔羊CG
                .map((p: string) => p.slice(0, p.lastIndexOf('/')))
                // /[RPG]零号羔羊CG
                .map((p: string) => p.slice(p.lastIndexOf('/') + 1, p.length))
                .forEach((item: string) => {
                    if (newArr.indexOf(item) === -1) {
                        newArr.push(item)
                    }
                })
            setNames(
                // @ts-ignore
                newArr
            )

            let cs = []
            for (const n of newArr) {
                let path = ps2.filter((p: string) => p.includes(n))[0].replace('/', '')
                let res = await fetch(`api/image/cover/public/photos/${path}`)
                let file = await res.json()
                cs.push(file.f)
            }
            setCovers(
                // @ts-ignore
                cs
            )
        })()
    }, [])

    return (
        <>
            <div className="flex flex-col items-center justify-between ">
                <div className={'2xl:mt-12 mt-16 p-2 min-h-screen min-w-full flex flex-col'}>
                    {/*card*/}
                    <div className={'py-4 px-1 flex flex-wrap flex-row gap-x-8 gap-y-16'}>
                        {names
                            .map((n: string, index: number) => (
                                // @ts-ignore
                                <Link href={`/manga?name=${imgs.filter((p: string) => p.includes(n))[0].replace('/', '')}`}>
                                    <div
                                        className={hoverShadowSetYClassname +
                                            'relative h-40 border w-28 rounded-lg flex flex-row justify-center'}
                                    >
                                        <img
                                            // width={28}
                                            // height={40}
                                            // loading={"lazy"}
                                            // fetchPriority={'high'}
                                            title={n}
                                            className={'rounded-lg opacity-80 h-40 w-28 '}
                                            src={'/' + covers[index]}
                                            alt=""/>
                                        <span className={'absolute w-28 truncate font-black'}>{n}</span>
                                    </div>
                                </Link>))}
                    </div>
                    {/*<span className={'text-xl'}>视频区</span>*/}
                    {/*<span className={'text-xl'}>音频区</span>*/}
                    {/*<span className={'text-xl'}>图片区</span>*/}
                </div>
                {/*            <div className={'bg-green-300 min-h-screen h-96 min-w-full'}>*/}
                {/*d*/}
                {/*            </div>*/}
            </div>
        </>)
}