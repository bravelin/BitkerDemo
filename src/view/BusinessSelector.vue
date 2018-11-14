<template>
    <div class="business-selector panel">
        <div class="panel-header">
            选择交易对
            <div class="search-input"><input type="text" maxlength="30" /></div>
        </div>
        <ul class="selector-list">
            <li>自选</li>
            <li class="active">USDT</li>
            <li>ETH</li>
            <li>BTC</li>
        </ul>
        <div class="panel-content">
            <div class="data-list-header data-list-row">
                <div class="left">币种</div>
                <div class="center">最新价</div>
                <div class="right">涨跌</div>
            </div>
            <div class="data-list-row wrap-title">
                <span>主区</span>
                <div></div>
            </div>
            <div class="data-list-wrap">
                <ul class="data-list">
                    <li class="data-list-row">
                        <div class="left bold collect">BTC</div>
                        <div class="center">43769.222</div>
                        <div class="right up">3.05%</div>
                    </li>
                    <li class="data-list-row">
                        <div class="left bold collect">BTC</div>
                        <div class="center">43769.222</div>
                        <div class="right up">3.05%</div>
                    </li>
                    <li class="data-list-row">
                        <div class="left bold collect">BTC</div>
                        <div class="center">43769.222</div>
                        <div class="right down">-3.05%</div>
                    </li>
                    <li class="data-list-row">
                        <div class="left bold collect">BTC</div>
                        <div class="center">43769.222</div>
                        <div class="right up">3.05%</div>
                    </li>
                </ul>
            </div>
            <div class="data-list-row wrap-title">
                <span>PLUS区</span>
                <div class="active"></div>
            </div>
            <div class="data-list-wrap">
                <ul class="data-list">
                    <li class="data-list-row">
                        <div class="left bold collect">BTC</div>
                        <div class="center">43769.222</div>
                        <div class="right up">3.05%</div>
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
<style lang="scss" scoped>
    .selector-list {
      display: flex;
      flex-direction: row;
      height: 40px;
      line-height: 40px;
      padding-left: 7px;
      font-size: 14px;
      background-color: #1c2029;
      color: rgb(199, 204, 223);
      cursor: pointer;
      li.active {
        color: rgb(255, 174, 54);
      }
      li {
        padding: 0 10px;
        border-radius: 4px;
        transition: all 0.3s;
        &:hover {
          background: #0c0d0f;
        }
      }
    }
    .panel-header {
      position: relative;
    }
    .search-input {
      position: absolute;
      right: 20px;
      top: 0px;
      &:after {
        position: absolute;
        top: 50%;
        right: 6px;
        margin-top: -8px;
        content: "";
        width: 16px;
        height: 16px;
        background: url("../assets/search.png");
      }
      input {
        width: 154px;
        height: 27px;
        padding-right: 30px;
        border-radius: 4px;
        background-color: #1c2029;
        text-indent: 6px;
        font-size: 14px;
        color: #bac1da;
        border-color: #333;
      }
    }
    .wrap-title {
      align-items: center;
      &:before {
        content: "";
        display: block;
        width: 3px;
        height: 15px;
        margin-right: 5px;
        background: #858ca3;
      }
      > span {
        flex: 1;
      }
      > div {
        position: relative;
        width: 24px;
        height: 24px;
        flex: none;
        cursor: pointer;
        transition: all 0.3s;
        border-radius: 4px;
        &:hover {
          background: #0c0d0f;
        }
        &:before {
          content: "";
          display: block;
          position: absolute;
          width: 8px;
          height: 8px;
          left: 7px;
          top: 8px;
          border-left: 1px solid #aaa;
          border-bottom: 1px solid #aaa;
          transform: rotate(135deg);
          transition: all ease-out 0.3s;
        }
        &.active {
          &:before {
            top: 4px;
            transform: rotate(-45deg);
          }
        }
      }
    }
</style>
