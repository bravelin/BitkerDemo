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
            const socket = io('http://localhost:7001/')
            socket.on('connect', () => {
                console.log('socket connect ...............', socket.id)
            })
        },
        methods: {

        },
        beforeDestroy() {

        }
    }
</script>
