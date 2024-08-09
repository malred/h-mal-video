'use client';

import {useEffect, useRef} from 'react'
import Gsap from 'gsap';
// ScrollTrigger のインポート
import {ScrollTrigger} from 'gsap/dist/ScrollTrigger';
import Link from 'next/link';

// ScrollTriggerの初期化
Gsap.registerPlugin(ScrollTrigger);
Gsap.config({
    nullTargetWarn: false,
});


export default function Home() {
    const searchRef = useRef()
    const titleRef = useRef()
    const imgsDivRef = useRef()

    useEffect(() => {
        const tl = Gsap.timeline({
            defaults: {
                duration: 1.5,
                ease: 'power2.out'
            }
        })

        tl
            .fromTo(searchRef.current, {
                width: 0,
            }, {
                width: 920
            })
            .fromTo(titleRef.current, {
                opacity: 0,
            }, {
                opacity: 1,
            }, '<')

        const imgs = Gsap.utils.toArray('.img')
        imgs.forEach((img, idx) => {
            if (idx % 2 === 0) {
                tl
                    .fromTo(img, {
                        opacity: 0,
                        yPercent: 60,
                    }, {
                        opacity: 1,
                        yPercent: 0,
                        scrollTrigger: {
                            // trigger: img,
                            trigger: imgsDivRef.current,
                            start: 'top bottom',
                            end: 'bottom bottom',
                            scrub: true,
                        },
                        // stagger: .3,
                        // duration: .5
                    })
                    .fromTo(img.previousSibling, {
                        opacity: 0,
                        // width: 0,
                        // yPercent: -30,
                    }, {
                        opacity: 1,
                        // yPercent: 0,
                        // // width: 100,
                        scrollTrigger: {
                            trigger: img,
                            start: 'top bottom',
                            end: 'bottom bottom',
                            scrub: true,
                        },
                        // stagger: .3,
                        // duration: .5
                    })
                    .fromTo(img.nextElementSibling, {
                        width: 0,
                    }, {
                        width: '100%',
                        scrollTrigger: {
                            trigger: img,
                            start: 'top center',
                            end: 'bottom bottom',
                            // markers: true,
                            scrub: true,
                        },
                        duration: 2
                    }, '>')
            } else {
                tl
                    .fromTo(img, {
                        opacity: 0,
                        yPercent: -60,
                    }, {
                        opacity: 1,
                        yPercent: 0,
                        scrollTrigger: {
                            trigger: imgsDivRef.current,
                            // trigger: img,
                            start: 'top bottom',
                            end: 'bottom bottom',
                            scrub: true,
                            // stagger: .1,
                            ease: 'power2.out',
                        },
                        // stagger: .3,
                        duration: .5
                    })
                    .fromTo(img.previousSibling, {
                        opacity: 0,
                        // width: 0,
                        // yPercent: -60,
                    }, {
                        // width: 100,
                        opacity: 1,
                        // yPercent: 0,
                        scrollTrigger: {
                            trigger: img,
                            start: 'top bottom',
                            end: 'bottom bottom',
                            scrub: true,
                        },
                        // stagger: .3,
                        // duration: .5
                    })
                    .fromTo(img.nextElementSibling, {
                        width: 0,
                    }, {
                        width: '100%',
                        scrollTrigger: {
                            trigger: img,
                            start: 'bottom center',
                            end: 'top top',
                            // markers: true,
                            scrub: true,
                        },
                        // duration: .6
                    }, '>')
            }
        })

        // tl.fromTo(imgsDivRef.current.querySelector('hr'), {
        //     width: 0
        // }, {
        //     width: 1,
        //     scrollTrigger: {
        //         trigger: imgsDivRef.current,
        //         // trigger: img,
        //         start: 'top bottom',
        //         end: 'bottom bottom',
        //         scrub: true,
        //         stagger: .1,
        //         ease: 'power2.out',
        //         // duration: 1.5
        //     }
        // })
    }, [])

// todo: 点击下载按钮, 压缩文件, 重定向到该url下载(因为有静态资源,直接访问下载)
    return (
        <div className={'flex flex-col items-center mt-32'}>
            <div className={'mt-20 h-screen flex flex-col gap-3 items-center w-full'}>
                <h2 ref={titleRef} className={'m-12 text-4xl font-bold'}>H搜索</h2>
                <input ref={searchRef} className={'p-4 rounded-xl h-16 border border-green-300 '} type="text"/>
            </div>
            {/*<div className={'flex flex-col'}>*/}
            {/*    <h1>精彩内容</h1>*/}
            {/*</div>*/}
            <div ref={imgsDivRef}
                 className={'imgsdiv justify-center h-screen flex flex-wrap gap-3 items-center w-full'}>
                <div className={'flex flex-col justify-center items-center'}>
                    <Link href={'photo'} className={' font-bold text-xl'}>
                        美图 </Link>
                    <img className={'img h-96 w-56 rounded-xl m-4'} src="/page-use/acg.jpg" alt="acg picture"/>
                    <hr className={'h-1 border-green-300 w-full border-1'}/>
                </div>
                <div className={'flex flex-col justify-center items-center'}>
                    <Link href={'video'} className={' font-bold text-xl'}>桃乃木香奈</Link>
                    <img className={'img h-96 w-56 rounded-xl m-4'} src="/page-use/桃乃木香奈.jpg"
                         alt="桃乃木香奈 picture"/>
                    <hr className={'h-1 border-green-300 w-full border-1'}/>
                </div>
                <div className={'flex flex-col justify-center items-center'}>
                    <Link href={'manga'} className={' font-bold text-xl'}>漫画</Link>
                    <img className={'img h-96 w-56 rounded-xl m-4'} src="/page-use/manga.jpg" alt="漫画 picture"/>
                    <hr className={'h-1 border-green-300 w-full border-1'}/>
                </div>
                <div className={'flex flex-col justify-center items-center'}>
                    <Link href={'manga'} className={' font-bold text-xl'}>漫画</Link>
                    <img className={'img h-96 w-56 rounded-xl m-4'} src="/page-use/manga2.png" alt="漫画 picture"/>
                    <hr className={'h-1 border-green-300 w-full border-1'}/>
                </div>
                <div className={'flex flex-col justify-center items-center'}>
                    <Link href={'manga'} className={' font-bold text-xl'}>漫画</Link>
                    <img className={'img h-96 w-56 rounded-xl m-4'} src="/page-use/manga3.jpg" alt="漫画 picture"/>
                    <hr className={'h-1 border-green-300 w-full border-1'}/>
                </div>
            </div>
        </div>
    );
}
