'use client';
import {useEffect, useState} from "react";
import Link from "next/link";
import {hoverShadowSetYClassname} from "@/constants/tailwindClass";
import {usePage} from "@/hooks/usePage";
import {PageBottom} from "@/components/PageBottom";
import Image from "next/image";

export default function Home() {
// todo: 点击下载按钮, 压缩文件, 重定向到该url下载(因为有静态资源,直接访问下载)
    return (
        <div>
            index
        </div>
    );
}
