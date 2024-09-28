
import { useState, useEffect, useRef } from "react";
import { GraficasVentas, Circular } from "./linesChart";


// IMPORTACION DEL "CHART.JS"

import { Line, Pie, Bar } from "react-chartjs-2"

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
    plugins,
    scales,
    BarElement

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
    Filler,
    scales,
    plugins,
    BarElement
)

// -- FIN IMPORTACION --

const Graficas = ({ setMenuDespliegue }) => {


    const [graficaProductosMasVendidos, setGraficaProductosMasVendidos] = useState(null);
    const [graficaVentasTotales, setGraficaVentasTotales] = useState(null);
    const [graficaMeserosPedidos, setGraficaMeserosPedidos] = useState(null);


    let mesGrafico1 = useRef(null);
    let anoGrafico1 = useRef(null);

    let anoGrafico2 = useRef(null);

    let mesGrafico3 = useRef(null);
    let anoGrafico3 = useRef(null);


    // FUNCION PARA HACER LA GRAFICA DE LOS PRODUCTOS DE LOS MENOS A LOS MAS VENDIDOS
    const ProductosMasVendidos = async (fechaMes, fechaAño) => {


        try {

            let respuesta = await fetch(`http://localhost:3000/api/grafico/datosMenusMasVendidos/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ mes: fechaMes, año: fechaAño })
            })

            if (!respuesta.ok) {
                throw new Error(`Hubo un Error en la API ${respuesta.status}`)
            }

            let jsonRespuesta = await respuesta.json();
            console.log(jsonRespuesta)

            if (jsonRespuesta.status === true) {

                if (jsonRespuesta.data.length > 0) {


                    let valores = [];
                    let platillos = [];

                    jsonRespuesta.data.forEach(element => {

                        platillos.push(element.nombre);
                        valores.push(element.total_cantidad);


                    });



                    // GRAFICA CIRCULAR

                    var opcionesCircular = {
                        responsive: true,
                        maintainAspectRatio: false,
                    }

                    var dataCircular = {
                        labels: platillos,
                        datasets: [
                            {
                                label: "Se Prepararon un Total en este Mes", // Etiqueta del dataset
                                data: valores,
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


                    setGraficaProductosMasVendidos(<Pie data={dataCircular} options={opcionesCircular}></Pie>)



                }
                else {
                    setGraficaProductosMasVendidos(<>
                        <div className="container">
                            <div className="row justify-content-center align-items-center" style={{ height: '200px' }}>
                                <div className="col-xxl-6 col-md-8">
                                    <div className="card text-center shadow-lg p-4">

                                        <div className="no-data-message">
                                            <h4 className="text-warning">No hay datos disponibles</h4>
                                            <p className="text-muted">No se encontraron datos para la fecha seleccionada.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>)
                }


            }
            else {

                console.log(`Error: ${error}`)

                setGraficaProductosMasVendidos(<>
                    <div className="container">
                        <div className="row justify-content-center align-items-center" style={{ height: '200px' }}>
                            <div className="col-xxl-6 col-md-8">
                                <div className="card text-center shadow-lg p-4">

                                    <div className="no-data-message">
                                        <h4 className="text-warning">Hubo un Error</h4>
                                        <p className="text-muted">Hubo un Error al Llenar la Grafica....</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>)

            }







        } catch (error) {

            console.log(`Error: ${error}`)

            setGraficaProductosMasVendidos(<>
                <div className="alert alert-success" role="alert">
                    <h4 className="alert-heading">Hubo un Error!</h4>
                    <p>Hubo un Error al Traer los Datos de la Grafica</p>
                    <hr />
                </div>
            </>)

        }


    }

    // -- FIN FUNCION --

    // FUNCION PARA LLENAR LA GRAFICA DEl TOTAL DE VENTAS DE CADA MES 

    const llenarGraficaVentasTotales = async (fechaAño) => {

        try {

            let datosGraficos = await fetch(`http://localhost:3000/api/grafico/totalVentasCadaMes/`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ año: fechaAño })
                }
            )

            if (!datosGraficos.ok) {
                throw new Error(`Hubo un Error en la API: ${datosGraficos.status}`)
            }
            let jsonDatos = await datosGraficos.json()

            if (jsonDatos.status === true) {

                if (jsonDatos.data.length > 0) {





                    var ventas = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                    var meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]

                    jsonDatos.data.forEach((element) => {

                        ventas[element.mes - 1] = element.total_vendido;


                    })

                    var miData = {
                        labels: meses,
                        datasets: [
                            {
                                label: "Ventas Totales Del Mes",
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
                                        size: 14,
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
                                        size: 14,
                                    },
                                },
                                grid: {
                                    color: "rgba(200, 200, 200, 0.3)",
                                },
                            },
                        },
                    };


                    setGraficaVentasTotales(<Line style={{ width: "100%" }} data={miData} options={miSoptions}></Line>)






                }
                else {

                    setGraficaVentasTotales(<>
                        <div className="container">
                            <div className="row justify-content-center align-items-center" style={{ height: '200px' }}>
                                <div className="col-xxl-6 col-md-8">
                                    <div className="card text-center shadow-lg p-4">

                                        <div className="no-data-message">
                                            <h4 className="text-warning">No tiene Datos Por Mostrar</h4>
                                            <p className="text-muted">Este Año no a tenido Ventas....</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>)

                }

            }
            else {

                console.log(jsonDatos)

                setGraficaVentasTotales(<>
                    <div className="container">
                        <div className="row justify-content-center align-items-center" style={{ height: '200px' }}>
                            <div className="col-xxl-6 col-md-8">
                                <div className="card text-center shadow-lg p-4">

                                    <div className="no-data-message">
                                        <h4 className="text-warning">Hubo un Error</h4>
                                        <p className="text-muted">Hubo un Error al Llenar la Grafica....</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>)

            }


        } catch (error) {

            console.log(`Error: ${error}`)

            setGraficaVentasTotales(<>
                <div className="container">
                    <div className="row justify-content-center align-items-center" style={{ height: '200px' }}>
                        <div className="col-xxl-6 col-md-8">
                            <div className="card text-center shadow-lg p-4">

                                <div className="no-data-message">
                                    <h4 className="text-warning">Hubo un Error</h4>
                                    <p className="text-muted">Hubo un Error al Llenar la Grafica....</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>)

        }

    }

    // -- FIN FUNCION --


    // FUNCION PARA LLENAR LA GRAFICA CON LOS MESEROS CON MAS PEDIDOS QUE HAN HECHO

    const llenarGraficaMeserosMasPedidos = async (fechaAño, fechaMes) => {
        try {
            let datosGraficos = await fetch(`http://localhost:3000/api/grafico/pedidosMasTomados/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ año: fechaAño, mes: fechaMes })
            });

            if (!datosGraficos.ok) {
                throw new Error(`Hubo un Error en la API: ${datosGraficos.status}`);
            }

            let jsonDatos = await datosGraficos.json();

            if (jsonDatos.status === true) {
                if (jsonDatos.data?.length > 0) {
                    let totalPedidos = [];
                    let nombreMeseros = [];

                    jsonDatos.data.forEach((element) => {
                        nombreMeseros.push(element.nombreCompleto);
                        totalPedidos.push(element.total_pedidos);
                    });

                    let miData = {
                        labels: nombreMeseros,
                        datasets: [
                            {
                                label: "Total Pedidos Hechos",
                                data: totalPedidos,
                                backgroundColor: "#1349a5"
                            }
                        ]
                    };

                    let miOptions = {
                        responsive: true,
                        animation: true,
                        plugins: {
                            legend: {
                                display: false
                            }
                        }
                    };

                    setGraficaMeserosPedidos(<Bar data={miData} options={miOptions}></Bar>);
                } else {
                    setGraficaMeserosPedidos(
                        <div className="container">
                            <div className="row justify-content-center align-items-center" style={{ height: '200px' }}>
                                <div className="col-xxl-6 col-md-8">
                                    <div className="card text-center shadow-lg p-4">
                                        <div className="no-data-message">
                                            <h4 className="text-warning">No tiene Datos Por Mostrar</h4>
                                            <p className="text-muted">Este Año no ha tenido Ventas....</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                }
            } else {
                console.log(jsonDatos);

                setGraficaMeserosPedidos(
                    <div className="container">
                        <div className="row justify-content-center align-items-center" style={{ height: '200px' }}>
                            <div className="col-xxl-6 col-md-8">
                                <div className="card text-center shadow-lg p-4">
                                    <div className="no-data-message">
                                        <h4 className="text-warning">Hubo un Error</h4>
                                        <p className="text-muted">Hubo un Error al Llenar la Grafica....</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            }
        } catch (error) {
            console.log(`Error: ${error}`);

            setGraficaMeserosPedidos(
                <div className="container">
                    <div className="row justify-content-center align-items-center" style={{ height: '200px' }}>
                        <div className="col-xxl-6 col-md-8">
                            <div className="card text-center shadow-lg p-4">
                                <div className="no-data-message">
                                    <h4 className="text-warning">Hubo un Error</h4>
                                    <p className="text-muted">Hubo un Error al Llenar la Grafica....</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }

    // -- FIN FUNCION --






    useEffect(() => {
        let fechaActual = new Date()
        let año = fechaActual.getFullYear();
        let mes = fechaActual.getMonth() + 1;
        anoGrafico1.current.value = año
        mesGrafico1.current.value = mes
        anoGrafico2.current.value = año
        anoGrafico3.current.value = año
        mesGrafico3.current.value = mes



        ProductosMasVendidos(mes, año);
        llenarGraficaVentasTotales(año);
        llenarGraficaMeserosMasPedidos(año, mes)

    }, [])















    return (
        <>
            <main id="main" className="main">
                <div className="pageContenedor">
                    <div className="pagetitle">
                        <h1>ADMINISTRADOR</h1>
                        <nav>
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item item1 active">Usuarios Activos</li>
                                <li className="breadcrumb-item item2">Usuarios Inactivos</li>
                            </ol>
                        </nav>
                    </div>
                </div>

                <section className="section dashboard">
                    <div className="container-fluid">

                        {/* PRIMERA GRAFICA */}
                        <div className="row">
                            <div className="col-xxl-12 col-md-12">
                                <div className="card info-card sales-card">
                                    <div className="tituloGrafica">
                                        <h2 className="subTituloGrafica">Los Productos Más Vendidos del Mes</h2>
                                    </div>

                                    <div className="bg-light mx-auto px-2 border-2 border-primary" style={{ width: "90%", height: "400px", marginTop: "20px" }}>
                                        <div className="contenedorFecha">
                                            <div className="seleccionarAno">
                                                <label >Seleccione Año</label>
                                                <select onChange={() => { llenarGraficaVentasTotales(mesGrafico1.current.value, anoGrafico1.current.value) }} ref={anoGrafico1} className="form-select" aria-label="Default select example" defaultValue="0">
                                                    <option value="2026">2026</option>
                                                    <option value="2025">2025</option>
                                                    <option value="2024">2024</option>
                                                    <option value="2023">2023</option>
                                                    <option value="2022">2022</option>
                                                    <option value="2021">2021</option>
                                                    <option value="2020">2020</option>


                                                </select>
                                            </div>

                                            <div className="seleccionarMes">
                                                <label >Seleccionar Mes</label>
                                                <select onChange={() => { ProductosMasVendidos(mesGrafico1.current.value, anoGrafico1.current.value) }} ref={mesGrafico1} className="form-select" aria-label="Default select example" defaultValue="0">
                                                    <option value="1">Enero</option>
                                                    <option value="2">Febrero</option>
                                                    <option value="3">Marzo</option>
                                                    <option value="4">Abril</option>
                                                    <option value="5">Mayo</option>
                                                    <option value="6">Junio</option>
                                                    <option value="7">Julio</option>
                                                    <option value="8">Agosto</option>
                                                    <option value="9">Septiembre</option>
                                                    <option value="10">Octubre</option>
                                                    <option value="11">Noviembre</option>
                                                    <option value="12">Diciembre</option>

                                                </select>
                                            </div>


                                        </div>
                                        <div className="bg-light mx-auto px-2 border-2 border-primary" style={{ width: "100%", height: "70%", marginTop: "20px" }}>
                                            {
                                                graficaProductosMasVendidos !== null ? graficaProductosMasVendidos : (<><h2>Cargando....</h2></>)
                                            }
                                        </div>
                                    </div>




                                </div>
                            </div>
                        </div>
                        {/* FIN PRIMERA GRAFICA */}

                        {/* SEGUNDA GRAFICA */}
                        <div className="row">
                            <div className="col-xxl-12 col-md-12">
                                <div className="card info-card sales-card">
                                    <div className="tituloGrafica">
                                        <h2 className="subTituloGrafica">Ganancias de Cada Mes</h2>
                                    </div>

                                    <div className="bg-light mx-auto px-2 border-2 border-primary" style={{ width: "90%", height: "500px", marginTop: "20px" }}>
                                        <div className="contenedorFecha">
                                            <div className="seleccionarAno">
                                                <label >Seleccione Año</label>
                                                <select onChange={() => { llenarGraficaVentasTotales(anoGrafico2.current.value) }} ref={anoGrafico2} className="form-select" aria-label="Default select example" defaultValue="0">
                                                    <option value="2026">2026</option>
                                                    <option value="2025">2025</option>
                                                    <option value="2024">2024</option>
                                                    <option value="2023">2023</option>
                                                    <option value="2022">2022</option>
                                                    <option value="2021">2021</option>
                                                    <option value="2020">2020</option>


                                                </select>
                                            </div>



                                        </div>
                                        <div className="bg-light mx-auto px-2 border-2 border-primary" style={{ width: "100%", height: "70%", marginTop: "20px" }}>
                                            {
                                                graficaVentasTotales !== null ? graficaVentasTotales : (<><h2>Cargando....</h2></>)
                                            }
                                        </div>
                                    </div>



                                </div>
                            </div>
                        </div>
                        {/* FIN SEGUNDA GRAFICA */}



                        {/* TERCERA GRAFICA */}
                        <div className="row">
                            <div className="col-xxl-12 col-md-12">
                                <div className="card info-card sales-card">
                                    <div className="tituloGrafica">
                                        <h2 className="subTituloGrafica">Los Meseros Con Mas Pedidos Tomados</h2>
                                    </div>

                                    <div className="bg-light mx-auto px-2 border-2 border-primary" style={{ width: "90%", height: "400px", marginTop: "20px" }}>
                                        <div className="contenedorFecha">
                                            <div className="seleccionarAno">
                                                <label >Seleccione Año</label>
                                                <select onChange={() => { llenarGraficaMeserosMasPedidos(anoGrafico3.current.value, mesGrafico3.current.value) }} ref={anoGrafico3} className="form-select" aria-label="Default select example" defaultValue="0">
                                                    <option value="2026">2026</option>
                                                    <option value="2025">2025</option>
                                                    <option value="2024">2024</option>
                                                    <option value="2023">2023</option>
                                                    <option value="2022">2022</option>
                                                    <option value="2021">2021</option>
                                                    <option value="2020">2020</option>


                                                </select>
                                            </div>

                                            <div className="seleccionarMes">
                                                <label >Seleccionar Mes</label>
                                                <select onChange={() => { llenarGraficaMeserosMasPedidos(anoGrafico3.current.value, mesGrafico3.current.value) }} ref={mesGrafico3} className="form-select" aria-label="Default select example" defaultValue="0">
                                                    <option value="1">Enero</option>
                                                    <option value="2">Febrero</option>
                                                    <option value="3">Marzo</option>
                                                    <option value="4">Abril</option>
                                                    <option value="5">Mayo</option>
                                                    <option value="6">Junio</option>
                                                    <option value="7">Julio</option>
                                                    <option value="8">Agosto</option>
                                                    <option value="9">Septiembre</option>
                                                    <option value="10">Octubre</option>
                                                    <option value="11">Noviembre</option>
                                                    <option value="12">Diciembre</option>

                                                </select>
                                            </div>


                                        </div>
                                        <div className="bg-light mx-auto px-2 border-2 border-primary" style={{ width: "100%", height: "70%", marginTop: "20px" }}>
                                            {
                                                graficaMeserosPedidos !== null ? graficaMeserosPedidos : (<><h2>Cargando....</h2></>)
                                            }
                                        </div>
                                    </div>




                                </div>
                            </div>
                        </div>
                        {/* FIN TERCERA GRAFICA */}



                    </div>
                </section >
            </main >
        </>
    );
}

export default Graficas;