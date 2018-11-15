<template>
    <div class="user-transaction-zone panel">
        <div class="panel-header">
            <ul class="tab">
                <li @click="switchTab(0)" :class="{active: selectedTab==0}">限价交易</li>
                <li @click="switchTab(1)" :class="{active: selectedTab==1}">市价交易</li>
            </ul>
        </div>
        <div class="panel-content">
            <div class="transaction-zone left">
                <div class="can-use"><span>可用: 0.00000000 USDT</span><a>充币</a></div>
                <div class="user-input"><input type="text" maxlength="20" :readonly="selectedTab==1" v-model="buyAmount" /> <span>USDT</span></div>
                <div class="change-result" :style="{ visibility: selectedTab==0 ? '' : 'hidden'}">≈ 3038.91 CNY</div>
                <div class="amount-input"><input type="text" maxlength="20" /><span>BCH</span></div>
                <ul class="percent-list">
                    <li @click="switchPercent(1,1)" :class="{active: percent1==1}">25%</li>
                    <li @click="switchPercent(1,2)" :class="{active: percent1==2}">50%</li>
                    <li @click="switchPercent(1,3)" :class="{active: percent1==3}">75%</li>
                    <li @click="switchPercent(1,4)" :class="{active: percent1==4}">100%</li>
                </ul>
                <div class="transaction-amount">交易额<span>0.000000 USDT</span></div>
                <button class="buy-btn">买入 BCH</button>
            </div>
            <div class="transaction-zone right">
                <div class="can-use"><span>可用: 0.00000000 USDT</span><a>充币</a></div>
                <div class="user-input"><input type="text" maxlength="20" :readonly="selectedTab==1" v-model="sellAmount" /> <span>USDT</span></div>
                <div class="change-result" :style="{ visibility: selectedTab==0 ? '' : 'hidden'}">≈ 3038.91 CNY</div>
                <div class="amount-input"><input type="text" maxlength="20" /><span>BCH</span></div>
                <ul class="percent-list">
                    <li @click="switchPercent(2,1)" :class="{active: percent2==1}">25%</li>
                    <li @click="switchPercent(2,2)" :class="{active: percent2==2}">50%</li>
                    <li @click="switchPercent(2,3)" :class="{active: percent2==3}">75%</li>
                    <li @click="switchPercent(2,4)" :class="{active: percent2==4}">100%</li>
                </ul>
                <div class="transaction-amount">交易额<span>0.000000 USDT</span></div>
                <button class="sell-btn">卖出 BCH</button>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                selectedTab: 0, // 0--限价交易  1--市价交易
                percent1: 1, // 1--25% 2--50%
                percent2: 1, // 1--25% 2--50%
                sellAmount: '',
                buyAmount: ''
            }
        },
        methods: {
            switchTab(tab) {
                this.selectedTab = tab
                if (tab === 1) {
                    this.sellAmount = '以市场最优价卖出'
                    this.buyAmount = '以市场最优价买入'
                } else {
                    this.sellAmount = ''
                    this.buyAmount = ''
                }
            },
            switchPercent(tab, p) {
                this['percent' + tab] = p
            }
        }
    }
</script>
<style lang="scss">
    .user-transaction-zone {
      .panel-content {
        display: flex;
        padding: 12px 18px;
        font-size: 14px;
        > div {
          flex: 1;
          &.left {
            margin-right: 20px;
          }
        }
      }

      .can-use {
        display: flex;
        line-height: 50px;
        > span {
          flex: 1;
          color: #555e70;
        }
        > a {
          cursor: pointer;
          color: #bac1da;
          &:hover {
            color: #fff;
          }
        }
      }

      .user-input,
      .amount-input {
        position: relative;
        background-color: #1d222b;
        border: 1px solid #2e3c54;
        border-radius: 4px;
        > input {
          padding: 11px 10px;
          width: 100%;
          box-sizing: border-box;
          background: transparent;
          border: none;
          color: #bac1da;
        }
        > span {
          position: absolute;
          right: 24px;
          top: 10px;
        }
      }

      .change-result {
        font-size: 12px;
        background-color: #262c38;
        border-radius: 4px;
        padding: 4px 10px;
        margin-top: 6px;
        color: #bac1da;
      }

      .amount-input {
        margin-top: 24px;
      }

      .percent-list {
        display: flex;
        justify-content: space-between;
        margin-top: 25px;
        > li {
          flex: 1;
          text-align: center;
          background-color: #1c2029;
          color: #555e70;
          cursor: pointer;
          margin-right: 8px;
          line-height: 30px;
          border: 1px solid #1c2029;
          transition: all 0.3s;
          &:last-child {
            margin-right: 0;
          }
          &.active,
          &:hover {
            color: #ffae36;
            border-color: #ffae36;
          }
        }
      }

      .transaction-amount {
        margin-top: 16px;
        margin-bottom: 14px;
        > span {
          margin-left: 30px;
          color: #bac1da;
        }
      }

      .buy-btn,
      .sell-btn {
        height: 45px;
        line-height: 45px;
        border-radius: 4px;
        text-align: center;
        color: #fff;
        width: 100%;
        font-size: 16px;
        transition: all 0.3s;
        cursor: pointer;
      }

      .buy-btn {
        background: rgba(20, 194, 133, 0.8);
        &:hover {
          background: rgba(20, 194, 133, 1);
        }
      }
      .sell-btn {
        background: rgba(199, 48, 73, 0.8);
        &:hover {
          background: rgba(199, 48, 73, 1);
        }
      }
    }
</style>
