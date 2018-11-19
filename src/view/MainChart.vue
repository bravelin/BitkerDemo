<template>
    <div class="main-chart panel">
        <div class="panel-header">
            <span>BTC/USDT</span>
            <div>
                <p>{{ info.ratio1 }} <span>≈ {{ info.ratio2 }}CNY</span></p>
                <div>
                    <div>24h涨跌</div>
                    <div :class="{ down: info.upDown<0, up: info.upDown>0 }">{{ info.upDown }}%</div>
                </div>
                <div>
                    <div>24h最高价</div>
                    <div>{{ info.highest }}</div>
                </div>
                <div>
                    <div>24h最低价</div>
                    <div>{{ info.lowest }}</div>
                </div>
                <div>
                    <div>24h成交量</div>
                    <div>{{ info.volume }}BTC</div>
                </div>
            </div>
        </div>
        <div class="panel-content">
            <div class="time-list">
                <ul>
                    <li :class="{ active: klineType==1 }" @click="changeType(1)">1分钟</li>
                    <li :class="{ active: klineType==5 }" @click="changeType(5)">5分钟</li>
                </ul>
            </div>
            <div class="chart-container" ref="chart"></div>
        </div>
    </div>
</template>
<script>
    import { formatTime } from '@/lib/util'
    export default {
        props: {
            klineType: {
                type: Number,
                required: true,
                default: 1
            },
            lineData: {
                type: Array,
                required: true,
                default() {
                    return []
                }
            },
            info: {
                type: Object,
                required: true,
                default() {
                    return {
                        ratio1: 0,
                        ratio2: 0,
                        upDown: 0,
                        highest: 0,
                        lowest: 0,
                        volume: 0
                    }
                }
            }
        },
        watch: {
            lineData() { // 监听klineData的改变
                const that = this
                if (!that.hasLoadedData) {
                    that.hasLoadedData = true
                    if (that.hasMounted && !that.chartInstance) {
                        that.initChart(that.lineData)
                    }
                } else if (that.chartInstance) {
                    if (that.klineType === that.kline.type) {
                        that.refreshChart() // 单条数据改变，刷新图表
                    } else {
                        that.refreshAll() // 全部数据改变
                    }
                }
            }
        },
        data() {
            return {
                chartInstance: null,
                hasLoadedData: false,
                hasMounted: false,
                kline: {
                    type: 1,
                    categoryData: [],
                    values: [],
                    volume1: [],
                    volume2: []
                }
            }
        },
        mounted() {
            const that = this
            that.$nextTick(() => {
                that.hasMounted = true
                if (that.hasLoadedData && !that.chartInstance) {
                    that.initChart(that.lineData)
                }
            })
        },
        methods: {
            initChart(rawData) {
                const that = this
                const upColor = '#3D8560'
                const downColor = '#97403A'
                that.splitData(rawData)
                const kline = that.kline
                that.chartInstance = that.$echarts.init(that.$refs.chart)

                that.chartInstance.setOption({
                    animation: false,
                    grid: [
                        {
                            left: '30px',
                            right: '60px',
                            top: '20px',
                            height: '71%'
                        },
                        {
                            left: '30px',
                            right: '60px',
                            top: '75%',
                            height: '17.0%'
                        }
                    ],
                    axisPointer: {
                        link: { xAxisIndex: 'all' },
                        label: {
                            backgroundColor: '#333'
                        }
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross'
                        },
                        backgroundColor: 'rgba(245, 245, 245, 0)',
                        borderWidth: 0,
                        borderColor: 'rgba(0,0,0,0)',
                        padding: 2,
                        textStyle: {
                            color: '#aaa'
                        },
                        position: [10, 10],
                        // alwaysShowContent: true,
                        formatter(p) {
                            if (p[0].componentSubType === 'candlestick') {
                                const param = p[0].data
                                const cls = param[2] > param[1] ? 'up' : ''
                                const volume = p[2].data || p[3].data
                                return `<div class="chart-tip ${cls}">开：<span>${param[1]}</span>收：<span>${param[2]}</span>低：<span>${param[3]}</span>高：<span>${param[4]}</span>成交：<span>${volume}</span></div>`
                            } else {
                                return ''
                            }
                        }
                    },
                    toolbox: {
                        show: false
                    },
                    brush: {
                        xAxisIndex: 'all',
                        brushLink: 'all',
                        outOfBrush: {
                            colorAlpha: 0.1
                        }
                    },
                    visualMap: {
                        show: false,
                        seriesIndex: 5,
                        dimension: 2,
                        pieces: [{
                            value: 1,
                            color: downColor
                        }, {
                            value: -1,
                            color: upColor
                        }]
                    },
                    xAxis: [
                        {
                            type: 'category',
                            data: kline.categoryData,
                            scale: true,
                            boundaryGap: false,
                            splitLine: {
                                show: true,
                                lineStyle: {
                                    width: 0.5,
                                    color: '#191f2b',
                                    opacity: 1
                                }
                            },
                            splitNumber: 10,
                            min: 'dataMin',
                            max: 'dataMax',
                            axisPointer: {
                                z: 100,
                                label: {
                                    show: false
                                }
                            },
                            axisLine: {
                                onZero: false,
                                show: false
                            },
                            axisTick: { show: false },
                            axisLabel: { show: false }
                        },
                        {
                            type: 'category',
                            gridIndex: 1,
                            data: kline.categoryData,
                            scale: true,
                            boundaryGap: false,
                            axisLine: {
                                onZero: false,
                                lineStyle: {
                                    color: '#191f2b'
                                }
                            },
                            splitLine: {
                                show: false
                            },
                            axisLabel: {
                                show: true,
                                color: '#333',
                                fontSize: 10
                            },
                            splitNumber: 20,
                            min: 'dataMin',
                            max: 'dataMax'
                        }
                    ],
                    yAxis: [
                        {
                            position: 'right',
                            scale: true,
                            splitArea: {
                                show: false
                            },
                            axisLabel: {
                                showMinLabel: false
                            },
                            axisLine: {
                                lineStyle: {
                                    color: '#191f2b'
                                }
                            },
                            splitLine: {
                                show: true,
                                lineStyle: {
                                    width: 0.5,
                                    color: '#191f2b',
                                    opacity: 1
                                }
                            }
                        },
                        {
                            scale: true,
                            position: 'right',
                            gridIndex: 1,
                            splitNumber: 2,
                            axisLabel: { show: true },
                            axisLine: {
                                show: true,
                                lineStyle: {
                                    color: '#191f2b'
                                }
                            },
                            axisTick: { show: true },
                            splitLine: { show: false }
                        }
                    ],
                    // dataZoom: [
                    //     {
                    //         show: false,
                    //         type: 'inside',
                    //         xAxisIndex: [0, 1],
                    //         start: 0,
                    //         end: 100
                    //     },
                    //     {
                    //         show: false,
                    //         xAxisIndex: [0, 1],
                    //         type: 'slider',
                    //         top: '85%',
                    //         start: 0,
                    //         end: 100
                    //     }
                    // ],
                    series: [
                        {
                            name: 'index',
                            type: 'candlestick',
                            data: kline.values,
                            itemStyle: {
                                normal: {
                                    color: upColor,
                                    color0: downColor,
                                    borderColor: null,
                                    borderColor0: null
                                }
                            }
                        },
                        {
                            name: 'MA1',
                            type: 'line',
                            data: that.calculateMA(1),
                            smooth: true,
                            lineStyle: {
                                normal: { opacity: 0.5 }
                            }
                        },
                        {
                            name: 'Volume1',
                            type: 'bar',
                            xAxisIndex: 1,
                            yAxisIndex: 1,
                            data: kline.volume1,
                            itemStyle: {
                                color: '#61080A',
                                opacity: 0.9
                            },
                            barGap: '-100%'
                        },
                        {
                            name: 'Volume2',
                            type: 'bar',
                            xAxisIndex: 1,
                            yAxisIndex: 1,
                            data: kline.volume2,
                            itemStyle: {
                                color: '#08350C',
                                opacity: 0.9
                            }
                        }
                    ]
                }, true)

                that.chartInstance.dispatchAction({
                    type: 'showTip',
                    seriesIndex: 0,
                    dataIndex: that.kline.values.length - 1
                })
                // 宽度自适应
                window.addEventListener('resize', () => {
                    that.chartInstance.resize()
                })
                kline.type = that.klineType
            },
            // 用新数据刷新图表
            refreshChart() {
                const that = this
                let newData = [...that.lineData[that.lineData.length - 1]]
                if (newData.length < 6) {
                    return
                }
                const kline = that.kline
                let time = newData.splice(0, 1)[0]
                let timeStr = formatTime(new Date(time), 'hh:mm')
                kline.categoryData.push(timeStr)
                kline.values.push(newData)
                let volume1Value = 0
                let volume2Value = 0
                if (newData[0] > newData[1]) {
                    kline.volume1.push(newData[4])
                    kline.volume2.push(0)
                    volume1Value = newData[4]
                } else {
                    kline.volume2.push(newData[4])
                    kline.volume1.push(0)
                    volume2Value = newData[4]
                }
                const option = that.chartInstance.getOption()
                option.xAxis[0].data.push(timeStr)
                option.xAxis[1].data.push(timeStr)
                option.series[0].data.push(newData)
                option.series[1].data = that.calculateMA(1)
                option.series[2].data.push(volume1Value)
                option.series[3].data.push(volume2Value)
                that.chartInstance.setOption(option) // do refresh
            },
            refreshAll() {
                const that = this
                const kline = that.kline
                kline.categoryData = []
                kline.values = []
                kline.volume1 = []
                kline.volume2 = []
                that.splitData(that.lineData)
                const option = that.chartInstance.getOption()

                option.xAxis[0].data = kline.categoryData
                option.xAxis[1].data = kline.categoryData
                option.series[0].data = kline.values
                option.series[1].data = that.calculateMA(1)
                option.series[2].data = kline.volume1
                option.series[3].data = kline.volume2
                that.chartInstance.setOption(option) // do refresh
                that.kline.type = that.klineType
            },
            splitData(rawData) {
                const that = this
                let time = ''
                const kline = that.kline
                for (let i = 0; i < rawData.length; i++) {
                    time = rawData[i].splice(0, 1)[0]
                    kline.categoryData.push(formatTime(new Date(time), 'hh:mm'))
                    kline.values.push(rawData[i])
                    if (rawData[i][0] > rawData[i][1]) {
                        kline.volume1.push(rawData[i][4])
                        kline.volume2.push(0)
                    } else {
                        kline.volume2.push(rawData[i][4])
                        kline.volume1.push(0)
                    }
                }
            },
            changeType(type) {
                const that = this
                if (that.klineType !== type) {
                    that.$emit('change', type)
                }
            },
            calculateMA(count) {
                let result = []
                const that = this
                for (let i = 0, len = that.kline.values.length; i < len; i++) {
                    if (i < count) {
                        result.push('-')
                        continue
                    }
                    let sum = 0
                    for (let j = 0; j < count; j++) {
                        sum += that.kline.values[i - j][1]
                    }
                    result.push(+(sum / count).toFixed(3))
                }
                return result
            }
        }
    }
