'use clinet';
import {useSearchParams} from "next/navigation";

export default function DetailPage() {
    // 目录名
    let name = useSearchParams().get('name')

    return (
        <div>

        </div>
    )
}