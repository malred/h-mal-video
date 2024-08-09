'use client';
// import {readdirChildLevel, readdirFilter} from "@/lib/file";

import {getChildDir} from "@/api/file";
import {useEffect, useState} from "react";
import {hoverShadowSetYClassname} from "@/constants/tailwindClass";
import {getCurVideo} from "@/api/video";
import {useRouter} from "next/navigation";
import {usePage} from "@/hooks/usePage";
import {PageBottom} from "@/components/PageBottom";
import {setList} from '@/store/vlist'
import {useRef} from 'react'
// import { gsap } from 'gsap/dist/gsap';
// import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
// import { useGSAP } from '@gsap/react';
// GSAP のインポート
import Gsap from 'gsap';

// ScrollTrigger のインポート
import {ScrollTrigger} from 'gsap/dist/ScrollTrigger';

// ScrollTriggerの初期化
Gsap.registerPlugin(ScrollTrigger);
Gsap.config({
    nullTargetWarn: false,
});

export default function VideoPage() {
    const nav = useRouter()
    // 当前二级目录
    const [dir, setDir] = useState([])

    // 当前选中的二级目录index
    const [idx, setIdx] = useState(0)
    // 当前选中的三级目录index
    const [deepIdx, setDeepIdx] = useState(-1)

    // 当前二级目录对应的子目录(三级目录)
    const [child, setChild] = useState([])
    // 当前目录(2/3级)下的视频
    const [curVideo, setCurVideo] = useState([])
    // 防止视频过多卡死 设置分页
    // const [start, setStart] = useState(0)
    // const [end, setEnd] = useState(10)
    const {
        start, end, reset, onPageSub, onPageAdd, getPage
    } = usePage(10, curVideo.length)

    const titleRef = useRef(null)
    const boardRef = useRef(null)

    useEffect(() => {

        // フェードイン表示する
        Gsap.from(titleRef.current?.parentElement, {
            opacity: 0,
            duration: 1,
            yPercent: -100,
            // width: 0,
            transformOrigin: 'center'
            // skewX: 30,
        });
        Gsap.to(titleRef.current?.parentElement, {
            opacity: 1,
            duration: 1,
            yPercent: 0,
            // width: '100%',
            // skewX: 0,
        });
        Gsap.from(boardRef.current, {
            opacity: 0,
            duration: 1,
            yPercent: 100,
        });
        Gsap.to(boardRef.current, {
            opacity: 1,
            duration: 1,
            yPercent: 0,
        });


    }, []);

    useEffect(() => {
        // 每次index和idx改变应该清空start end
        // setStart(0);
        // setEnd(10);
        reset();

        (async () => {
            // 获取三级目录
            // let res = await getChildDir('./public/videos')
            let res = await getChildDir('public/videos')
            setDir(res.dir)
            console.log(res.dir)
            // 获取三级目录
            let childRes = await getChildDir('public/videos/' + res.dir[idx])
            setChild(childRes.dir) // 当前三级目录下所有文件和文件夹(不包含三级目录以下)
            if (deepIdx === -1) {
                console.log('no deep');

                // 没有往更深
                setCurVideo(
                    childRes.dir
                        .filter((c: string) => (c.includes('.mp4') || c.includes('mkv')))
                        .map((c: string) => 'videos/' + res.dir[idx] + '/' + c)
                )
            } else {
                console.log('获取deep child')
                // 获取某个具体目录下的所有mp4 /2/3/.../.mp4
                console.log('set cur video',
                    res.dir[idx] + '/' +
                    childRes.dir
                        .filter((r: string) => !r.includes('.mp4') && !r.includes('.mkv'))[deepIdx]
                )
                let cur = await getCurVideo(
                    res.dir[idx] + '/' + childRes.dir
                        // 过滤mp4文件, 我们要的是子目录的文件
                        .filter((r: string) => !r.includes('.mp4') && !r.includes('.mkv'))[deepIdx]
                )
                let curV = cur.videos.map((v: string) => {
                    let v1 = decodeURI(v)
                    console.log(v1)
                    return v1.replace('public/', '')
                })
                setCurVideo(curV)
                console.log(curV)
            }
        })()

    }, [idx, deepIdx])

    return (<div className={'flex flex-col gap-2 md:pt-16 pt-12 bg-gray-100 min-h-screen'}>
        {/* 纯色背景 加 搜索词或页面标题 */}
        <div className={'text-center md:p-20 p-14 bg-amber-200'}>
            <span className={' text-2xl font-bold'} ref={titleRef}>视频</span>
        </div>
        {/*白色 标签版*/}
        <div
            ref={boardRef}
            className={'pt-4 pl-4 -inset-y-12 w-3/4 md:inset-x-44 overflow-auto inset-x-24 md:ml-2 rounded h-52 relative bg-white'}>
            <div className={'border-b flex flex-row justify-start p-2 gap-4'}>
                {dir
                    .map((d, index) => (
                        <span
                            className={`truncate ${idx === index ? 'bg-green-200' : ''} ${hoverShadowSetYClassname} border hover:bg-green-300 rounded p-2 h-10`}
                            onClick={(e) => setIdx(index)}
                            key={index}>{d}</span>
                    ))}
            </div>
            <div className={'border-b flex flex-wrap flex-row justify-start p-2 gap-4'}>
                {child
                    .filter((c: string) => !c.includes('.mp4'))
                    .map((d, index) => (
                        <span
                            className={`truncate ${index === deepIdx ? 'bg-green-200' : ''} ${hoverShadowSetYClassname} border hover:bg-green-300 rounded p-2 h-10`}
                            onClick={(e) => setDeepIdx(index)}
                            key={index}>{d}</span>
                    ))}
            </div>
        </div>
        {/*视频卡片*/}
        <div className={'gap-8 justify-start md:ml-24 ml-28 flex flex-row flex-wrap'}>
            {/*{child*/}
            {/*    .filter((c: string) => c.includes('.mp4'))*/}
            {/*    .map((c: string) => (*/}
            {/*        <div className={`${hoverShadowSetYClassname} flex flex-col shadow-md rounded-lg`}>*/}
            {/*            <video*/}
            {/*                src={`/videos/${dir[idx]}${deepIdx === -1 ?*/}
            {/*                    '' : '/' + child.filter((ch: string) => !ch.includes('.mp4'))[deepIdx]}/${c}`}*/}
            {/*                className={'h-[8.5rem] w-60 rounded-t-lg'}></video>*/}
            {/*            <span*/}
            {/*                className={'bg-white p-2 rounded-b-lg'}>*/}
            {/*                {c.replace('.mp4', '')}*/}
            {/*            </span>*/}
            {/*        </div>*/}
            {/*    ))*/}
            {/*}*/}
            {curVideo
                .slice(start, end)
                .map((c: string, index) => (
                    <div
                        onClick={(e) => {
                            console.log('curVideo', curVideo);

                            setList(curVideo)
                            // 跳转播放
                            // nav.push(`/video/play?v=${c}&i=${index}`)
                            // todo: 这里的分页会让indx到不了末尾, 触发不了跳转会video
                            nav.push(`/video/play?i=${index}&page=${getPage()}&size=${10}`)
                        }}
                        className={`${hoverShadowSetYClassname} flex flex-col shadow-md rounded-lg`}>
                        <video
                            src={`${c.replace('/public', '')}`}
                            className={'h-[8.5rem] w-60 rounded-t-lg'}></video>
                        <span
                            title={c}
                            className={'truncate bg-white w-60 p-2 rounded-b-lg'}>
                            {c.replace('.mp4', '')}
                        </span>
                    </div>
                ))
            }
        </div>
        {/*分页切换按钮*/}
        {/*<div className={'flex mb-4 flex-row justify-center w-full gap-3 text-lg'}>*/}
        {/*    <span onClick={(e) => {*/}
        {/*        if ((start - 10) < 0) return*/}
        {/*        setStart(start - 10)*/}
        {/*        setEnd(end - 10)*/}
        {/*    }}>&lt;</span>*/}
        {/*    <span>{start / 10}</span>*/}
        {/*    <span onClick={(e) => {*/}
        {/*        if ((start + 10) > curVideo.length) return*/}
        {/*        setStart(start + 10)*/}
        {/*        setEnd(end + 10)*/}
        {/*    }}>&gt;</span>*/}
        {/*</div>*/}
        <PageBottom onPageSub={onPageSub} onPageAdd={onPageAdd} getPage={getPage}/>
    </div>)
}