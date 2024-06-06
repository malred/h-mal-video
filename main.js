const express = require('express');
const app = express();
const path = require('path');
const serveIndex = require('serve-index');

//----- 配置静态资源托管 -----
// 静态目录
app.use('/', serveIndex(path.join(__dirname, ''), { 'icons': true }));
app.use('/', express.static(path.join(__dirname, '')));

//----- 监听端口 -----
const port = process.env.port || 3001;
app.listen(port, (error) => {
    const os = require('os');
    const osType = os.type(); //系统类型
    const netInfo = os.networkInterfaces(); //网络信息
    for (let dev in netInfo) {
        //win7的网络信息中显示为本地连接，win10显示为以太网 
        for (let j = 0; j < netInfo[dev].length; j++) {
            if (netInfo[dev][j].family === 'IPv4') {
                ip = netInfo[dev][j].address;
                console.log(ip)
            }
        }
    }
    console.log(`server running at port ${port}`);
}); 