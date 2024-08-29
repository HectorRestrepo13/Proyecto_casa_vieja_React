import React, { useState, useEffect, useRef } from "react";
import DataTable from 'react-data-table-component';
import Swal from "sweetalert2";



const Usuarios = ({ setMenuDespliegue }) => {


    let nombre = useRef("");
    let cedula = useRef("");
    let telefono = useRef("");
    let contra = useRef("");
    let correo = useRef("");
    let rol = useRef("");
    let estado = useRef("");




    const [datosRoles, setDatosRoles] = useState(null);
    // aca es donde se va almacenar los datos de la API que va traer los datos de los pedidos
    const [datosTable, setDatosTable] = useState([])
    const [copiaDatosTable, setCopiaDatosTable] = useState([])

    // este Almacena que Usurios va mostrar, "1" muestra los Usuarios Activos y "0" los Usuarios Inactivos
    const [seleccionarEstadoUsuario, setSeleccionarEstadoUsuario] = useState("1")

    // aca va guardar el Rol del usuario que se va mandar al Modal
    const [rolUsuario, setRolUsuario] = useState("");



    // Definición de las columnas de la tabla
    const columns = [
        {
            name: 'ID', // Nombre de la columna
            selector: row => row.id, // Selecciona el campo 'name' del objeto de datos
            sortable: true, // Permite ordenar esta columna
        },
        {
            name: 'Cedula', // Nombre de la columna
            selector: row => row.cedula, // Selecciona el campo 'name' del objeto de datos
            sortable: true, // Permite ordenar esta columna
        },
        {
            name: 'Nombre', // Nombre de la columna
            selector: row => row.usuario, // Selecciona el campo 'email' del objeto de datos
            sortable: true, // Permite ordenar esta columna
        },
        {
            name: 'Telefono', // Nombre de la columna
            selector: row => row.telefono, // Selecciona el campo 'email' del objeto de datos
            sortable: true, // Permite ordenar esta columna
        },
        {
            name: 'Correo', // Nombre de la columna
            selector: row => row.correo, // Selecciona el campo 'email' del objeto de datos
            sortable: true, // Permite ordenar esta columna
        },
        {
            name: 'Rol', // Nombre de la columna
            selector: row => row.Rol, // Selecciona el campo 'email' del objeto de datos
            sortable: true, // Permite ordenar esta columna
        },
        {
            name: 'Estado', // Nombre de la columna
            selector: row => row.estado,
            sortable: true, // Permite ordenar esta columna
            cell: row => (
                <span
                    style={{
                        color: row.estado == "Activo" ? 'green' : 'red',
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
                        <li><a data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => { mandarDatosModal(row.usuario, row.cedula, row.telefono, row.correo, row.Rol) }} className="dropdown-item" href="#">Editar Usuario</a></li>
                        <li><a onClick={() => { editarEstadoUsuario(row.estado, row.usuario, row.cedula) }} className="dropdown-item" href="#">Editar Estado</a></li>

                    </ul>
                </div>
            ),
            ignoreRowClick: true, // Ignora el click en la fila para que solo el botón maneje el evento

        },
    ];




    // FUNCION PARA OBTENER LOS DATOS DE PEDIDOS Y LLENAR LA TABLA 
    const obtenerDatosApi = async () => {

        try {


            let seleccionarUsuarios = await fetch("http://localhost:3000/api/usuario/traerTodos/" + seleccionarEstadoUsuario)

            if (!seleccionarUsuarios.ok) {
                throw new Error(`Hubo un Error en la API: ${seleccionarUsuarios.status}`)
            }

            let jsonUsuario = await seleccionarUsuarios.json();
            if (jsonUsuario.status == "success") {

                let arregloDatos = [];

                jsonUsuario.message.forEach((usuario) => {



                    arregloDatos.push({
                        id: usuario.id,
                        usuario: usuario.nombreCompleto,
                        cedula: usuario.cedula,
                        telefono: usuario.telefono,
                        correo: usuario.correo,
                        estado: usuario.estado == true ? "Activo" : "Inactivo",
                        Rol: usuario.Rol.descripcion,
                        idRol: usuario.Rol.id

                    })


                })

                setDatosTable(arregloDatos)
                setCopiaDatosTable(arregloDatos)
            }
            else if (jsonUsuario.status == "error") {

                setDatosTable([])
                setCopiaDatosTable([])

                const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 2000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.onmouseenter = Swal.stopTimer;
                        toast.onmouseleave = Swal.resumeTimer;
                    }
                });
                Toast.fire({
                    icon: "info",
                    title: jsonUsuario.message
                });
            }


        } catch (error) {

            console.log(error)
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

    }, [seleccionarEstadoUsuario]);

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



    // FUNCION PARA MANDAR LOS DATOS DEL USUARIO AL MODAL

    const mandarDatosModal = async (usuario, cedulaUsuario, telefonoUsuario, correoUsuario, rolUsuario) => {


        nombre.current.value = usuario;
        cedula.current.value = cedulaUsuario;
        telefono.current.value = telefonoUsuario;
        correo.current.value = correoUsuario;
        setRolUsuario(rolUsuario)

        try {

            let respuestaRoles = await fetch("http://localhost:3000/api/login/seleccionarRoles/")

            if (!respuestaRoles.ok) {
                throw new Error(`Hubo un Error al Consumir la API de Traer Roles: ${respuestaRoles.status}`)
            }

            let jsonRespuestaRoles = await respuestaRoles.json();
            if (jsonRespuestaRoles.status == true) {
                setDatosRoles(jsonRespuestaRoles.datos)

            } else {
                console.log(`Hubo un error al traer los roles ${jsonRespuestaRoles.descripcion}`)
            }


        }
        catch (error) {
            console.log(`Hubo un Error: ${error}`)

        }

    }

    // -- FIN FUNCION --


    //  FUNCION PARA MANDAR LOS DATOS NUEVOS A LA BASE DE DATOS Y SE EDITE EL USUARIO

    const editarUsuario = () => {


        if (nombre.current.value != "" && cedula.current.value != "" && telefono.current.value != "" && correo.current.value != "" && rol.current.value != "") {


            const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                    confirmButton: "btn btn-success",
                    cancelButton: "btn btn-danger"
                },
                buttonsStyling: false
            });
            swalWithBootstrapButtons.fire({
                title: "Estas Seguro de Editar?",
                text: `Estas Apunto de editar el Usuario: ${nombre.current.value}`,
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Si, Editar!",
                cancelButtonText: "cancelar!",
                reverseButtons: true
            }).then(async (result) => {
                if (result.isConfirmed) {

                    try {

                        let editarUsuario = await fetch(`http://localhost:3000/api/usuario/editarUsuario/${cedula.current.value}`, {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${localStorage.getItem("tokenUsuario")}`
                            },
                            body: JSON.stringify({
                                nombreCompleto: nombre.current.value,
                                telefono: telefono.current.value,
                                correo: correo.current.value,
                                password: contra.current.value,
                                rolId: rol.current.value
                            })
                        });

                        if (!editarUsuario.ok) {
                            throw new Error(`Hubo un Error en la API: ${editarUsuario.status}`)
                        }

                        let jsonEditarUsuario = await editarUsuario.json();
                        console.log(jsonEditarUsuario)

                        if (jsonEditarUsuario.status == "success") {

                            swalWithBootstrapButtons.fire({
                                title: "Usuario Editado!",
                                text: jsonEditarUsuario.message,
                                icon: "success"
                            }).then(() => {

                                // BUSCAR UNA SOLUCION PARA CERRAR ESTE MODAL

                                window.location.reload();

                            })

                        }
                        else {

                            const Toast = Swal.mixin({
                                toast: true,
                                position: "top-end",
                                showConfirmButton: false,
                                timer: 3000,
                                timerProgressBar: true,
                                didOpen: (toast) => {
                                    toast.onmouseenter = Swal.stopTimer;
                                    toast.onmouseleave = Swal.resumeTimer;
                                }
                            });
                            Toast.fire({
                                icon: "error",
                                title: jsonEditarUsuario.message
                            });

                        }



                    } catch (error) {
                        console.log(`Error Api: ${error}`)

                        const Toast = Swal.mixin({
                            toast: true,
                            position: "top-end",
                            showConfirmButton: false,
                            timer: 3000,
                            timerProgressBar: true,
                            didOpen: (toast) => {
                                toast.onmouseenter = Swal.stopTimer;
                                toast.onmouseleave = Swal.resumeTimer;
                            }
                        });
                        Toast.fire({
                            icon: "error",
                            title: "Hubo un Error"
                        });
                    }




                } else if (
                    /* Read more about handling dismissals below */
                    result.dismiss === Swal.DismissReason.cancel
                ) {
                    swalWithBootstrapButtons.fire({
                        title: "Cancelado",
                        text: "No se Edito el Usuario :)",
                        icon: "info"
                    });
                }
            });






        }
        else {

            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                }
            });
            Toast.fire({
                icon: "warning",
                title: "Faltan Casillas por LLenar"
            });


        }



    }

    // -- FIN FUNCION --


    // FUNCION PARA EDITAR EL ESTADO DEL USUARIO

    const editarEstadoUsuario = (estadoUsuario, nombreUsuario, cedulaUsuario) => {

        Swal.fire({
            title: `Estas Seguro de Editar el estado de ${nombreUsuario}?`,
            text: `El estado Actual es ${estadoUsuario}`,
            icon: "info",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, Editar!"
        }).then(async (result) => {
            if (result.isConfirmed) {

                let nuevoEstado = 1;

                if (estadoUsuario == "Activo") {
                    nuevoEstado = 0;
                }

                // Aca voy a consumir la Api para Editar el estado del Usuario

                let editarEstadoUsuario = await fetch(`http://localhost:3000/api/usuario/cambiarEstado/${cedulaUsuario}`,
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${localStorage.getItem("tokenUsuario")}`
                        },
                        body: JSON.stringify({ estado: nuevoEstado })
                    }
                )
                if (!editarEstadoUsuario.ok) {
                    throw new Error(`Hubo un Error en la API: ${editarEstadoUsuario.status}`)
                }

                let jsonEditarEstado = await editarEstadoUsuario.json();

                if (jsonEditarEstado.status == "success") {
                    Swal.fire({
                        title: "Actualizado con Exito!",
                        text: jsonEditarEstado.message,
                        icon: "success"
                    }).then(() => { obtenerDatosApi() })
                }
                else {

                    console.log(jsonEditarEstado)
                    Swal.fire({
                        title: "Hubo un Error!!",
                        text: "Error al Actualizar el Estado",
                        icon: "error"
                    });
                }



            }
        });
    }


    // -- FIN FUNCION --



    return (
        <>
            <main id="main" className="main">
                <div className="pageContenedor">
                    <div className="pagetitle">
                        <h1>ADMINISTRADOR</h1>
                        <nav>
                            <ol className="breadcrumb">
                                <li onClick={() => { setSeleccionarEstadoUsuario("1") }} className="breadcrumb-item item1 active">Usuarios Activos</li>
                                <li onClick={() => { setSeleccionarEstadoUsuario("0") }} className="breadcrumb-item item2">Usuarios Inactivos</li>
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
                                        <div className="col-sm-12 col-md-8 col-lg-8 col-xl-8">
                                            <div style={{ display: "flex", justifyContent: "center", marginTop: "10px" }} className="contenTituloMenu">
                                                <div className="tituloCategoriaMenu">
                                                    <h1>{seleccionarEstadoUsuario == 1 ? "Usuarios Activos" : "Usuarios Inactivos"} </h1>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-sm-12 col-md-4 col-lg-4 col-xl-4">
                                            <div className="btnAgregarMenu">
                                                <button onClick={() => { setMenuDespliegue("crearNuevoUsuario") }}>Nuevo Usuario</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ marginLeft: "20px", marginTop: "20px", display: "flex", justifyContent: "space-between", marginBottom: "10px" }} className="row">

                                        <div style={{ marginLeft: "50%" }} className="col">
                                            <div className="input-group flex-nowrap">
                                                <span className="input-group-text" id="addon-wrapping">@</span>
                                                <input onChange={buscarTablaPedidos} style={{ marginRight: "20px" }} type="text" className="form-control" placeholder="Buscar por Nombre:" aria-label="Username" aria-describedby="addon-wrapping" />
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


                        {/* ACA VA IR EL MODAL DONDE SE VA EDITAR EL USUARIO */}
                        <div className="row">
                            <div className="col">

                                {/* <!-- Modal --> */}
                                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div className="modal-dialog modal-lg">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h1 className="modal-title fs-5" id="exampleModalLabel">Editar Usuario:</h1>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div className="modal-body">

                                                <div style={{ marginLeft: "20px", marginRight: "20px" }} className="row">
                                                    <div style={{ display: "flex", justifyContent: "center" }} className="col-sm-12 col-md-12 col-lg-6 col-xl-6">
                                                        <div className="datosUsuario">
                                                            <label><i className="bi bi-person-circle" style={{ marginRight: "8px" }}></i> Nombre Usuario</label>
                                                            <div className="form-floating mb-3">
                                                                <input ref={nombre} type="text" className="form-control" placeholder="name@example.com" />
                                                                <label htmlFor="floatingInput">Escribe el Nombre Completo</label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div style={{ display: "flex", justifyContent: "center" }} className="col-sm-12 col-md-12 col-lg-6 col-xl-6">
                                                        <div className="datosUsuario">
                                                            <label><i className="bi bi-person-badge-fill" style={{ marginRight: "8px" }}></i> Cedula</label>
                                                            <div className="form-floating mb-3">
                                                                <input disabled ref={cedula} type="number" className="form-control" placeholder="name@example.com" />
                                                                <label htmlFor="floatingInput">Escribe el Numero de Cedula...</label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>


                                                <div style={{ marginLeft: "20px", marginRight: "20px" }} className="row">
                                                    <div style={{ display: "flex", justifyContent: "center" }} className="col-sm-12 col-md-12 col-lg-6 col-xl-6">
                                                        <div className="datosUsuario">
                                                            <label><i className="bi bi-phone-fill" style={{ marginRight: "8px" }}></i> Telefono</label>
                                                            <div className="form-floating mb-3">
                                                                <input ref={telefono} type="number" className="form-control" placeholder="name@example.com" />
                                                                <label htmlFor="floatingInput">Escribe el Numero de Telefono</label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div style={{ display: "flex", justifyContent: "center" }} className="col-sm-12 col-md-12 col-lg-6 col-xl-6">
                                                        <div className="datosUsuario">
                                                            <label><i className="bi bi-incognito" style={{ marginRight: "8px" }}></i> Contraseña</label>
                                                            <div className="form-floating mb-3">
                                                                <input ref={contra} type="password" className="form-control" placeholder="name@example.com" />
                                                                <label htmlFor="floatingInput">Escribe la Contraseña si la vas a Cambiar..</label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div style={{ marginLeft: "20px", marginBottom: "10px", marginRight: "20px" }} className="row">
                                                    <div style={{ display: "flex", justifyContent: "center" }} className="col-sm-12 col-md-12 col-lg-6 col-xl-6">
                                                        <div className="datosUsuario">
                                                            <label><i className="bi bi-envelope-fill" style={{ marginRight: "8px" }}></i> Correo</label>
                                                            <div className="form-floating mb-3">
                                                                <input ref={correo} type="email" className="form-control" placeholder="name@example.com" />
                                                                <label htmlFor="floatingInput">Escribe el Correo</label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div style={{ display: "flex", justifyContent: "center" }} className="col-sm-12 col-md-12 col-lg-6 col-xl-6">
                                                        <div className="datosUsuario">
                                                            <label><i className="bi bi-person-rolodex" style={{ marginRight: "8px" }}></i> Rol.</label>
                                                            <div className="form-floating">
                                                                <select ref={rol} className="form-select" id="floatingSelect" aria-label="Floating label select example">
                                                                    <option value={rolUsuario == "CAJERO" ? 2 : rolUsuario == "MESERO" ? 3 : rolUsuario == "RECEPCIONISTA" ? 4 : rolUsuario == "ADMIN" ? 1 : ""} >{rolUsuario}</option>
                                                                    {
                                                                        datosRoles != null ? (
                                                                            datosRoles.map((rol) => (
                                                                                <option key={rol.id} value={rol.id}>
                                                                                    {rol.descripcion}
                                                                                </option>
                                                                            ))
                                                                        ) : (<></>)
                                                                    }
                                                                </select>
                                                                <label htmlFor="floatingSelect">Asignar el Rol al Usuario</label>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>


                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                                <button onClick={editarUsuario} type="button" style={{ backgroundColor: "#012970" }} className="btn btn-primary">Guardar</button>
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

export default Usuarios;