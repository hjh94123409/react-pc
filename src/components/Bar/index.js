import React, { useRef, useEffect } from 'react'
import './index.scss'
import * as echarts from 'echarts'

const Bar = ({ title, xData, yData, style }) => {
    const domRef = useRef()

    useEffect(() => {
        const chartInit = () => {
            const myChart = echarts.init(domRef.current)
            myChart.setOption({
                title: {
                    text: title,
                },
                xAxis: {
                    type: 'category',
                    data: xData,
                },
                yAxis: {
                    type: 'value',
                },
                series: [
                    {
                        data: yData,
                        type: 'bar',
                    },
                ],
            })
        }
        chartInit()
    }, [title, xData, yData])

    return (
        <div>
            <div ref={domRef} style={style}></div>
        </div>
    )
}

export default Bar
