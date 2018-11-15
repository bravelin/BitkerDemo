'use strict';
const room = 'default-room'
module.exports = app => {
    return async (ctx, next) => {
        console.log('connection................................')
        ctx.socket.join(room);
        ctx.app.io.of('/').to(room).emit('online', { msg: 'welcome', id: ctx.socket.id });
        await next();
        // execute when disconnect.
        console.log('disconnection!');
    };
};