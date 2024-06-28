'use client'
import {getChildDir} from "@/api/file";
import {useRouter, useSearchParams} from "next/navigation";
import {Suspense, useEffect, useRef, useState} from "react";
import {videoStaticBasePath} from '@/constants/urlOrPath'
import {getList} from "@/store/vlist";
import {Badge} from "@/components/ui/badge";
import Link from "next/link";
import {ScrollArea} from "@/components/ui/scroll-area";
import {Input} from "@/components/ui/input";

// 强制更新
// export const dynamic = 'force-dynamic'

// export default function VideoPlayPage({ params, searchParams }) {
export default function VideoPlayPage() {
    const nav = useRouter()

    // let v = useSearchParams().get('v')
    let i = useSearchParams().get('i')
    i = parseInt(i)
    let page = useSearchParams().get('page')
    page = parseInt(page)
    let size = useSearchParams().get('size')
    size = parseInt(size)

    // const [url, setUrl] = useState(v || '')
    // const [idx, setIdx] = useState(i || -1)
    // const [plays, setPlays] = useState([])
    // const intervalRef = useRef([]);
    // const vref = useRef(url);
    const vref = useRef('');
    vref.current = getList()[page * size + i]

    const videoRef = useRef();

    // useEffect(() => {
    //     (async () => {
    //         let v1 = v?.slice(0, v.lastIndexOf('/')) || ''
    //         console.log(v1);
    //         let res = await getChildDir(videoStaticBasePath + v1.replace('videos', ''))
    //         // console.log(res.dir);

    //         intervalRef.current = res.dir.map((f) => decodeURI(f))
    //         // console.log(intervalRef.current);

    //         intervalRef.current = intervalRef.current
    //             .map(f => v1 + '/' + f)
    //         // setPlays([...intervalRef.current])
    //         // console.log(plays);
    //         // console.log(intervalRef.current);
    //         // if (idx !== -1) {
    //         // setIdx(i)
    //         // vref.current = intervalRef.current[idx]
    //         // setUrl(v + intervalRef.current[idx])
    //         // } else {
    //         // setIdx[0]
    //         vref.current = intervalRef.current[i]
    //         // setIdx(0)
    //         // setUrl(v + intervalRef.current[idx])
    //         // }
    //     })()
    // }, []) 
    // console.log(idx);
    // console.log(url);
    console.log(vref.current);


    return (
        <Suspense fallback={<p>loading...</p>}>
            <div className={'bg-pink-50 min-h-screen h-full pt-16 flex flex-row'}>
                <div className={`gap-3 flex flex-col mt-12 items-center justify-start w-4/5`}>
                    <video
                        muted
                        ref={videoRef}
                        onPlay={(e) => {
                            //@ts-ignore
                            videoRef.current.muted = false
                            //@ts-ignore
                            videoRef.current.requestFullscreen();
                        }}
                        onEnded={(e) => {
                            // console.log(intervalRef.current.length);
                            // console.log(idx);
                            // if (intervalRef.current.length > i + 1) {
                            //     nav.push(`/video/play?v=${intervalRef.current[i + 1]}&i=${i + 1}`)
                            //     // window.location.href(`/video/play?v=${intervalRef.current[idx + 1]}&i=${idx + 1}`)
                            // }
                            // else {
                            //     nav.push('/video')
                            // }
                            // if (i + 1 < getList().length) {
                            console.log(page);
                            console.log(size)
                            if (i + (page * size) + 1 < getList().length) {
                                // nav.push(`/video/play?v=${getList()[i + 1]}&i=${i + 1}`)
                                let p = parseInt(page)
                                let idx = parseInt(i)
                                if (idx + 1 === size) {
                                    idx = 0
                                    p += 1
                                    console.log(idx, p)
                                } else {
                                    idx += 1
                                    console.log(idx, p)
                                }
                                nav.push(`/video/play?i=${idx}&page=${p}&size=${size}`)
                            } else nav.push('/video')
                        }}
                        className={`rounded-lg h-[30rem] w-[50rem]`}
                        controls
                        autoPlay
                        src={'/' + vref.current}
                    >
                    </video>
                    <div className={'justify-center w-3/4 flex flex-row'}>
                        <span>{vref.current}</span>
                    </div>
                    <div className={'flex flex-row gap-2'}>
                        {['丝袜', '颜射', '过膝袜', '潮吹', '内射'].map((s, i) => (
                            <Badge key={i} variant={'pink'}>{s}</Badge>
                        ))}
                    </div>
                    <div className={'w-1/3 border-t-2 my-2'}>
                    </div>
                    <div className={'items-center w-2/3 grid grid-cols-3 justify-center my-1'}>
                        <span className={'text-lg font-bold'}>
                            留言
                        </span>
                        <Input className={'h-8'}/>
                        <div className={'flex justify-center'}>
                        <span className={'cursor-pointer p-2 bg-pink-200 rounded-lg w-12 text-center'}>
                            发送
                        </span>
                        </div>
                    </div>
                    <div className={'w-2/3 mb-5'}>
                        {[
                            {
                                id: 1,
                                name: 'user1',
                                avatar: '/logo.png',
                                comment: '艹④丝袜母狗!😍😍😍😋🤤🤤🤤',
                                createdAt: '2024-6-27'
                            },
                            {
                                id: 1,
                                name: 'user1',
                                avatar: '/logo.png',
                                comment: '好想舔丝足😝😝😝🥵🥵🥵',
                                createdAt: '2024-6-27'
                            }
                        ].map((item, i) => (
                            <div className={'mb-2 border-b flex flex-col gap-2 justify-between'}>
                                <div className={' items-center flex flex-row gap-3'}>
                                    <img
                                        className={'h-12 w-12 rounded-full'}
                                        src={item.avatar} alt=""/>
                                    <span>{item.name}</span>
                                    <span>{item.createdAt}</span>
                                </div>
                                <div className={'pb-2 px-2'}>
                                    {item.comment}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                {/*播放列表*/}
                <ScrollArea className="w-88 h-screen">
                    <div className={'border-l-2 p-4 mt-10 w-88 flex flex-col gap-3'}>
                        {/*<span className={'text-xl font-bold'}>播放列表</span>*/}
                        {getList()
                            .slice(parseInt(page) * parseInt(size),
                                parseInt(size) + parseInt(page) * parseInt(size))
                            .map((l, i) => (
                                <Link href={`/video/play?i=${i}&page=${page}&size=${size}`}>
                                    <div className={'mx-2 bg-pink-50 shadow-lg rounded-lg flex flex-row gap-2'} key={i}>
                                        <video
                                            className={'max-w-44 bg-green-50 h-48 rounded-lg '}
                                            src={'/' + l}></video>
                                        <span className={'truncate w-36 p-2'}>{l}</span>
                                    </div>
                                </Link>
                            ))}
                    </div>
                </ScrollArea>
            </div>
        </Suspense>
    )
}