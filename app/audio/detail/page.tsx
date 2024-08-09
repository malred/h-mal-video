'use client';
import {Canvas} from '@react-three/fiber'
import {
    OrbitControls,
    TransformControls,
    Html,
    PositionalAudio,
    useGLTF,
    Text,
    Text3D,
    Float,
    Center,
    Preload
} from '@react-three/drei'
import CanvasLoader from "./Loader";
import {Suspense, useEffect, useRef, useState} from 'react';
import StarsCanvas from "@/app/audio/detail/StarCanvas";
import {extend} from '@react-three/fiber'

import {BackSide, DoubleSide} from "three";
import Ball from "@/app/audio/detail/Ball";

import Gsap from 'gsap';
// ScrollTrigger のインポート
import {ScrollTrigger} from 'gsap/dist/ScrollTrigger';
import Link from 'next/link';
import {randomType} from "@/lib/utils";

// ScrollTriggerの初期化
Gsap.registerPlugin(ScrollTrigger);
Gsap.config({
    nullTargetWarn: false,
});

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

export default function AudioDetailPage() {

    useEffect(() => {
        const commentTopDivs = Gsap.utils.toArray('.comment-top')

        commentTopDivs.forEach((div) => {
            const tl = Gsap.timeline()

            tl
                .fromTo(div, {
                        width: 0,
                        opacity: 0,
                    },
                    {
                        width: 800,
                        opacity: 1,
                        duration: 1.4,
                    }
                )
                .fromTo(div.querySelector('.comment-date'), {
                    opacity: 0,
                }, {
                    opacity: 1,
                })
        })

        const commentBottomDivs = Gsap.utils.toArray('.comment-bottom')

        commentBottomDivs.forEach((div) => {
            const tl = Gsap.timeline()

            div.addEventListener('mouseenter', () => {
                randomType(div.querySelector('.comment-content'), '01', 600, true)
            })
        })
    }, []);

    return (
        <div className="mt-20 h-screen relative z-0 bg-black">
            <div className="h-full xl:mt-12 xl:flex-row flex-col-reverse flex gap-10 overflow-hidden">
                <div
                    // className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px]">
                    className="xl:flex-1 xl:h-auto md:h-full h-[350px]">
                    {/*<div className={'text-white'}>多远都要在一起 - 邓紫棋</div>*/}
                    <Canvas
                        shadows
                        className={'h-full'}
                        frameloop="demand"
                        gl={{preserveDrawingBuffer: true}}
                        camera={{
                            fov: 45,
                            near: 0.1,
                            far: 200,
                            position: [0, 3, 6],
                        }}
                    >
                        <Suspense fallback={<CanvasLoader/>}>
                            <OrbitControls
                                // 自动旋转
                                // autoRotate
                                // enableZoom={false}
                                // maxPolarAngle={Math.PI / 2}
                                // minPolarAngle={Math.PI / 2}
                            />
                            <Earth/>
                            {/*{play && <PositionalAudio*/}
                            {/*    // url="/audios/B站往期更新（根据反馈会持续更新）/[RJ335033]推荐（1）.mp3"*/}
                            {/*    url="/多远都要在一起-G.E.M.邓紫棋.flac"*/}
                            {/*    autoplay loop distance={5}/>}*/}
                        </Suspense>
                        <Text
                            position={[0, 2, 0]}
                            fontSize={0.4}
                            color={"white"}
                            textAlign="center"
                            // side={BackSide}
                            font="/3d/font/NotoSansSC-VariableFont_wght.ttf"
                        >
                            多远都要在一起 - 邓紫棋
                            {/* toneMapped 色调映照，这里关闭后，颜色不会再带有一些灰暗 */}
                            <meshBasicMaterial toneMapped={false} side={DoubleSide}/>
                        </Text>
                        {/*{[*/}
                        {/*    'pink', 'blue', 'orange', 'red', 'skyblue',*/}
                        {/*    'green', 'hotpink', 'black', 'yellow', 'purple'*/}
                        {/*].map((color, index) => (*/}
                        {/*    <Text*/}
                        {/*        position={[getRandomArbitrary(-2, 2), getRandomArbitrary(-1.5, 1.5), 3]}*/}
                        {/*        fontSize={0.1}*/}
                        {/*        color={color}*/}
                        {/*        rotation={[0, 0, 0]}*/}
                        {/*        // textAlign="center"*/}
                        {/*        // side={BackSide}*/}
                        {/*        font="/3d/font/NotoSansSC-VariableFont_wght.ttf">*/}
                        {/*        test{index}*/}
                        {/*        <meshBasicMaterial toneMapped={false} side={DoubleSide}/>*/}
                        {/*    </Text>*/}
                        {/*))}*/}
                        {/*<Text*/}
                        {/*    position={[1,1, 3]}*/}
                        {/*    fontSize={0.2}*/}
                        {/*    color={"white"}*/}
                        {/*    rotation={[0, 0, 0]}*/}
                        {/*    // textAlign="center"*/}
                        {/*    // side={BackSide}*/}
                        {/*    font="/3d/font/NotoSansSC-VariableFont_wght.ttf">*/}
                        {/*    test2*/}
                        {/*    <meshBasicMaterial toneMapped={false} side={DoubleSide}/>*/}
                        {/*</Text>*/}
                        {/*<Html*/}
                        {/*    position={[-0.7, 0.5, 0.5]}*/}
                        {/*    wrapperClass="text"*/}
                        {/*    distanceFactor={5}*/}
                        {/*>*/}
                        {/*    <div>test</div>*/}
                        {/*</Html>*/}
                    </Canvas>
                </div>
            </div>
            <div className={'h-full'}>
                <div className={'mt-4 justify-center items-center p-4 flex flex-row gap-3'}>
                    <h1 className={'bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-500 font-semibold text-3xl'}>多远都要在一起</h1>
                    <span className={'text-xl'}>邓紫棋</span>
                </div>
                <div className={'p-4 flex flex-col justify-center gap-3'}>
                    <div className={'flex flex-col items-center'}>
                        <h1 className={'font-semibold text-2xl'}>评论</h1>
                    </div>
                    <div className={'h-2'}></div>
                    <div className={'flex flex-col items-center'}>
                        <div className={'flex flex-col gap-3 items-center w-9/12'}>
                            {[1, 2, 3, 4, 5, 6].map((comment, idx) => (
                                <div className={'flex flex-col gap-3 items-start'}>
                                    <div
                                        className={'w-[800px] comment-top m-1 border-b-2 flex flex-row gap-3 items-center'}>
                                        <div className={'bg-white w-12 h-12 cursor-pointer'} key={idx}>
                                            <Canvas
                                                frameloop="demand"
                                                // 保留视图缓冲区
                                                gl={{preserveDrawingBuffer: true}}
                                            >
                                                {/* suspense可以等待加载 */}
                                                {/* 加载模型,fallback是没加载完成时执行的回调 */}
                                                <Suspense fallback={<CanvasLoader/>}>
                                                    {/* 轨道控制 */}
                                                    <OrbitControls enableZoom={false}/>
                                                    {/* 3D模型 */}
                                                    <Ball imgUrl={'/3d/test/logo.png'}/>
                                                </Suspense>
                                                {/* 预加载 */}
                                                <Preload all/>
                                            </Canvas>
                                        </div>
                                        <div className={'comment-date'}>2024-12-1</div>
                                    </div>
                                    <div className={'comment-bottom mx-1 flex flex-col gap-3'}>
                                        <span className={'p-1 w-[800px] comment-content'}>www! 100昏!!! 😍😍😍</span>
                                        <div className={'flex flex-row gap-2'}>
                                            <span className={'cursor-pointer'} title={'点赞'}>❤{123}</span>
                                            <span className={'cursor-pointer'} title={'评论'}>💬{23}</span>
                                            <span className={'cursor-pointer'} title={'分享'}>🚀{18}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            {/* 3D模型-背景-星星 */}
            <StarsCanvas/>
        </div>
    )
}

const Earth = () => {
    const earth = useGLTF("/3d/scene.gltf");
    const [play, setPlay] = useState(false);

    const clickHandler = () => {
        console.log(play)
        setPlay(!play);
    };

    const soundRef = useRef()

    return (
        <>
            <OrbitControls
                // 自动旋转
                autoRotate={play}
                enableZoom={false}
                maxPolarAngle={Math.PI / 2}
                minPolarAngle={Math.PI / 2}
            />
            {/* 这个音乐有近大远小的效果 */}
            {play && (
                <PositionalAudio
                    // url="/audios/B站往期更新（根据反馈会持续更新）/[RJ335033]推荐（1）.mp3"
                    url="/多远都要在一起-G.E.M.邓紫棋.flac"
                    ref={soundRef}
                    autoplay loop distance={3}/>
            )}

            <primitive onClick={clickHandler} scale={2}
                       object={earth.scene} position-y={0} rotation-y={0}/>
        </>
    );
};

useGLTF.preload("/3d/scene.gltf")

