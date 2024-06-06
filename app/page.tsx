import NavBar from "@/components/NavBar";

export default async function Home() {
    // let res = await fetch('http://localhost:3000/api/audio')
    // let data = await res.json()
    // console.log(data)


    return (
        <div className="flex flex-col items-center justify-between ">
            <div className={'mt-12 p-2 bg-green-300 min-h-screen min-w-full flex flex-col'}>
                <span className={'text-xl'}>视频区</span>
                {/*card*/}
                <div>

                </div>
                <span className={'text-xl'}>音频区</span>
                <span className={'text-xl'}>图片区</span>
            </div>
            {/*            <div className={'bg-green-300 min-h-screen h-96 min-w-full'}>*/}
            {/*d*/}
            {/*            </div>*/}
        </div>
    );
}
