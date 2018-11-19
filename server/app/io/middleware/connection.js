'use strict';
const room = 'default-room';
const { formatTime } = require('../../lib/util');
function getRealTimeDealData() {
    const sellDataList = []
    for (let i = 5; i > 0; i--) {
        sellDataList.push({
            id: i,
            price: (Math.random() * 1000).toFixed(4),
            amount: (Math.random()).toFixed(3)
        })
    }
    sellDataList.forEach(item => {
        item.totalAmount = ((item.amount - 0) + Math.random()).toFixed(3)
    })

    // buyDataList
    const buyDataList = []
    for (let i = 1; i <= 5; i++) {
        buyDataList.push({
            id: i,
            price: (Math.random() * 1000).toFixed(4),
            amount: (Math.random()).toFixed(3)
        })
    }
    buyDataList.forEach(item => {
        item.totalAmount = ((item.amount - 0) + Math.random()).toFixed(3)
    })
    return {
        sellDataList, buyDataList, buyRatio: (Math.random() * 10000).toFixed(3), sellRatio: (Math.random() * 100000).toFixed(0)
    }
}

function getRealTimeTransactionData() {
    const list = []
    const startTime = (+new Date())
    for (let i = 0; i < 100; i++) {
        list.push({
            id: i,
            time: formatTime(new Date(startTime + i * 1000), 'hh:mm:ss'),
            tag: Math.random() > 0.5 ? -1 : 1, // -1 买入, 1卖出
            price: (Math.random() * 1000).toFixed(4),
            amount: (Math.random()).toFixed(3)
        })
    }
    list.reverse() // 逆序
    return list
}

function getRealTimeStockData() {
    let upDown = Math.random().toFixed(2) - 0
    if (Math.random() > 0.5) {
        upDown = -upDown
    }
    let highest = (Math.random() * 10000).toFixed(4) - 0
    let lowest = (Math.random() * 10000).toFixed(4) - 0
    if (lowest > highest) {
        [lowest, highest] = [highest, lowest]
    }
    return {
        ratio1: (Math.random() * 10000).toFixed(4),
        ratio2: (Math.random() * 100000).toFixed(4),
        upDown: upDown,
        highest: highest,
        lowest: lowest,
        volume: parseInt((Math.random() * 100000))
    }
}

const klineData = [] // 每分钟产生一条
let klineBaseData = 0
let klineType = 1 // 1分钟 5分钟
// 1542333720000  5698.9574 5698.9125 5698.9125 5698.9574  0.1188

function getOneKlineData(time, base) {
    let open = base * 0.95;
    let close = base * (Math.random() > 0.5 ? 1.2 : 0.85);
    let lowest = base * 0.8;
    let highest = base * 1.1;
    let volume = (Math.random() * 100).toFixed(0) - 0;
    if (lowest > highest) {
        [lowest, highest] = [highest, lowest];
    }
    if (highest <= open || highest <= close) {
        highest = Math.max(open, close) * 1.09
    }
    if (lowest >= open || lowest >= close) {
        lowest = Math.min(open, close) * 0.98
    }
    return [time, open.toFixed(4) - 0, close.toFixed(4) - 0, lowest.toFixed(4) - 0, highest.toFixed(4) - 0, volume]
}

// 初始化整个klineData数组
function initKlineData() {
    const len = 130;
    const currTime = (+new Date(formatTime(new Date(), 'yyyy/MM/dd hh:mm') + ':00'));
    let time = 0;
    klineData.splice(0, klineData.length);
    for (let i = 0; i <= len; i++) {
        time = currTime - (len - i) * klineType * 60 * 1000;
        if (i == 0) {
            klineBaseData = (Math.random() * 20000).toFixed(4) - 0;
        } else {
            klineBaseData = (Math.random() > (i > len / 2 ? 0.3 : 0.4) ? klineBaseData * 1.1 : klineBaseData * 0.85);
        }
        klineData.push(getOneKlineData(time, klineBaseData));
    }
}

// 生产最新的一条kline数据
function updateKlineData() {
    if (klineData.length != 0) {
        klineData.splice(0, 1);
        const currTime = (+new Date(formatTime(new Date(), 'yyyy/MM/dd hh:mm') + ':00'));
        klineBaseData = (Math.random() > 0.3 ? klineBaseData * 1.1 : klineBaseData * 0.85);
        klineData.push(getOneKlineData(currTime, klineBaseData));
    }
}

module.exports = app => {
    return async (ctx, next) => {
        const { app, socket } = ctx;
        const id = socket.id;
        console.log('socket connection................................', id);
        const nsp = app.io.of('/');
        socket.join(room);

        if (!app.socketsTimer) {
            app.sockets = [socket];
            app.socketsTimer = setInterval(() => {
                app.sockets.forEach(s => {
                    s.emit('deal-data', getRealTimeDealData());
                    s.emit('transaction-data', getRealTimeTransactionData());
                    s.emit('stock-data', getRealTimeStockData());
                    if (formatTime(new Date(), 'mm') - formatTime(new Date(klineData[klineData.length - 1][0]), 'mm') == klineType) {
                        updateKlineData();
                        socket.emit('update-kline-data', klineData[klineData.length - 1])
                    }
                })
            }, 5000)
        } else {
            app.sockets.push(socket);
        }
        socket.emit('deal-data', getRealTimeDealData());
        socket.emit('transaction-data', getRealTimeTransactionData());
        socket.emit('stock-data', getRealTimeStockData());
        if (klineData.length == 0) {
            initKlineData()
        }
        socket.emit('init-kline-data', klineData);
        socket.on('change-kline-type', (payload) => {
            // console.log('change-kline-type server', payload)
            klineType = payload
            initKlineData() // 重新发送整个图表数据
            socket.emit('init-kline-data', klineData);
        })
        await next();
        // execute when disconnect.
        console.log('disconnection.............................');
        for (let i = 0; i < app.sockets.length; i++) {
            if (app.sockets[i].id == socket.id) {
                app.sockets.splice(i, 1);
                break;
            }
        }
        if (app.sockets.length == 0) {
            clearInterval(app.socketsTimer);
            app.socketsTimer = null;
        }
    };
};