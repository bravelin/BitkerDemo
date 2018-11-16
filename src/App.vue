<style lang="scss">
    @import "./style/common/common.scss";
</style>
<template>
    <div id="app">
        <div class="row-wrap">
            <MainChart></MainChart>
            <RealtimeDeal></RealtimeDeal>
        </div>
        <div class="row-wrap">
            <UserTransactionZone></UserTransactionZone>
            <RealtimeTransaction></RealtimeTransaction>
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
                transactionData: []
            }
        },
        created() {
            const socket = io('ws://localhost:7001/')
            console.log('created', +new Date())
            socket.on('connect', () => {
                console.log('socket connect ....', socket.id)
                socket.on('deal-data', msg => {
                    console.log((+new Date()) + ' 接收到消息deal-data', msg)
                })
                socket.on('transaction-data', msg => {
                    console.log((+new Date()) + '接收到消息transaction-data', msg)
                })
            })
        },
        methods: {

        },
        beforeDestroy() {

        }
    }
</script>
