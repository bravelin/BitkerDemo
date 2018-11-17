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
                    <li class="active">1分钟</li>
                    <li>5分钟</li>
                    <li>15分钟</li>
                    <li>30分钟</li>
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
            data: {
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
            data() { // 监听klineData的改变
                const that = this
                if (!that.hasLoadedData) {
                    that.hasLoadedData = true
                    if (that.hasMounted && !that.chartInstance) {
                        that.initChart(that.data)
                    }
                } else if (that.chartInstance) {
                    that.refreshChart() // 数据改变，刷新图表
                }
            }
        },
        data() {
            return {
                chartInstance: null,
                hasLoadedData: false,
                hasMounted: false,
                kline: {
                    categoryData: [],
                    values: [],
                    volumes: []
                }
            }
        },
        mounted() {
            const that = this
            that.$nextTick(() => {
                that.hasMounted = true
                if (that.hasLoadedData && !that.chartInstance) {
                    that.initChart(that.data)
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
                            left: '60px',
                            right: '30px',
                            top: '20px',
                            height: '68%'
                        },
                        {
                            left: '60px',
                            right: '30px',
                            top: '75%',
                            height: '18%'
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
                        backgroundColor: 'rgba(245, 245, 245, 0.8)',
                        borderWidth: 1,
                        borderColor: '#ccc',
                        padding: 10,
                        textStyle: {
                            color: '#000'
                        },
                        position(pos, params, el, elRect, size) {
                            var obj = { top: 10 }
                            obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 30
                            return obj
                        }
                        // extraCssText: 'width: 170px'
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
                                z: 100
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
                            scale: true,
                            splitArea: {
                                show: false
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
                            gridIndex: 1,
                            splitNumber: 2,
                            axisLabel: { show: false },
                            axisLine: { show: false },
                            axisTick: { show: false },
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
                            },
                            tooltip: {
                                formatter(param) {
                                    param = param[0]
                                    return [
                                        'Date: ' + param.name + '<hr size=1 style="margin: 3px 0">',
                                        'Open: ' + param.data[0] + '<br/>',
                                        'Close: ' + param.data[1] + '<br/>',
                                        'Lowest: ' + param.data[2] + '<br/>',
                                        'Highest: ' + param.data[3] + '<br/>'
                                    ].join('')
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
                            name: 'Volume',
                            type: 'bar',
                            xAxisIndex: 1,
                            yAxisIndex: 1,
                            data: kline.volumes
                        }
                    ]
                }, true)

                // 宽度自适应
                window.addEventListener('resize', () => {
                    that.chartInstance.resize()
                })
            },
            // 用新数据刷新图表
            refreshChart() {
                const that = this
                let newData = [...that.data[that.data.length - 1]]
                if (newData.length < 6) {
                    return
                }
                const kline = that.kline
                // console.log('refresh new data：', JSON.stringify(newData))
                let time = newData.splice(0, 1)[0]
                let timeStr = formatTime(new Date(time), 'hh:mm')
                kline.categoryData.push(timeStr)
                kline.values.push(newData)
                let newVolume = [kline.volumes.length, newData[4], newData[0] > newData[1] ? 1 : -1]
                kline.volumes.push(newVolume)

                const option = that.chartInstance.getOption()
                option.xAxis[0].data.push(timeStr)
                option.xAxis[1].data.push(timeStr)
                option.series[0].data.push(newData)
                option.series[3].data.push(newVolume)
                that.chartInstance.setOption(option) // do refresh
            },
            splitData(rawData) {
                const that = this
                let time = ''
                const kline = that.kline
                for (let i = 0; i < rawData.length; i++) {
                    time = rawData[i].splice(0, 1)[0]
                    kline.categoryData.push(formatTime(new Date(time), 'hh:mm'))
                    kline.values.push(rawData[i])
                    kline.volumes.push([i, rawData[i][4], rawData[i][0] > rawData[i][1] ? 1 : -1])
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
</style>
