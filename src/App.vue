<style lang="scss">
    @import "./style/common/common.scss";
</style>
<template>
    <div id="app">
        <div class="row-wrap">
            <MainChart :data="klineData" :info="stockData"></MainChart>
            <RealtimeDeal :data="dealData"></RealtimeDeal>
        </div>
        <div class="row-wrap">
            <UserTransactionZone></UserTransactionZone>
            <RealtimeTransaction :data="transactionData"></RealtimeTransaction>
        </div>
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
                stockData: {}
            }
        },
        created() {
            const socket = io('ws://localhost:7001/')
            const that = this
            that.socket = socket
            socket.on('connect', () => {
                console.log('socket connect ....', socket.id)
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
                console.log('update-kline-data', JSON.stringify(payload))
                that.klineData.shift()
                that.klineData.push(payload)
            })
        },
        methods: {

        },
        beforeDestroy() {
            this.socket.close()
        }
    }
</script>
