'use client'
import {useSearchParams} from "next/navigation";
import {Suspense, useEffect, useState} from "react";

// 强制更新
// export const dynamic = 'force-dynamic'

// export default function VideoPlayPage({params, searchParams}) {
export default function VideoPlayPage() {
    // 如果要build, 就不能用这个, 但是不用这个会报错
    const params = useSearchParams()
    // let url = params.get('v')
    let url = decodeURI(params.get('v') || '')
    // const [url, setUrl] = useState('')
    // setUrl(searchParams['v'])
    // useEffect(() => {
    // let params = searchParams
    // setUrl(params['v'] || '')
    // }, [])

    return (
        <Suspense fallback={<p>loading...</p>}>
            <div className={'pt-12 flex flex-row'}>
                <div className={'flex flex-col mt-8 items-center justify-start w-3/4'}>
                    {/*一个 初始静音、循环播放、有控制面板的视频播放器 */}
                    <video
                        className={'rounded-lg h-5/6 bg-amber-200'}
                        controls
                        muted
                        loop
                    >
                        <source
                            src={'/' + url}
                            type="video/webm"
                        />
                        <source
                            src={'/' + url}
                            type="video/mp4"
                        />
                    </video>
                </div>
                {/*播放列表*/}
                <div className={'mt-2 w-1/4 flex flex-col'}>列表</div>
            </div>
        </Suspense>
    )
}