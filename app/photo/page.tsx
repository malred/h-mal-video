'use client';

import {Suspense, useEffect, useRef, useState} from "react";
import {usePage} from "@/hooks/usePage";
import {PageBottom} from "@/components/PageBottom";
import Link from "next/link";
import {hoverShadowSetYClassname} from "@/constants/tailwindClass";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import {Badge} from "@/components/ui/badge";
import {setMList} from "@/store/mlist";

type manga = {
    id: string
    name: string
    cover: string
    author: string
    tag: string
}

export default function PhotoPage() {
    // let res = await fetch('http://localhost:3000/api/audio')
    // let data = await res.json()
    // console.log(data)

    const [imgs, setImgs] = useState([])
    // 最后一级目录, 作为漫画名
    const [names, setNames] = useState([])
    // 封面
    const [covers, setCovers] = useState([])
    // db: manga
    const [mangas, setMangas] = useState([])

    useEffect(() => {
        (async () => {
            let res = await fetch(`api/manga`, {
                method: "GET"
            })
            let {mangas: data} = await res.json()
            console.log('mangas', mangas)
            setMangas(data)
            setMList(data)
        })()
    }, [])

    return (
        <>
            <div className="flex flex-col items-center justify-between ">
                <div className={'2xl:mt-14 mt-20 p-2 min-h-screen min-w-full flex flex-col'}>
                    {/*card*/}
                    <div className={'py-4 px-1 flex flex-wrap flex-row gap-x-8 gap-y-16'}>
                        {/*{names*/}
                        {/*    .map((n: string, index: number) => (*/}
                        {mangas
                            .map((m: manga, index: number) => (
                                // @ts-ignore
                                <Link
                                    key={index}
                                    // href={`/manga?name=${imgs.filter((p: string) => p.includes(n))[0].replace('/', '')}`}
                                    href={`/manga?name=${m.name}`}
                                >
                                    <div
                                        className={hoverShadowSetYClassname +
                                            'relative h-40 border w-28 rounded-lg flex flex-row justify-center'}
                                    >
                                        <HoverCard>
                                            <HoverCardTrigger>
                                                <img
                                                    // width={28}
                                                    // height={40}
                                                    loading={"lazy"}
                                                    fetchPriority={'high'}
                                                    // title={n}
                                                    className={'object-cover rounded-lg opacity-80 h-40 w-28 '}
                                                    src={'/' + m.cover}
                                                    alt=""/>
                                                <span className={'absolute w-28 truncate font-black'}>{m.name}</span>
                                            </HoverCardTrigger>
                                            <HoverCardContent>
                                                <div className={'py-2 flex flex-row gap-3'}>
                                                    <img
                                                        className={'rounded-lg opacity-80 h-20 w-14 '}
                                                        src={'/' + m.cover}
                                                        alt=""/>
                                                    <span>{m.name}</span>
                                                </div>
                                                <Badge variant={'pink'}>丝袜</Badge>
                                            </HoverCardContent>
                                        </HoverCard>
                                    </div>
                                </Link>))}
                    </div>
                </div>
            </div>
        </>)
}