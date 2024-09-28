import { Line, Pie, Bar } from "react-chartjs-2"
import { useEffect, useState } from "react";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
    ArcElement,

} from "chart.js"

ChartJS.register(
    ArcElement,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
)


var ventas = [0, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120];
var meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]


var miData = {
    labels: meses,
    datasets: [
        {
            label: "Ventas",
            data: ventas,
            tension: 0.4,
            fill: true,
            borderColor: "rgba(75, 192, 192, 1)",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            pointBackgroundColor: "rgba(75, 192, 192, 1)",
            pointBorderColor: "#fff",
            pointRadius: 6,
            pointHoverRadius: 8,
            pointHoverBackgroundColor: "rgba(255, 99, 132, 1)",
            pointHoverBorderColor: "rgba(255, 99, 132, 1)",
        }
    ]
};

var miSoptions = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
            labels: {
                color: "#333",
                font: {
                    size: 14,
                },
            },
        },
        title: {
            display: true,
            text: 'Ventas Mensuales - 2024',
            color: "#111",
            font: {
                size: 18,
            },
        },
        tooltip: {
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            titleFont: {
                size: 16,
            },
            bodyFont: {
                size: 14,
            },
            callbacks: {
                label: function (tooltipItem) {
                    return `Ventas: $${tooltipItem.raw}`;
                },
            },
        },
    },
    scales: {
        x: {
            ticks: {
                color: "#555",
                font: {
                    size: 12,
                },
            },
            grid: {
                display: false,
            },
        },
        y: {
            ticks: {
                color: "#555",
                font: {
                    size: 12,
                },
            },
            grid: {
                color: "rgba(200, 200, 200, 0.3)",
            },
        },
    },
};


export const GraficasVentas = () => {
    return <Line data={miData} options={miSoptions}></Line>;
};


// GRAFICA CIRCULAR

var opcionesCircular = {
    responsive: true,
    maintainAspectRatio: false,
}

var dataCircular = {
    labels: ["Ventas", "Ingresos", "Gastos"],
    datasets: [
        {
            label: "Distribución de Ingresos", // Etiqueta del dataset
            data: [100, 200, 300],
            backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
            ],
            borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
            ],
            borderWidth: 1,
        },
    ],
}

export const Circular = () => {
    return <Pie data={dataCircular} options={opcionesCircular}></Pie>;
}



