<template>
    <div class="real-time-deal panel">
        <div class="panel-header">
            <ul class="tab">
                <li class="active">全部</li>
                <li>买盘</li>
                <li>卖盘</li>
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
                <ul class="data-list">
                    <li class="data-list-row">
                        <div class="center down">卖5</div>
                        <div class="center">6655.2322</div>
                        <div class="center">0.3789</div>
                        <div class="right">0.6369</div>
                    </li>
                    <li class="data-list-row">
                        <div class="center down">卖5</div>
                        <div class="center">6655.2322</div>
                        <div class="center">0.3789</div>
                        <div class="right">0.6369</div>
                    </li>
                </ul>
                <div class="data-list-row"><strong>6450.233</strong>≈ 25444 CNY</div>
                <ul class="data-list">
                    <li class="data-list-row">
                        <div class="center down">卖5</div>
                        <div class="center">6655.2322</div>
                        <div class="center">0.3789</div>
                        <div class="right">0.6369</div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {

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
            margin-right: 20px;
          }
        }
      }
    }
</style>
