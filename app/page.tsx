'use client';
import NavBar from "@/components/NavBar";
import {useEffect, useState} from "react";
import {string} from "postcss-selector-parser";
import {setPList} from "@/store/plist";
import Link from "next/link";

export default function Home() {
    // let res = await fetch('http://localhost:3000/api/audio')
    // let data = await res.json()
    // console.log(data)

    const [imgs, setImgs] = useState([])
    // 最后一级目录, 作为漫画名
    const [names, setNames] = useState([])
// 封面
//     const [covers, setCovers] = useState([])

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
                .filter((item: string, index: number) => {
                    return ps1.indexOf(item) === index
                })
            console.log(ps2)
            setImgs(ps2)

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
            setNames(newArr)
        })()
    }, [])

    return (
        <div className="flex flex-col items-center justify-between ">
            <div className={'2xl:mt-12 mt-16 p-2 min-h-screen min-w-full flex flex-col'}>
                {/*card*/}
                <div className={'py-4 px-1 flex flex-wrap flex-row gap-x-20 gap-y-12'}>
                    {names.map((n: string, index: number) => (
                        <Link href={`/manga?name=${imgs.filter((p: string) => p.includes(n))[0].replace('/','')}`}>
                            <div
                                className={'bg-amber-200 h-40 border w-28 rounded flex flex-row justify-center'}
                            >{n}</div>
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
    );
}
