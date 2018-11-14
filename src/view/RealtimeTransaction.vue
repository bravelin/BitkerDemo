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
                <ul class="data-list">
                    <li class="data-list-row">
                        <div class="center">15:47:11</div>
                        <div class="center down">卖出</div>
                        <div class="center">5822.36</div>
                        <div class="right">0.15552</div>
                    </li>
                    <li class="data-list-row">
                        <div class="center">15:47:11</div>
                        <div class="center up">买入</div>
                        <div class="center">5822.36</div>
                        <div class="right">0.15552</div>
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
    .real-time-transaction {
      .data-list-row {
        > div {
          &:nth-of-type(1) {
            flex: none;
            width: 58px;
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
