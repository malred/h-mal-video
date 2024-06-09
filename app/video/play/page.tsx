'use client'
import {getChildDir} from "@/api/file";
import {useRouter, useSearchParams} from "next/navigation";
import {Suspense, useEffect, useRef, useState} from "react";
import {videoStaticBasePath} from '@/constants/urlOrPath'
import {getList} from "@/store/vlist";

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
            <div className={'pt-12 flex flex-row'}>
                <div className={`flex flex-col mt-8 items-center justify-start w-3/4`}>
                    <video
                        muted
                        ref={videoRef}
                        onPlay={(e) => {
                            //@ts-ignore
                            videoRef.current.muted=false
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
                                nav.push(`/video/play?i=${i + 1}&page=${page}&size=${size}`)
                            } else nav.push('/video')
                        }}
                        className={`rounded-lg h-5/6`}
                        controls
                        autoPlay
                        src={'/' + vref.current}
                    >
                        {/* <source
                            src={vref.current}
                            // src={'/' + intervalRef.current[idx]}
                            type="video/webm"
                        />
                        <source
                            src={vref.current}
                            // src={'/' + intervalRef.current[idx]}
                            type="video/mp4" */}
                        {/* /> */}
                    </video>
                </div>
                {/*播放列表*/}
                <div className={'mt-2 w-1/4 flex flex-col'}>列表</div>
            </div>
        </Suspense>
    )
}