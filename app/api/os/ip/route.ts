import {NextRequest, NextResponse} from "next/server";
import os from "os";

export async function GET(req: NextRequest) {

    const os = require('os');
    const osType = os.type(); //系统类型
    const netInfo = os.networkInterfaces(); //网络信息

    // 如果是用移动WiFi, 应该是 192.168.1.xxx
    let ips = []
    for (let dev in netInfo) {
        //win7的网络信息中显示为本地连接，win10显示为以太网
        for (let j = 0; j < netInfo[dev].length; j++) {
            if (netInfo[dev][j].family === 'IPv4') {
                let ip = netInfo[dev][j].address;
                console.log(ip)
                ips.push(ip)
            }
        }
    }

    return NextResponse.json({ips})
}