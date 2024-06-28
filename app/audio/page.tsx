'use client';

import {useEffect, useState} from "react";

export default function AudioPage() {
    const [audio, setAudio] = useState([])

    useEffect(() => {
        (async () => {
            let res = await fetch(`api/audio`, {
                method: 'GET'
            })
            let {audios} = await res.json()
            console.log(audios)
            let arr = audios.map((a: string) => {
                return a.replace('public/', '')
            })
            setAudio(arr)
        })()
    }, []);
    console.log(audio)

    return (<>
        <div className={'min-h-screen flex flex-col gap-4 pt-20 '}>
            {audio.map((a: string) => (
                <div className={'flex flex-row items-center justify-between bg-pink-200 shadow-lg rounded-lg p-2'}>
                    <span className={''}>
                        {a.slice(
                            a.lastIndexOf('/') + 1, -1
                        )}
                    </span>
                    <audio controls src={a}>
                        浏览器不支持音频播放。
                    </audio>
                </div>
            ))}
        </div>
    </>)
}