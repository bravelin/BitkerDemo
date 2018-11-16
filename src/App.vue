<style lang="scss">
    @import "./style/common/common.scss";
</style>
<template>
    <div id="app">
        <div class="row-wrap">
            <MainChart></MainChart>
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
                socket: null
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
                that.dealData.sellDataList = payload.sellDataList
                that.dealData.buyDataList = payload.buyDataList
                that.dealData.buyRatio = payload.buyRatio
                that.dealData.sellRatio = payload.sellRatio
            })
            socket.on('transaction-data', payload => {
                that.transactionData = payload
            })
        },
        methods: {

        },
        beforeDestroy() {
            this.socket.close()
        }
    }
</script>
