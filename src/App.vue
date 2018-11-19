<style lang="scss">
    @import "./style/common/common.scss";
</style>
<template>
    <div id="app">
        <div class="row-wrap">
            <MainChart :kline-type="klineType" :line-data="klineData" :info="stockData" @change="doChangeKlineType"></MainChart>
            <RealtimeDeal :data="dealData"></RealtimeDeal>
        </div>
        <div class="row-wrap">
            <UserTransactionZone></UserTransactionZone>
            <RealtimeTransaction :data="transactionData"></RealtimeTransaction>
        </div>
        <div class="mask hide" ref="mask">{{ tip[connectType] }}</div>
    </div>
</template>

<script>
    import MainChart from '@/view/MainChart'
    import RealtimeTransaction from '@/view/RealtimeTransaction'
    import UserTransactionZone from '@/view/UserTransactionZone'
    import RealtimeDeal from '@/view/RealtimeDeal'
    import io from 'socket.io-client'

    export default {
        name: 'app',
        components: {
            MainChart, RealtimeTransaction, UserTransactionZone, RealtimeDeal
        },
        data() {
            return {
                dealData: { sellDataList: [], buyDataList: [], buyRatio: '', sellRatio: '' },
                transactionData: [],
                socket: null,
                klineData: [],
                stockData: {},
                klineType: 1,
                connectType: 2, // 0-- 连接中 1--已连接/重连成功  2--连接中断  3--连接失败/重连失败 4--重新连接中
                tip: ['与服务器数据连接中，请稍后...', '与服务器数据连接成功！', '与服务器数据连接似乎已中断...', '与服务器数据连接失败...', '与服务器数据连接中，请稍后...']
            }
        },
        mounted() {
            const that = this
            that.$nextTick(() => {
                that.initSocket()
            })
        },
        methods: {
            initSocket() {
                const that = this
                that.connectType = 0
                that.showMask()
                const socket = io('ws://localhost:7001/')
                that.socket = socket
                socket.on('reconnecting', () => {
                    that.connectType = 0
                    that.showMask()
                })
                socket.on('connect', () => {
                    // console.log('socket connect ....', socket.id)
                    that.connectType = 1
                    setTimeout(() => {
                        that.hideMask()
                    }, 350)
                })
                socket.on('reconnect', () => {
                    // console.log('socket connect ....', socket.id)
                    that.connectType = 1
                    setTimeout(() => {
                        that.hideMask()
                    }, 350)
                })
                socket.on('disconnect', () => {
                    that.connectType = 2
                    that.showMask()
                })
                socket.on('connect_failed', () => {
                    that.connectType = 3
                    that.showMask()
                })
                socket.on('reconnect_failed', () => {
                    that.connectType = 3
                    that.showMask()
                })
                socket.on('reconnecting', () => {
                    that.connectType = 4
                    that.showMask()
                })
                socket.on('deal-data', payload => {
                    const dealData = that.dealData
                    dealData.sellDataList = payload.sellDataList
                    dealData.buyDataList = payload.buyDataList
                    dealData.buyRatio = payload.buyRatio
                    dealData.sellRatio = payload.sellRatio
                })
                socket.on('transaction-data', payload => {
                    that.transactionData = payload
                })
                socket.on('init-kline-data', payload => {
                    // console.log('init-kline-data', payload)
                    that.klineData = payload
                })
                socket.on('stock-data', payload => {
                    // console.log('stock-data', payload)
                    that.stockData = payload
                })
                socket.on('update-kline-data', payload => {
                    // console.log('update-kline-data', JSON.stringify(payload))
                    that.klineData.shift()
                    that.klineData.push(payload)
                })
            },
            doChangeKlineType(type) {
                // console.log('doChangeKlineType：', type)
                const that = this
                that.klineType = type
                that.socket.emit('change-kline-type', type)
            },
            showMask() {
                const that = this
                const mask = that.$refs.mask
                mask.classList.remove('hide')
                setTimeout(() => {
                    mask.classList.add('show')
                }, 300)
            },
            hideMask() {
                const that = this
                const mask = that.$refs.mask
                mask.classList.remove('show')
                setTimeout(() => {
                    mask.classList.add('hide')
                }, 400)
            }
        },
        beforeDestroy() {
            this.socket.close()
        }
    }
</script>
