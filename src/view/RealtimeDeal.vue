<template>
    <div class="real-time-deal panel">
        <div class="panel-header">
            <ul class="tab">
                <li :class="{ active: selectedTab==0 }" @click="switchTab(0)">全部</li>
                <li :class="{ active: selectedTab==1 }" @click="switchTab(1)">买盘</li>
                <li :class="{ active: selectedTab==2 }" @click="switchTab(2)">卖盘</li>
            </ul>
        </div>
        <div class="panel-content">
            <div class="data-list-header data-list-row">
                <div class="center">盘口</div>
                <div class="center">价格(USDT)</div>
                <div class="center">数量(BTC)</div>
                <div class="right">累计(BTC)</div>
            </div>
            <div class="data-list-wrap">
                <ul class="data-list" v-show="selectedTab!=1">
                    <li class="data-list-row" v-for="item in data.sellDataList" :key="item.id">
                        <div class="center down">卖{{ item.id }}</div>
                        <div class="center">{{ item.price }}</div>
                        <div class="center">{{ item.amount }}</div>
                        <div class="right">{{ item.totalAmount }}</div>
                    </li>
                </ul>
                <div class="data-list-row"><strong>{{ data.buyRatio }}</strong>≈ {{ data.sellRatio }} CNY</div>
                <ul class="data-list" v-show="selectedTab!=2">
                    <li class="data-list-row" v-for="item in data.buyDataList" :key="item.id">
                        <div class="center up">买{{ item.id }}</div>
                        <div class="center">{{ item.price }}</div>
                        <div class="center">{{ item.amount }}</div>
                        <div class="right">{{ item.totalAmount }}</div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        props: {
            data: {
                type: Object,
                required: true,
                default() {
                    return {
                        buyDataList: [], // 买盘
                        sellDataList: [], // 卖盘
                        buyRatio: (Math.random() * 10000).toFixed(3),
                        sellRatio: (Math.random() * 100000).toFixed(0)
                    }
                }
            }
        },
        data() {
            return {
                selectedTab: 0 // 0--全部 1--买盘  2--卖盘
                // buyDataList: [], // 买盘
                // sellDataList: [], // 卖盘
                // buyRatio: (Math.random() * 10000).toFixed(3),
                // sellRatio: (Math.random() * 100000).toFixed(0)
            }
        },
        created() {
            // const that = this
            // // sellDataList
            // const sellDataList = []
            // for (let i = 5; i > 0; i--) {
            //     sellDataList.push({
            //         id: i,
            //         price: (Math.random() * 1000).toFixed(4),
            //         amount: (Math.random()).toFixed(3)
            //     })
            // }
            // sellDataList.forEach(item => {
            //     item.totalAmount = ((item.amount - 0) + Math.random()).toFixed(3)
            // })
            // that.sellDataList = sellDataList

            // // buyDataList
            // const buyDataList = []
            // for (let i = 1; i <= 5; i++) {
            //     buyDataList.push({
            //         id: i,
            //         price: (Math.random() * 1000).toFixed(4),
            //         amount: (Math.random()).toFixed(3)
            //     })
            // }
            // buyDataList.forEach(item => {
            //     item.totalAmount = ((item.amount - 0) + Math.random()).toFixed(3)
            // })
            // that.buyDataList = buyDataList
        },
        methods: {
            switchTab(tab) {
                this.selectedTab = tab
            }
        }
    }
</script>
<style lang="scss">
    .real-time-deal {
      .data-list-row {
        > div {
          &:nth-of-type(1) {
            flex: none;
            width: 30px;
            margin-right: 30px;
          }
          &:nth-of-type(2) {
            flex: none;
            width: 100px;
            margin-right: 20px;
          }
        }
      }
    }
</style>
