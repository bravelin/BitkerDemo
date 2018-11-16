<template>
    <div class="real-time-transaction panel">
        <div class="panel-header">实时成交</div>
        <div class="panel-content">
            <div class="data-list-header data-list-row">
                <div class="center">成交时间</div>
                <div class="center">方向</div>
                <div class="center">价格(USDT)</div>
                <div class="right">数量(BTC)</div>
            </div>
            <div class="data-list-wrap">
                <vue-scroll :ops="scrollOptions">
                    <ul class="data-list">
                        <li class="data-list-row" v-for="item in data" :key="item.id">
                            <div class="center">{{ item.time }}</div>
                            <div class="center" :class="{ down: item.tag==1, up: item.tag == -1 }">{{ item.tag > 0 ? '卖出' : '买入' }}</div>
                            <div class="center">{{ item.price }}</div>
                            <div class="right">{{ item.amount }}</div>
                        </li>
                    </ul>
                </vue-scroll>
            </div>
        </div>
    </div>
</template>
<script>
    import { formatTime } from '@/lib/util'
    export default {
        props: {
            data: {
                type: Array,
                required: true,
                default() {
                    return []
                }
            }
        },
        data() {
            return {
                scrollOptions: {
                    bar: {
                        background: '#0c0d0f'
                    }
                }
            }
        },
        created() {
            // const that = this
            // const list = []
            // const startTime = (+new Date())
            // for (let i = 0; i < 50; i++) {
            //     list.push({
            //         id: i,
            //         time: formatTime(new Date(startTime + i * 1000), 'hh:mm:ss'),
            //         tag: Math.random() > 0.5 ? -1 : 1, // -1 买入, 1卖出
            //         price: (Math.random() * 1000).toFixed(4),
            //         amount: (Math.random()).toFixed(3)
            //     })
            // }
            // list.reverse() // 逆序
            // that.dataList = list
        }
    }
</script>
<style lang="scss">
    .real-time-transaction {
      .data-list-wrap {
        height: 343px;
      }
      .data-list-row {
        > div {
          &:nth-of-type(1) {
            flex: none;
            width: 58px;
            margin-right: 30px;
          }
          &:nth-of-type(2) {
            flex: none;
            width: 100px;
            margin-right: 10px;
          }
        }
      }
    }
</style>
