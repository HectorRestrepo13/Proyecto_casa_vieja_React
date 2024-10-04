import { Scheduler } from "@aldabil/react-scheduler";
import { message } from 'antd';
import { useEffect, useState, useRef } from "react";
import DataTable from 'react-data-table-component';



const Eventos = () => {

    // aca se va guardar los registros de los eventos 
    const [EVENTS, setEVENTS] = useState([]);
    const [modoEvento, setModoEvento] = useState("calendario");
    const [datosTable, setDatosTable] = useState([])
    const [copiaDatosTable, setCopiaDatosTable] = useState([])


    // definicion de los Input
    let nombreEvento = useRef(null)
    let nombreCliente = useRef(null)
    let cantidadPersonasModal = useRef(null)
    let abono = useRef(null)
    let valorEvento = useRef(null)
    let telefonoCliente = useRef(null)
    let emailCliente = useRef(null)
    let fechaInicio = useRef(null)
    let fechaFin = useRef(null)
    let descripcion = useRef(null)
    let estadoModal = useRef(null)





    // Definición de las columnas de la tabla
    const columns = [

        {
            name: 'Nombre Evento', // Nombre de la columna
            selector: row => row.nombreEvento, // Selecciona el campo 'name' del objeto de datos
            sortable: true, // Permite ordenar esta columna
        },
        {
            name: 'Nombre Cliente', // Nombre de la columna
            selector: row => row.nombrePersona, // Selecciona el campo 'name' del objeto de datos
            sortable: true, // Permite ordenar esta columna
            cell: row => (
                <span
                    style={{
                        width: "300px"
                    }}
                >
                    {row.nombrePersona}
                </span>
            ),
        },
        {
            name: 'Fecha Inicio', // Nombre de la columna
            selector: row => {
                const date = new Date(row.fechaInicio);
                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, '0'); // Meses van de 0 a 11
                const day = String(date.getDate()).padStart(2, '0');
                const hours = String(date.getHours()).padStart(2, '0');
                const minutes = String(date.getMinutes()).padStart(2, '0');
                return `${year}-${month}-${day} ${hours}:${minutes}`;
            },
        },
        {
            name: 'Fecha Fin', // Nombre de la columna
            selector: row => {
                const date = new Date(row.fechaFin);
                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, '0'); // Meses van de 0 a 11
                const day = String(date.getDate()).padStart(2, '0');
                const hours = String(date.getHours()).padStart(2, '0');
                const minutes = String(date.getMinutes()).padStart(2, '0');
                return `${year}-${month}-${day} ${hours}:${minutes}`;
            },
        },
        {
            name: 'Estado', // Nombre de la columna
            selector: row => row.estado, // Selecciona el campo 'name' del objeto de datos
            sortable: true, // Permite ordenar esta columna
            cell: row => (
                <span
                    style={{
                        color: row.estado == "activo" || row.estado == "Activo" ? 'green' : 'red',
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
                    <button onClick={() => { mandarDatosModal(row.nombreEvento, row.nombrePersona, row.cantidadPersonas, row.abono, row.valorEvento, row.fechaInicio, row.fechaFin, row.descripcion, row.estado, row.telefonoReservante, row.emailReservante) }} type="button" className="btn btn-primary  btnDetalleTabla" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever>
                        Ver mas..
                    </button>

                </div>
            ),
            ignoreRowClick: true, // Ignora el click en la fila para que solo el botón maneje el evento

        },



    ];
    // fin de Definicion de las columnas





    // FUNCION PARA TRAER LOS DATOS DE LOS EVENTOS

    const getEvents = async () => {

        try {

            let response = await fetch("http://localhost:3000/api/evento/traerTodo",
                {
                    headers: {
                        "Authorization": "Bearer " + localStorage.getItem("tokenUsuario")
                    }
                }
            );

            if (!response.ok) {
                throw new Error(`Error Api: ${response.status}`)
            }

            let jsonEventos = await response.json();
            console.log(jsonEventos)

            if (jsonEventos.status == "success") {

                if (modoEvento === "tabla") {
                    setDatosTable(jsonEventos.data)
                    setCopiaDatosTable(jsonEventos.data)

                }
                else if (modoEvento === "calendario") {

                    let arregloEventos = []


                    jsonEventos.data.forEach(evento => {

                        let datos = {
                            event_id: evento.id,
                            title: evento.nombreEvento,
                            subtitle: "Sin SubTitulo",
                            DescripcionEvento: evento.descripcion,
                            start: new Date(evento.fechaInicio),
                            end: new Date(evento.fechaFin),
                            NombrePersona: evento.nombrePersona,
                            CantidadPersonas: evento.cantidadPersonas,
                            valorEvento: evento.valorEvento,
                            abono: evento.abono,
                            telefonoReserva: evento.telefonoReservante,
                            emailReserva: evento.emailReservante,
                            estado: evento.estado
                        }

                        arregloEventos.push(datos)
                    });


                    setEVENTS(arregloEventos)


                }


            }
            else {
                message.error('Error al traer eventos');
            }





        } catch (error) {
            console.log(`Hubo un Error al Traer los Eventos ${error}`)
        }



    }

    // -- FIN FUNCION --

    useEffect(() => {
        getEvents();
    }, [modoEvento])



    // AGREGAR EVENTO A LA BASE DE DATOS

    const handleConfirm = async (event, action) => {
        // Imprime en la consola el evento y la acción recibida
        console.log("handleConfirm =", action, event);

        try {


            return new Promise(async (res, rej) => {



                if (isNaN(event.abono)) {
                    // Muestra un mensaje de error si ingresa un texto en el input del Abono
                    message.error("Ingrese un Valor no un texto");
                    rej("Ingreso Texto en vez de un Numero.");

                    return;
                }
                if (isNaN(event.valorEvento)) {
                    // Muestra un mensaje de error si ingresa un texto en el input del valor total
                    message.error("Ingrese un Valor no un texto");
                    rej("Ingreso Texto en vez de un Numero.");

                    return;
                }
                if (isNaN(event.CantidadPersonas)) {
                    // Muestra un mensaje de error si ingresa un texto en el input de CantidadPersonas
                    message.error("Ingrese un Numero no un texto");
                    rej("Ingreso Texto en vez de un Numero.");

                    return;
                }


                // aca voy a formatear las fechas de Inicio y fin en formato "YYYY-MM-DD HH:MM:SS"

                const fechaInicio = new Date(event.start);

                // Paso 2: Formatear la fecha y hora en el formato deseado
                const anioInicio = fechaInicio.getFullYear();
                const mesInicio = String(fechaInicio.getMonth() + 1).padStart(2, '0'); // Los meses en JavaScript son 0-indexados
                const diaInicio = String(fechaInicio.getDate()).padStart(2, '0');
                const horasInicio = String(fechaInicio.getHours()).padStart(2, '0');
                const minutosInicio = String(fechaInicio.getMinutes()).padStart(2, '0');
                const segundosInicio = String(fechaInicio.getSeconds()).padStart(2, '0');

                const fechaFormateadaInicio = `${anioInicio}-${mesInicio}-${diaInicio} ${horasInicio}:${minutosInicio}:${segundosInicio}`;


                const fechaFin = new Date(event.end);

                // Paso 2: Formatear la fecha y hora en el formato deseado
                const anioFin = fechaFin.getFullYear();
                const mesFin = String(fechaFin.getMonth() + 1).padStart(2, '0'); // Los meses en JavaScript son 0-indexados
                const diaFin = String(fechaFin.getDate()).padStart(2, '0');
                const horasFin = String(fechaFin.getHours()).padStart(2, '0');
                const minutosFin = String(fechaFin.getMinutes()).padStart(2, '0');
                const segundosFin = String(fechaFin.getSeconds()).padStart(2, '0');

                const fechaFormateadaFin = `${anioFin}-${mesFin}-${diaFin} ${horasFin}:${minutosFin}:${segundosFin}`

                // aca metos los datos en un Objeto para despues mandar a la API
                let datos = {
                    nombreEvento: event.title,
                    nombrePersona: event.NombrePersona,
                    cantidadPersonas: event.CantidadPersonas,
                    abono: event.abono,
                    descripcion: event.Descripcion,
                    nombreReservante: event.NombrePersona,
                    telefonoReservante: event.telefonoReserva,
                    emailReservante: event.emailReserva,
                    fechaInicio: fechaFormateadaInicio,
                    fechaFin: fechaFormateadaFin,
                    estado: event.estado,
                    valorEvento: event.valorEvento
                }



                if (action === "edit") {
                    // Si la acción es "edit", realiza una operación PUT en la base de datos remota
                    // console.log("handleConfirm =", action, event.title);


                    const responseUpdate = await fetch(`http://localhost:3000/api/evento//editarEvento/${event.event_id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem("tokenUsuario")}`,
                        },
                        body: JSON.stringify(datos),
                    })
                    if (!responseUpdate.ok) {
                        throw new Error(`Hubo Un error en la API: ${responseUpdate.status}`)
                    }

                    let jsonResponse = await responseUpdate.json();

                    if (jsonResponse.status == "success") {

                        message.success("Evento Actualizado Con Exito!");
                        // await getEvents();

                        res({
                            ...event,
                            event_id: event.event_id || Math.random()
                        });

                    }
                    else {
                        console.log("Error al Mandar los Datos a la Api")
                        message.error("Error al Mandar los Datos!");

                    }




                } else if (action === "create") {
                    // Verifica si el evento es antes de la hora actual
                    const currentTime = new Date();
                    if (event.start.getTime() < currentTime.getTime()) {
                        // Muestra un mensaje de error si el evento es anterior a la hora actual
                        message.error("No se puede agregar un evento que ocurre en el pasado");
                        rej("El evento ocurre antes de la hora actual.");

                        return;
                    }

                    if (isNaN(event.telefonoReserva)) {
                        // Muestra un mensaje de error si ingresa un texto en el input del telefono
                        message.error("Ingrese un Numero Telefonico no un texto");
                        rej("Ingreso Texto en vez de un Numero.");

                        return;
                    }
                    ;


                    // ACA VOY A MANDAR LOS DATOS A LA API


                    const response = await fetch('http://localhost:3000/api/evento/crearEvento', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem("tokenUsuario")}`,
                        },
                        body: JSON.stringify(datos),
                    })
                    if (!response.ok) {
                        throw new Error(`Hubo Un error en la API: ${response.status}`)
                    }

                    let jsonResponse = await response.json();

                    if (jsonResponse.status == "success") {

                        message.success("Evento registrada exitosamente!");
                        res({
                            ...event,
                            event_id: event.event_id || Math.random()
                        });

                    }
                    else {
                        console.log("Error al Mandar los Datos a la Api")
                        message.error("Error al Mandar los Datos!");

                    }


                }
            });

        } catch (error) {

            rej(`Hubo un Error: ${error}`);

            message.error("Hubo un Error");



        }


    };

    // -- FIN FUNCION --



    // FUNCION PARA BUSCAR POR NOMBRE DEL EVENTO 
    const buscarTablaPedidos = (e) => {

        if (e.target.value != "") {
            const filtrarDatos = datosTable.filter(dato => {
                return dato.nombreEvento.toLowerCase().includes(e.target.value.toLowerCase())
            })
            setDatosTable(filtrarDatos)
        }
        else {
            setDatosTable(copiaDatosTable)
        }


    }

    // -- FIN FUNCION --


    // FUNCION PARA MANDAR LOS DATOS AL MODAL

    const mandarDatosModal = (nombreEven, nombreClien, cantidadPer, abonoEvento, valorTo, fechaIni, fechaFi, descripcionEven, estadoEven, telefonoEven, emailEven) => {

        nombreEvento.current.value = nombreEven
        nombreCliente.current.value = nombreClien
        cantidadPersonasModal.current.value = cantidadPer
        abono.current.value = abonoEvento
        valorEvento.current.value = valorTo
        descripcion.current.value = descripcionEven
        telefonoCliente.current.value = telefonoEven
        emailCliente.current.value = emailEven
        estadoModal.current.value = estadoEven

        const inicio = new Date(fechaIni);
        let fechaInicioFormateada = `${inicio.getFullYear()}-${String(inicio.getMonth() + 1).padStart(2, '0')}-${String(inicio.getDate()).padStart(2, '0')} ${String(inicio.getHours()).padStart(2, '0')}:${String(inicio.getMinutes()).padStart(2, '0')}`;


        const fin = new Date(fechaFi);
        let fechaFinFormateada = `${fin.getFullYear()}-${String(fin.getMonth() + 1).padStart(2, '0')}-${String(fin.getDate()).padStart(2, '0')} ${String(fin.getHours()).padStart(2, '0')}:${String(fin.getMinutes()).padStart(2, '0')}`;

        fechaFin.current.innerText = fechaFinFormateada
        fechaInicio.current.innerText = fechaInicioFormateada


    }

    // -- FIN FUNCION --


    return (
        <>
            <main id="main" className="main">
                <div className="pageContenedor">
                    <div className="pagetitle">
                        <h1>Organizador de Eventos</h1>
                        <nav>
                            <ol className="breadcrumb">
                                <li onClick={() => { setModoEvento("calendario") }} className="breadcrumb-item item1 active">Modo Calendario</li>
                                <li onClick={() => { setModoEvento("tabla") }} className="breadcrumb-item item2">Modo Tabla</li>
                            </ol>
                        </nav>
                    </div>
                </div>

                <section className="section dashboard">
                    <div className="container-fluid">
                        <div className="row">



                            <div className="col-xxl-12 col-md-12">
                                <div className="card info-card sales-card">
                                    {
                                        modoEvento === "calendario" ? (
                                            <>
                                                <div className="row">
                                                    <div className="col">
                                                        <Scheduler
                                                            view="week"
                                                            events={EVENTS}

                                                            fields={[
                                                                {
                                                                    name: "NombrePersona",
                                                                    type: "input",
                                                                    config: { label: "Nombre del Reservante..", required: true, errMsg: "Ingresa el Nombre del Reservante" }
                                                                }
                                                                , {
                                                                    name: "CantidadPersonas",
                                                                    type: "input",
                                                                    config: { label: "Cantidad de Personas...", required: true, errMsg: "Ingresa la Cantidad de Personas.." }
                                                                }
                                                                ,
                                                                {
                                                                    name: "valorEvento",
                                                                    type: "input",
                                                                    config: { label: "Valor del Evento...", required: true, errMsg: "Ingrese el Valor del Evento" }
                                                                },
                                                                {
                                                                    name: "abono",
                                                                    type: "input",
                                                                    config: { label: "Valor De Abono", required: true, errMsg: "Ingrese la Cantidad de Abono.." }
                                                                },
                                                                {
                                                                    name: "telefonoReserva",
                                                                    type: "input",
                                                                    config: { label: "Telefono...", required: true, errMsg: "Ingrese el Telefono" }
                                                                },
                                                                {
                                                                    name: "emailReserva",
                                                                    type: "input",
                                                                    config: { label: "Email..", required: true, errMsg: "Ingrese el Email.." }
                                                                },
                                                                {
                                                                    name: "DescripcionEvento",
                                                                    type: "input",
                                                                    config: { label: "Ingrese una Descripcion para el Evento", required: false }
                                                                },
                                                                {
                                                                    name: "estado",
                                                                    type: "select",
                                                                    default: "",
                                                                    options: [
                                                                        { value: "activo", text: "Activo" },
                                                                        { value: "cancelado", text: "Cancelado" },
                                                                        { value: "terminado", text: "Terminado" },
                                                                    ],
                                                                    config: {
                                                                        label: "Seleccione un Estado",
                                                                        required: true,
                                                                        errMsg: "Seleccione una opción",

                                                                    }
                                                                }
                                                            ]}
                                                            onConfirm={handleConfirm}

                                                        />
                                                    </div>

                                                </div>
                                            </>) : (
                                            <>
                                                <div style={{ marginLeft: "20px", marginTop: "20px", display: "flex", justifyContent: "space-between", marginBottom: "10px" }} className="row">

                                                    <div style={{ marginLeft: "50%" }} className="col">
                                                        <div className="input-group flex-nowrap">
                                                            <span className="input-group-text" id="addon-wrapping">@</span>
                                                            <input onChange={buscarTablaPedidos} style={{ marginRight: "20px" }} type="text" className="form-control" placeholder="Nombre Del Evento:" aria-label="Username" aria-describedby="addon-wrapping" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div style={{ marginLeft: "20px", marginBottom: "40px", marginRight: "20px", marginTop: "20px" }} className="row">
                                                    <div className="table-responsive table-custom">
                                                        <DataTable
                                                            columns={columns} // Define las columnas que se mostrarán
                                                            data={datosTable} // Los datos filtrados que se mostrarán en la tabla
                                                            pagination // Habilita la paginación
                                                            persistTableHead // Mantiene visible el encabezado de la tabla
                                                        />
                                                    </div>
                                                </div>

                                                {/* DATOS DEL MODAL */}
                                                <div className="row">
                                                    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                        <div className="modal-dialog  modal-lg">
                                                            <div className="modal-content">
                                                                <div className="modal-header">
                                                                    <h1 className="modal-title fs-5" id="exampleModalLabel">Datos Del Evento</h1>
                                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                                </div>
                                                                <div className="modal-body">
                                                                    <form>
                                                                        <div className="mb-2" style={{ display: "flex", justifyContent: "space-between" }}>

                                                                            <div className="mb-2" style={{ display: "flex", flexDirection: "column" }}>
                                                                                <label htmlFor="recipient-name" className="col-form-label">Fecha Inicio:</label>
                                                                                <label ref={fechaInicio} htmlFor="recipient-name" className="col-form-label">2024-05-12</label>
                                                                            </div>


                                                                            <div className="mb-2" style={{ display: "flex", flexDirection: "column" }}>
                                                                                <label htmlFor="recipient-name" className="col-form-label">Fecha Fin:</label>
                                                                                <label ref={fechaFin} htmlFor="recipient-name" className="col-form-label">2024-05-12</label>
                                                                            </div>
                                                                        </div>




                                                                        <div className="mb-2" style={{ display: "flex", justifyContent: "space-between" }}>
                                                                            <div className="mb-2" style={{ width: "45%" }}>
                                                                                <label htmlFor="recipient-name" className="col-form-label">Nombre Evento:</label>
                                                                                <input ref={nombreEvento} disabled type="text" className="form-control" id="recipient-name" />
                                                                            </div>


                                                                            <div className="mb-2" style={{ width: "45%" }}>
                                                                                <label htmlFor="recipient-name" className="col-form-label">Nombre Cliente:</label>
                                                                                <input ref={nombreCliente} disabled type="text" className="form-control" id="recipient-name" />
                                                                            </div>
                                                                        </div>


                                                                        <div className="mb-2" style={{ display: "flex", justifyContent: "space-between" }}>
                                                                            <div className="mb-2" style={{ width: "45%" }}>
                                                                                <label htmlFor="recipient-name" className="col-form-label">Abono:</label>
                                                                                <input ref={abono} disabled type="text" className="form-control" id="recipient-name" />
                                                                            </div>


                                                                            <div className="mb-2" style={{ width: "45%" }}>
                                                                                <label htmlFor="recipient-name" className="col-form-label">Valor Evento:</label>
                                                                                <input ref={valorEvento} disabled type="text" className="form-control" id="recipient-name" />
                                                                            </div>
                                                                        </div>


                                                                        <div className="mb-2" style={{ display: "flex", justifyContent: "space-between" }}>
                                                                            <div className="mb-2" style={{ width: "45%" }}>
                                                                                <label htmlFor="recipient-name" className="col-form-label">Cantidad Personas:</label>
                                                                                <input ref={cantidadPersonasModal} disabled type="text" className="form-control" id="recipient-name" />
                                                                            </div>


                                                                            <div className="mb-2" style={{ width: "45%" }}>
                                                                                <label htmlFor="recipient-name" className="col-form-label">Estado Evento:</label>
                                                                                <input ref={estadoModal} disabled type="text" className="form-control" id="recipient-name" />
                                                                            </div>
                                                                        </div>


                                                                        <div className="mb-2" style={{ display: "flex", justifyContent: "space-between" }}>
                                                                            <div className="mb-2" style={{ width: "45%" }}>
                                                                                <label htmlFor="recipient-name" className="col-form-label">Telefono Cliente:</label>
                                                                                <input ref={telefonoCliente} disabled type="text" className="form-control" id="recipient-name" />
                                                                            </div>


                                                                            <div className="mb-2" style={{ width: "45%" }}>
                                                                                <label htmlFor="recipient-name" className="col-form-label">Email Cliente:</label>
                                                                                <input ref={emailCliente} disabled type="text" className="form-control" id="recipient-name" />
                                                                            </div>
                                                                        </div>


                                                                        <div className="mb-3">
                                                                            <label htmlFor="message-text" className="col-form-label">Descripcion:</label>
                                                                            <textarea ref={descripcion} disabled className="form-control" id="message-text"></textarea>
                                                                        </div>
                                                                    </form>
                                                                </div>
                                                                <div className="modal-footer">
                                                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>)
                                    }


                                </div>
                            </div>











                        </div>



                    </div>
                </section >
            </main >
        </>
    );
}

export default Eventos;