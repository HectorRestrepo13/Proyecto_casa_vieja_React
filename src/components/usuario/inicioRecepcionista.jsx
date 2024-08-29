import React, { useState, useEffect } from "react";
import DataTable from 'react-data-table-component';
import Swal from "sweetalert2";



const Inicio = () => {

    // aca es donde se va almacenar los datos de la API que va traer los datos de los pedidos
    const [datosTable, setDatosTable] = useState([])
    const [copiaDatosTable, setCopiaDatosTable] = useState([])

    // aca se va guardar el detalle pedido para poder mostrarlo
    const [detallePedido, setDetallePedido] = useState(null)








    // Definición de las columnas de la tabla
    const columns = [
        {
            name: 'ID', // Nombre de la columna
            selector: row => row.id, // Selecciona el campo 'name' del objeto de datos
            sortable: true, // Permite ordenar esta columna
        },
        {
            name: 'Mesero', // Nombre de la columna
            selector: row => row.usuario, // Selecciona el campo 'email' del objeto de datos
            sortable: true, // Permite ordenar esta columna
        },
        {
            name: 'Metodo Pago', // Nombre de la columna
            selector: row => row.metodoPago, // Selecciona el campo 'email' del objeto de datos
            sortable: true, // Permite ordenar esta columna
        },
        {
            name: 'Fecha', // Nombre de la columna
            selector: row => row.fecha, // Selecciona el campo 'email' del objeto de datos
            sortable: true, // Permite ordenar esta columna
        },
        {
            name: 'Valor Total', // Nombre de la columna
            selector: row => row.valor, // Selecciona el campo 'email' del objeto de datos
            sortable: true, // Permite ordenar esta columna
        },
        {
            name: 'Estado', // Nombre de la columna
            selector: row => row.estado, // Selecciona el campo 'email' del objeto de datos
            sortable: true, // Permite ordenar esta columna
            cell: row => (
                <span
                    style={{
                        color: row.estado === 'Pagado' ? 'green' : row.estado === 'Cancelado' ? 'red' : row.estado === 'Entregado' ? 'blue' : 'black',
                        fontWeight: 'bold'
                    }}
                >
                    {row.estado}
                </span>
            ), // Cambia el color basado en el valor de 'estado'
        },
        {
            name: 'Acciones', // Nueva columna para el botón
            cell: row => (

                <div className="btn-group dropend">
                    <button type="button" className="btn btn-primary dropdown-toggle btnDetalleTabla" data-bs-toggle="dropdown" aria-expanded="false">
                        Detalle
                    </button>
                    <ul className="dropdown-menu">
                        <li><a onClick={() => editarEstado(row.id)}
                            className="dropdown-item" href="#">Editar Estado</a></li>
                        <li><a onClick={() => editarMetodoPago(row.id)} className="dropdown-item" href="#">Editar Metodo Pago</a></li>
                        <li><a onClick={() => mostrarDetallePedido(row.id)} data-bs-toggle="modal" data-bs-target="#exampleModal" className="dropdown-item" href="#">Ver Pedidos..</a></li>

                    </ul>
                </div>
            ),
            ignoreRowClick: true, // Ignora el click en la fila para que solo el botón maneje el evento

        },
    ];

    // Función para manejar el clic en el botón para editar el estado del pedido
    const editarEstado = async (id) => {

        const { value: fruit } = await Swal.fire({
            title: `Selecciona el Nuevo estado del Pedido: ${id}`,
            input: "select",
            inputOptions: {
                Estado: {
                    Entregado: "Entregado",
                    Pagado: "Pagado",
                    Cancelado: "Cancelado",
                },

            },
            inputPlaceholder: "Nuevo Estado",
            showCancelButton: true,
            inputValidator: (value) => {
                return new Promise((resolve) => {
                    if (value != "") {
                        resolve();
                    } else {
                        resolve("Seleccione un Nuevo Estado :)");
                    }
                });
            }
        });
        if (fruit) {

            try {


                let editarEstado = await fetch(`http://localhost:3000/api/pedido/editarPedido/`,
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": "Bearer " + localStorage.getItem("tokenUsuario")
                        },
                        body: JSON.stringify({
                            nuevoEstado: fruit,
                            idPedido: id

                        })
                    }
                )

                if (!editarEstado.ok) {
                    throw new Error(`Hubo un Error al Editar el estado`)
                }

                let jsonEditar = await editarEstado.json();

                if (jsonEditar.status == true) {
                    Swal.fire(`Estado Actualizado con Exito: ${fruit}`).then(() => {
                        obtenerDatosApi();
                    })

                }
                else {
                    Swal.fire(`Hubo un error: ${jsonEditar.descripcion}`);

                }



            } catch (error) {

                console.log(`Error: ${error}`)
                Swal.fire(`Hubo un Error al Editar el Estado`);


            }

        }
    };

    // -- FIN FUNCION --




    // Función para manejar el clic en el botón para editar el Metodo de Pago del pedido
    const editarMetodoPago = async (id) => {

        const { value: fruit } = await Swal.fire({
            title: `Selecciona el Nuevo Metodo Pago del Pedido: ${id}`,
            input: "select",
            inputOptions: {
                Metodo: {
                    Efectivo: "Efectivo",
                    Tarjeta: "Tarjeta",
                    Transferencia: "Transferencia",
                    Pendiente: "Pendiente",

                },

            },
            inputPlaceholder: "Pago Con:",
            showCancelButton: true,
            inputValidator: (value) => {
                return new Promise((resolve) => {
                    if (value != "") {
                        resolve();
                    } else {
                        resolve("Seleccione un Modo de Pago! :)");
                    }
                });
            }
        });
        if (fruit) {

            try {


                let editarEstado = await fetch(`http://localhost:3000/api/pedido/editarMetodoPago/`,
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": "Bearer " + localStorage.getItem("tokenUsuario")
                        },
                        body: JSON.stringify({
                            nuevoMetodoPago: fruit,
                            idPedido: id

                        })
                    }
                )

                if (!editarEstado.ok) {
                    throw new Error(`Hubo un Error al Editar el Metodo de Pago!!`)
                }

                let jsonEditar = await editarEstado.json();

                if (jsonEditar.status == true) {
                    Swal.fire(`Metodo de Pago Actualizado con Exito`).then(() => {
                        obtenerDatosApi();
                    })

                }
                else {
                    Swal.fire(`Hubo un error: ${jsonEditar.descripcion}`);

                }



            } catch (error) {

                console.log(`Error: ${error}`)
                Swal.fire(`Hubo un Error al Editar el Metodo de Pago!!`);


            }

        }
    };

    // -- FIN FUNCION --


    // FUNCION PARA OBTENER LOS DATOS DE PEDIDOS Y LLENAR LA TABLA 
    const obtenerDatosApi = async () => {

        try {


            let seleccionarPedidos = await fetch("http://localhost:3000/api/pedido/pedidosConFechaActual/")

            if (!seleccionarPedidos.ok) {
                throw new Error(`Hubo un Error en la API: ${seleccionarPedidos.status}`)
            }

            let jsonPedidos = await seleccionarPedidos.json();
            let arregloDatos = [];

            jsonPedidos.datos.forEach((pedido) => {


                // Crear un objeto Date con la cadena de fecha
                const fecha = new Date(pedido.fechaPedido);
                // Opciones de formato
                const opciones = {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    timeZoneName: 'short'
                };
                // Formatear la fecha
                const fechaFormateada = fecha.toLocaleDateString('es-ES', opciones);

                arregloDatos.push({
                    id: pedido.id,
                    usuario: pedido.Usuario.nombreCompleto,
                    metodoPago: pedido.metodoPago,
                    fecha: fechaFormateada,
                    valor: pedido.valorTotal,
                    estado: pedido.estado,
                    detallePedido: pedido.DetallePedidos
                })


            })

            setDatosTable(arregloDatos)
            setCopiaDatosTable(arregloDatos)

        } catch (error) {

            console.log(jsonPedidos)
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Hubo un Error!!",
                showConfirmButton: false,
                timer: 1500
            });

        }



    }

    // -- FIN FUNCION --

    // PARA LLAMAR LA FUNCION Y SE LLENE LOS DATOS UNA SOLO VEZ
    useEffect(() => {
        // Aquí podrías realizar una petición a la API para obtener los datos
        obtenerDatosApi()

    }, []);

    // FUNCION PARA BUSCAR POR NOMBRE EN LA TABLA

    const buscarTablaPedidos = (e) => {

        console.log(datosTable)
        console.log(copiaDatosTable)

        if (e.target.value != "") {
            const filtrarDatos = datosTable.filter(dato => {
                return dato.usuario.toLowerCase().includes(e.target.value.toLowerCase())
            })
            setDatosTable(filtrarDatos)
        }
        else {
            setDatosTable(copiaDatosTable)
        }

    }
    // -- FIN FUNCION --

    // FUNCION PARA mandar los detalles al modal del pedido seleccionado 

    const mostrarDetallePedido = (idPedido) => {

        console.log(datosTable)
        let arregloDetallePedido = [];
        datosTable.forEach((pedido) => {

            if (idPedido == pedido.id) {
                pedido.detallePedido.forEach((detallePedido) => {

                    arregloDetallePedido.push({
                        id: detallePedido.id,
                        nombreMenu: detallePedido.Menu.nombre,
                        cantidad: detallePedido.cantidad,
                        descripcion: detallePedido.descripcion,
                        valor: detallePedido.valorUnidad
                    })
                })

            }
        })

        setDetallePedido(arregloDetallePedido)

    }

    // -- FIN FUNCION --

    // FUNCION PARA PONER NULL "detallePedido" CUANDO CIERRE EL MODAL

    const cerrarModal = () => {
        setDetallePedido(null)
    }


    return (
        <>
            <main id="main" className="main">
                <div className="pageContenedor">
                    <div className="pagetitle">
                        <h1>Recepcionista</h1>
                        <nav>
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item item1 active">Pedidos</li>
                                <li className="breadcrumb-item item2">Eventos</li>
                            </ol>
                        </nav>
                    </div>
                </div>

                <section className="section dashboard">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-xxl-12 col-md-12">
                                <div className="card info-card sales-card">
                                    <div style={{ marginLeft: "20px", marginTop: "20px", display: "flex", justifyContent: "space-between" }} className="row">
                                        <div className="col-sm-12 col-md-7 col-lg-7 col-xl-7">
                                            <div style={{ display: "flex", justifyContent: "center", marginTop: "10px" }} className="contenTituloMenu">
                                                <div className="tituloCategoriaMenu">
                                                    <h1>PEDIDOS REALIZADOS:</h1>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-12 col-md-5 col-lg-5 col-xl-5">
                                            <div className="input-group flex-nowrap">
                                                <span className="input-group-text" id="addon-wrapping">@</span>
                                                <input onChange={buscarTablaPedidos} style={{ marginRight: "20px" }} type="text" className="form-control" placeholder="Buscar por Nombre Mesero:" aria-label="Username" aria-describedby="addon-wrapping" />
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ marginLeft: "20px", marginBottom: "40px", marginRight: "20px" }} className="row">
                                        <div className="table-responsive table-custom">
                                            <DataTable
                                                columns={columns} // Define las columnas que se mostrarán
                                                data={datosTable} // Los datos filtrados que se mostrarán en la tabla
                                                pagination // Habilita la paginación
                                                persistTableHead // Mantiene visible el encabezado de la tabla
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                {/* <!-- Modal --> */}
                                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div className="modal-dialog modal-lg">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h1 className="modal-title fs-5" id="exampleModalLabel">Platillos Pedidos por el Cliente:</h1>
                                                <button onClick={cerrarModal} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div className="modal-body">

                                                <div style={{ display: "flex", justifyContent: "center" }} className="row row-cols-sm-2 row-cols-md-2 row-cols-lg-3 row-cols-xl-3  g-4">
                                                    {
                                                        detallePedido != null ? (
                                                            detallePedido.map((item, index) => (
                                                                <div key={index} className="card text-bg-light mb-3" style={{ maxWidth: "15rem" }}>
                                                                    <div className="card-header">{item.nombreMenu || "Nombre no disponible"}</div> {/* Suponiendo que 'menuNombre' es un campo del item */}
                                                                    <div className="card-body">
                                                                        <h5 className="card-title">Valor: ${item.valor || "Valor no disponible"}</h5>
                                                                        <h5 style={{ marginTop: "0px", paddingTop: "0px" }} className="card-title">Cantidad: {item.cantidad || 0}</h5>
                                                                        <p className="card-text">{item.descripcion != "null" ? item.descripcion : "Este Pedido no Tiene ninguna Descripcion"}</p>
                                                                    </div>
                                                                </div>
                                                            ))
                                                        ) : (<>

                                                            <div className="d-flex align-items-center">
                                                                <strong role="status">Cargando...</strong>
                                                                <div className="spinner-border ms-auto" aria-hidden="true"></div>
                                                            </div>
                                                        </>)
                                                    }



                                                </div>


                                            </div>
                                            <div className="modal-footer">
                                                <button onClick={cerrarModal} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section >
            </main >
        </>
    );
}

export default Inicio;
