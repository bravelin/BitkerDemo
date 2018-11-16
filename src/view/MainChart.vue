<template>
    <div class="main-chart panel">
        <div class="panel-header">
            <span>BTC/USDT</span>
            <div>
                <p>5690.4402 <span>≈ 38822.91CNY</span></p>
                <div>
                    <div>24h涨跌</div>
                    <div class="down">-0.69%</div>
                </div>
                <div>
                    <div>24h最高价</div>
                    <div>5793.4165</div>
                </div>
                <div>
                    <div>24h最低价</div>
                    <div>5411.5453</div>
                </div>
                <div>
                    <div>24h成交量</div>
                    <div>26574 BTC</div>
                </div>
            </div>
        </div>
        <div class="panel-content">
            <div class="time-list">
                <ul>
                    <li class="active">1分钟</li>
                    <li>5分钟</li>
                    <li>15分钟</li>
                    <li>30分钟</li>
                </ul>
            </div>
            <div class="chart-container"></div>
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
.main-chart .panel-header{
    display: flex;
    flex-direction: row;
    >span{
        flex: none;
        display: block;
        width: 110px;
    }
    >div{
        display: flex;
        flex-direction: row;
        flex: 1;
        >p{
            flex: 1.6;
            >span{
                font-size: 13px;
                color: #555e70;
            }
        }
        >div{
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            >div{
                line-height: 18px;
                &:nth-of-type(1){
                    font-size: 12px;
                    color: #555e70;
                    margin-bottom: 2px;
                }
                &:nth-of-type(2){
                    font-size: 13px;
                    color: rgb(186, 193, 218);
                    &.down{
                        color: #dd3451;
                    }
                    &.up{
                        color: #14c285;
                    }
                }
            }
        }
    }
}

.main-chart .time-list{
    color: #4a4a4a;
    font-size: 12px;
    padding: 8px 15px;
    >ul{
        display: flex;
        flex-direction: row;
        >li{
            width: 55px;
            line-height: 30px;
            text-align: center;
            margin-right: 12px;
            cursor: pointer;
            transition: all 0.3s;
            &.active{
                background: #292D38;
                color: #BAC1DA;
            }
            &:hover{
                background: #292D38;
                color: #BAC1DA;
            }
        }
    }
}

.main-chart .chart-container{
    background: #000;
    height: 470px;
    margin: 0 15px 15px;
}
</style>
