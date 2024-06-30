'use client';
import {useEffect, useState} from "react";
import Link from "next/link";
import {getAll, getAllRPGStorage, setAll} from '@/lib/local'


export default function GamePage() {
    const [gameList, setGameList] = useState([])
    let length
    const [arr, setArr] = useState([])

    useEffect(() => {
        (async () => {
            // @ts-ignore
            if (!JSON.parse(localStorage.getItem('playing'))) { // 点击去玩, 设为playing, 回来时就不会覆盖玩之后的存档
                // let last_store = await fetch(`api/store`)
                // last_store = await last_store.json()
                // // @ts-ignore
                // let store_f = await fetch(`api/store/${last_store.last}`)
                // store_f = await store_f.json()
                //
                // // 获取最新游戏存档
                // // @ts-ignore
                // setAll(store_f.res)
                // console.log('同步最新存档成功')
            }

            let res = await fetch(`api/game`, {
                method: 'GET'
            })
            let {games} = await res.json()
            console.log(games)
            setGameList(games)
            length = games.length
            console.log(length % 3)
            let fill = []
            for (let i = 0; i < length % 3 - 1; i++) {
                fill.push(i)
            }
            // @ts-ignore
            setArr(fill)
        })()
    }, []);

    return (
        <div className={'flex flex-col h-screen p-4 justify-between'}>
            <div className={'flex flex-row flex-wrap pt-24 gap-3 justify-center'}>
                {gameList.map((g: string) => (
                    <Link
                        onClick={() => {
                            localStorage.setItem('playing', JSON.stringify(true))
                        }}
                        className={'p-3 rounded-lg shadow-lg w-96 h-12 bg-green-200'}
                        href={`/games/${g}/index.html`}>
                        <div className={'text-center'}>
                            {g}
                        </div>
                    </Link>
                ))}
                {arr.map((i) => <div
                    className={'p-3 rounded-lg w-96 h-12 '}
                ></div>)}
            </div>
            <div className={'gap-3 flex flex-row justify-center'}>
                <button
                    className={'p-2 bg-green-200 rounded-lg w-36'}
                    onClick={async () => {
                        let last_store = await fetch(`api/store`)
                        last_store = await last_store.json()
                        console.log(last_store)

                        // @ts-ignore
                        let store_f = await fetch(`api/store/${last_store.last}`)
                        store_f = await store_f.json()
                        console.log(store_f)

                        // 获取最新游戏存档
                        // @ts-ignore
                        setAll(store_f.res)
                        alert('同步最新存档成功')
                    }}
                >
                    获取存档
                </button>
                <button
                    onClick={async () => {
                        let arr = getAllRPGStorage()
                        if (arr && arr.length > 0) {
                            await fetch(`api/store`, {
                                method: 'POST',
                                body: JSON.stringify(arr)
                            })
                        }
                        alert(`保存成功`)
                        // 保存完存档, 可以开放自动同步
                        localStorage.setItem('playing', JSON.stringify(false))
                    }}
                    className={'p-2 bg-green-200 rounded-lg w-36'}
                >保存存档
                </button>
            </div>
        </div>
    )
}