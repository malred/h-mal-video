'use client'
import {useSearchParams} from "next/navigation";

export default function VideoPlayPage() {
    const url = useSearchParams().get('v')
    console.log('/' + url)
    return (
        <>
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
                            src={'/' + encodeURI(url)}
                            type="video/webm"
                        />
                        <source
                            src={'/' + +encodeURI(url)}
                            type="video/mp4"
                        />
                    </video>
                </div>
                {/*播放列表*/}
                <div className={'mt-2 w-1/4 flex flex-col'}>列表</div>
            </div>
        </>
    )
}