</script>
<style lang="scss">
    .main-chart .panel-header {
      display: flex;
      flex-direction: row;
      > span {
        flex: none;
        display: block;
        width: 110px;
      }
      > div {
        display: flex;
        flex-direction: row;
        flex: 1;
        > p {
          flex: 1.6;
          > span {
            font-size: 13px;
            color: #555e70;
          }
        }
        > div {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          > div {
            line-height: 18px;
            &:nth-of-type(1) {
              font-size: 12px;
              color: #555e70;
              margin-bottom: 2px;
            }
            &:nth-of-type(2) {
              font-size: 13px;
              color: rgb(186, 193, 218);
              &.down {
                color: #dd3451;
              }
              &.up {
                color: #14c285;
              }
            }
          }
        }
      }
    }

    .main-chart .time-list {
      color: #4a4a4a;
      font-size: 12px;
      padding: 8px 15px;
      > ul {
        display: flex;
        flex-direction: row;
        > li {
          width: 55px;
          line-height: 30px;
          text-align: center;
          margin-right: 12px;
          cursor: pointer;
          transition: all 0.3s;
          &.active {
            background: #292d38;
            color: #bac1da;
          }
          &:hover {
            background: #292d38;
            color: #bac1da;
          }
        }
      }
    }

    .main-chart .chart-container {
      background: #0c0d0f;
      height: 470px;
      margin: 0 15px 15px;
    }
    .chart-tip {
      font-size: 12px;
      > span {
        margin-right: 10px;
        color: #dd3451;
      }
      &.up > span {
        color: #14c285;
      }
    }
</style>
