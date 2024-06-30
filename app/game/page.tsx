'use client';
import {useEffect, useState} from "react";
import Link from "next/link";
import {getAll, getAllRPGStorage, setAll} from '@/lib/local'
import {useRouter} from "next/navigation";


export default function GamePage() {
    const route = useRouter()

    const [gameList, setGameList] = useState([])
    let length
    const [arr, setArr] = useState([])

    useEffect(() => {
        (async () => {
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
                {gameList.map((g: string, index: number) => (
                    // <Link
                    <div
                        key={index}
                        onClick={async () => {
                            // 根据不同游戏设置存档, 点击跳转后获取对应游戏的存档 存入
                            // 保存时如何保存? 如何区分? -> 点击进入游戏后, local缓存当前游戏, 点击时读取, 如果有才保存

                            // 设置当前游戏是?
                            localStorage.setItem('curGame', JSON.stringify(g))

                            // 最后一个时间的存档
                            let last_store = await fetch(`api/store/?game=${g}`)
                            last_store = await last_store.json()
                            console.log(last_store)
                            console.log(g)
                            // @ts-ignore
                            if (!last_store.msg) {
                                // 获取当前游戏对应存档
                                // @ts-ignore
                                let store_f = await fetch(`api/store/${g}/${last_store.last}`)
                                store_f = await store_f.json()
                                console.log(store_f)

                                // 清空之前的
                                localStorage.clear()
                                localStorage.setItem('curGame', JSON.stringify(g))
                                // 获取最新游戏存档
                                // @ts-ignore
                                await setAll(store_f.res)
                            } else {
                                // 当前游戏还未存档
                                localStorage.clear()
                                localStorage.setItem('curGame', JSON.stringify(g))
                            }

                            alert('同步最新存档成功')

                            route.push(`/games/${g}/index.html`)
                        }}
                        className={'cursor-pointer p-3 rounded-lg shadow-lg w-96 h-12 bg-green-200'}
                        // href={`/games/${g}/index.html`}
                    >
                        <div className={'text-center'}>
                            {g}
                        </div>
                    </div>
                ))}
                {arr.map((i) => <div
                    className={'p-3 rounded-lg w-96 h-12 '}
                ></div>)}
            </div>
            <div className={'gap-3 flex flex-row justify-center'}>
                {/*<button*/}
                {/*    className={'p-2 bg-green-200 rounded-lg w-36'}*/}
                {/*    onClick={async () => {*/}
                {/*        let last_store = await fetch(`api/store`)*/}
                {/*        last_store = await last_store.json()*/}
                {/*        console.log(last_store)*/}

                {/*        // @ts-ignore*/}
                {/*        let store_f = await fetch(`api/store/${last_store.last}`)*/}
                {/*        store_f = await store_f.json()*/}
                {/*        console.log(store_f)*/}

                {/*        // 获取最新游戏存档*/}
                {/*        // @ts-ignore*/}
                {/*        setAll(store_f.res)*/}
                {/*        alert('同步最新存档成功')*/}
                {/*    }}*/}
                {/*>*/}
                {/*    获取存档*/}
                {/*</button>*/}
                <button
                    onClick={async () => {
                        let game = localStorage.getItem('curGame')
                        if (game) game = JSON.parse(game)
                        let arr = getAllRPGStorage()
                        if (arr && arr.length > 0) {
                            await fetch(`api/store${game ? '?game=' + game : ""}`, {
                                method: 'POST',
                                body: JSON.stringify(arr)
                            })
                        }
                        alert(`保存成功`)
                    }}
                    className={'p-2 bg-green-200 rounded-lg w-36'}
                >保存存档
                </button>
            </div>
        </div>
    )
}