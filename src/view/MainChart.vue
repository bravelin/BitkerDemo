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
            <div class="chart-container" ref="chart"></div>
        </div>
    </div>
</template>
<script>
    export default {
        components: {
        },
        data() {
            return {
                chartInstance: null
            }
        },
        mounted() {
            const that = this
            that.$nextTick(() => {
                fetch('./stock.json').then(res => res.json()).then(data => {
                    // console.log('json data：', data)
                    that.initChart(data)
                    window.addEventListener('resize', () => {
                        that.chartInstance.resize()
                    })
                })
            })
        },
        methods: {
            initChart(rawData) {
                const that = this
                const upColor = '#3D8560'
                const downColor = '#97403A'
                let data = that.splitData(rawData)
                console.log('data：', data)
                console.log('MA5：', that.calculateMA(5, data))
                console.log('MA10：', that.calculateMA(10, data))
                that.chartInstance = that.$echarts.init(that.$refs.chart)

                that.chartInstance.setOption({
                    animation: true,
                    grid: [
                        {
                            left: '60px',
                            right: '20px',
                            top: '20px',
                            height: '70%'
                        },
                        {
                            left: '60px',
                            right: '20px',
                            top: '75%',
                            height: '20%'
                        }
                    ],
                    axisPointer: {
                        link: { xAxisIndex: 'all' },
                        label: {
                            backgroundColor: '#777'
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
                            data: data.categoryData,
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
                            splitNumber: 20,
                            min: 'dataMin',
                            max: 'dataMax',
                            axisPointer: {
                                z: 100
                            },
                            axisLine: {
                                onZero: false,
                                lineStyle: {
                                    color: '#191f2b'
                                }
                            }
                        },
                        {
                            type: 'category',
                            gridIndex: 1,
                            data: data.categoryData,
                            scale: true,
                            boundaryGap: false,
                            axisLine: { onZero: false },
                            axisTick: { show: false },
                            splitLine: { show: false },
                            axisLabel: { show: false },
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
                    dataZoom: [
                        {
                            show: false,
                            type: 'inside',
                            xAxisIndex: [0, 1],
                            start: 75,
                            end: 100
                        },
                        {
                            show: false,
                            xAxisIndex: [0, 1],
                            type: 'slider',
                            top: '85%',
                            start: 75,
                            end: 100
                        }
                    ],
                    series: [
                        {
                            name: 'Dow-Jones index',
                            type: 'candlestick',
                            data: data.values,
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
                            name: 'MA5',
                            type: 'line',
                            data: that.calculateMA(5, data),
                            smooth: true,
                            lineStyle: {
                                normal: { opacity: 0.5 }
                            }
                        },
                        {
                            name: 'MA10',
                            type: 'line',
                            data: that.calculateMA(10, data),
                            smooth: true,
                            lineStyle: {
                                normal: { opacity: 0.5 }
                            }
                        },
                        {
                            name: 'MA20',
                            type: 'line',
                            data: that.calculateMA(20, data),
                            smooth: true,
                            lineStyle: {
                                normal: { opacity: 0.5 }
                            }
                        },
                        {
                            name: 'MA30',
                            type: 'line',
                            data: that.calculateMA(30, data),
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
                            data: data.volumes
                        }
                    ]
                }, true)
            },
            splitData(rawData) {
                let categoryData = []
                let values = []
                let volumes = []
                for (let i = 0; i < rawData.length; i++) {
                    categoryData.push(rawData[i].splice(0, 1)[0])
                    values.push(rawData[i])
                    volumes.push([i, rawData[i][4], rawData[i][0] > rawData[i][1] ? 1 : -1])
                }
                return { categoryData, values, volumes }
            },
            calculateMA(dayCount, data) {
                let result = []
                for (let i = 0, len = data.values.length; i < len; i++) {
                    if (i < dayCount) {
                        result.push('-')
                        continue
                    }
                    let sum = 0
                    for (let j = 0; j < dayCount; j++) {
                        sum += data.values[i - j][1]
                    }
                    result.push(+(sum / dayCount).toFixed(3))
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
