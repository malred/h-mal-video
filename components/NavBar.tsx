'use client';
import Link from "next/link";
import {usePathname, useRouter} from "next/navigation";
import {hoverShadowSetYClassname} from "@/constants/tailwindClass";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {Input} from "@/components/ui/input";


export const NavBar = () => {
    // 获取path
    const pathname = usePathname();
    const paths = pathname === '/' ? [''] : pathname.split('/')

    return (
        <>
            <div className={'z-20 fixed border-b bg-white w-full grid grid-cols-6 gap-4'}>
                <div className={'flex flex-row text-xs md:text-base items-center gap-4 col-span-2'}>
                    <img src={'/logo.png'} alt='' className={'h-12 w-14 mx-2'}></img>
                    <Link href={'/'}>
                    <span
                        className={`${pathname === '/' ? 'bg-green-200' : ''} ${hoverShadowSetYClassname} 
                         hover:bg-green-300 xl:p-2 p-1 inline-block rounded`}>首页</span>
                    </Link>
                    <Link href={'/photo'}>
                    <span
                        className={`${pathname === '/photo' ? 'bg-green-200' : ''} ${hoverShadowSetYClassname} 
                        hover:bg-green-300 xl:p-2 p-1 inline-block rounded`}>漫画</span>
                    </Link>
                    <Link href={'/video'}>
                    <span className={`${pathname === '/video' ? 'bg-green-200' : ''} ${hoverShadowSetYClassname} 
                    hover:bg-green-300 xl:p-2 p-1 inline-block rounded`}>视频</span>
                    </Link>
                    <Link href={'/audio'}>
                    <span className={`${pathname === '/audio' ? 'bg-green-200' : ''} ${hoverShadowSetYClassname} 
                    hover:bg-green-300 xl:p-2 p-1 inline-block rounded`}>音频</span>
                    </Link>
                    <Link href={'/game'}>
                    <span className={`${pathname === '/game' ? 'bg-green-200' : ''} ${hoverShadowSetYClassname} 
                    hover:bg-green-300 xl:p-2 p-1 inline-block rounded`}>游戏</span>
                    </Link>
                </div>
                <div className={'flex flex-row gap-4 col-span-3'}>
                    <Input
                        className={`h-8 mt-2 ml-28 md:ml-0 `}
                    />
                    {/*<input type="text"*/}
                    {/*       className={`${hoverShadowSetYClassname} hover:shadow-md mt-2 ml-28 md:ml-0*/}
                    {/*       lg:col-span-2 col-span-2*/}
                    {/*       hover:border-amber-500 focus:outline-amber-600 border h-8 rounded p-2`}/>*/}
                    <div></div>
                </div>
                <img src="/icons/search.png" alt=""
                     className={`${hoverShadowSetYClassname}  
                 ml-28 md:ml-0
                 rounded hover:-inset-y-1 relative mt-3 h-6 w-6`}/>
            </div>
            <div className={'z-10 fixed w-full mt-2 flex shadow hover:shadow-md h-20 bg-white'}>
                <Breadcrumb>
                    <BreadcrumbList>
                        {paths.map((p: string, index: number) => (
                            <>
                                <BreadcrumbItem>
                                    <BreadcrumbLink href={'/' + p}>{p === '' ? 'Home' : p}</BreadcrumbLink>
                                </BreadcrumbItem>
                                {index !== paths.length - 1 ? <BreadcrumbSeparator/> : <></>}
                            </>
                        ))}
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
        </>
    );
};

export default NavBar