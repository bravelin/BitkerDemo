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
                })
            }, 10000)
        } else {
            app.sockets.push(socket);
        }
        socket.emit('deal-data', getRealTimeDealData());
        socket.emit('transaction-data', getRealTimeTransactionData());
        await next();
        // execute when disconnect.
        console.log('disconnection!');
        for(let i = 0; i < app.sockets.length; i++) {
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