'use client';
import Link from "next/link";
import {usePathname, useRouter} from "next/navigation";
import {hoverShadowSetYClassname} from "@/constants/tailwindClass";

export const NavBar = () => {
    // 获取path
    const pathname = usePathname();

    return (
        <div className={'fixed border-b bg-white shadow hover:shadow-md w-full grid grid-cols-4 gap-4'}>
            <div className={'flex flex-row text-xs md:text-base items-center gap-6'}>
                <img src={'/logo.png'} alt='' className={'h-12 w-14 mx-2'}></img>
                <Link href={'/'}>
                    <span
                        className={`${pathname === '/' ? 'bg-green-200' : ''} ${hoverShadowSetYClassname} 
                         hover:bg-green-300 xl:p-2 p-1 inline-block rounded`}>首页</span>
                </Link>
                <Link href={'/photo'}>
                    <span
                        className={`${pathname === '/photo' ? 'bg-green-200' : ''} ${hoverShadowSetYClassname} 
                        hover:bg-green-300 xl:p-2 p-1 inline-block rounded`}>图片</span>
                </Link>
                <Link href={'/video'}>
                    <span className={`${pathname === '/video' ? 'bg-green-200' : ''} ${hoverShadowSetYClassname} 
                    hover:bg-green-300 xl:p-2 p-1 inline-block rounded`}>视频</span>
                </Link>
                <Link href={'/audio'}>
                    <span className={`${pathname === '/audio' ? 'bg-green-200' : ''} ${hoverShadowSetYClassname} 
                    hover:bg-green-300 xl:p-2 p-1 inline-block rounded`}>音频</span>
                </Link>
            </div>
            <input type="text"
                   className={`${hoverShadowSetYClassname} hover:shadow-md mt-2 ml-28 md:ml-0
                   lg:col-span-2 col-span-2
                   hover:border-amber-500 focus:outline-amber-600 border h-8 rounded p-2`}/>
            <img src="/icons/search.png" alt=""
                 className={`${hoverShadowSetYClassname}  
                 ml-28 md:ml-0
                 rounded hover:-inset-y-1 relative mt-3 h-6 w-6`}/>
        </div>
    );
};

export default NavBar