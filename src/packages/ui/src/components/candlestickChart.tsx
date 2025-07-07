import {prepareChartData} from "../utils/prepareChartData";
import {Bar} from "react-chartjs-2";
import React from "react";
import {CandlestickMap} from "../api/fetchCandlestickData";


interface CandlestickChartProps {
    data?: CandlestickMap
}

const CandlestickChart = ({data}: CandlestickChartProps) => {
    const {labels, open, high, low, close} = prepareChartData(data ?? {});
    const chartData = {
        labels,
        datasets: [
            {label: "Open", data: open, backgroundColor: "rgba(54, 162, 235, 0.5)"},
            {label: "High", data: high, backgroundColor: "rgba(75, 192, 192, 0.5)"},
            {label: "Low", data: low, backgroundColor: "rgba(255, 206, 86, 0.5)"},
            {label: "Close", data: close, backgroundColor: "rgba(255, 99, 132, 0.5)"},
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: "Hourly Temperature Candlesticks",
            },
        },
        scales: {
            x: {stacked: true},
            y: {beginAtZero: false},
        },
    };
    return (
        <Bar data={chartData} options={chartOptions}/>
    )
}

export default CandlestickChart;