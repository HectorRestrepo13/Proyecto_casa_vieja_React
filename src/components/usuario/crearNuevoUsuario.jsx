import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';


const CrearUsuario = ({ setMenuDespliegue }) => {

    let navigate = useNavigate();
    const [datosRoles, setDatosRoles] = useState(null);
    const [recargaRegistro, setRecargaRegistro] = useState(false);

    let nombre = useRef();
    let cedula = useRef();
    let telefono = useRef();
    let contra = useRef();
    let correo = useRef();
    let rol = useRef();



    useEffect(() => {

        const traerRoles = async () => {
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
        traerRoles();

    }, [])


    //  FUNCION PARA REGISTRAR EL USUARIO

    const registrarUsuario = async () => {


        if (nombre.current.value != "" && cedula.current.value != "" && correo.current.value != "" && contra.current.value != "" && telefono.current.value != "" && rol.current.value != "") {

            try {

                setRecargaRegistro(true)
                let registrar = await fetch("http://localhost:3000/api/login/login/registrarUsuario/", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    }
                    ,
                    body: JSON.stringify({
                        cedulaUsuario: cedula.current.value,
                        nombreUsuario: nombre.current.value,
                        telefonoUsuario: telefono.current.value,
                        correoUsuario: correo.current.value,
                        paswordUsuario: contra.current.value,
                        idRol: rol.current.value,
                    })
                })

                if (!registrar.ok) {
                    throw new Error(`Hubo un Error al Insertar el Usuario ${registrar.status}`)
                }

                let jsonRegistrar = await registrar.json();
                setRecargaRegistro(false)
                if (jsonRegistrar.status == true) {

                    const Toast = Swal.mixin({
                        toast: true,
                        position: "top-end",
                        showConfirmButton: false,
                        timer: 1500,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.onmouseenter = Swal.stopTimer;
                            toast.onmouseleave = Swal.resumeTimer;
                        }
                    });
                    Toast.fire({
                        icon: "success",
                        title: jsonRegistrar.descripcion
                    }).then(() => {

                        // limpio las casillas 
                        nombre.current.value = "";
                        cedula.current.value = "";
                        telefono.current.value = "";
                        contra.current.value = "";
                        correo.current.value = "";
                        rol.current.value = "";

                    })
                }
                else {

                    if (jsonRegistrar.validaciones != null) {
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
                            title: jsonRegistrar.validaciones[0].msg
                        });
                    }
                    else {
                        console.log(jsonRegistrar)
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
                            title: jsonRegistrar.descripcion
                        });
                    }

                }


            } catch (error) {
                Swal.fire({
                    title: "Hubo un Error",
                    text: "Intenta mas tarde o comunicate con el Desarrollador",
                    icon: "error"
                });
            }


        }
        else {
            Swal.fire({
                position: "top-end",
                icon: "info",
                title: "Faltan Casillas por Llenar!",
                showConfirmButton: false,
                timer: 1500
            });
        }


    }









    return (
        <>
            <main id="main" className="main">
                <div className="pageContenedor">
                    <div className="pagetitle">
                        <h1>ADMINISTRADOR</h1>

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
                                                    <h1>Crear Nuevo Usuario</h1>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-sm-12 col-md-4 col-lg-4 col-xl-4">
                                            <div className="btnAgregarMenu">
                                                <button onClick={() => { setMenuDespliegue("administrarUsuarios") }}>Atras</button>
                                            </div>
                                        </div>
                                    </div>

                                    <div style={{ marginLeft: "20px", marginRight: "20px" }} className="row">
                                        <div style={{ display: "flex", justifyContent: "center" }} className="col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                            <div className="datosUsuario">
                                                <label><i className="bi bi-person-circle" style={{ marginRight: "8px" }}></i> Nombre Usuario</label>
                                                <div className="form-floating mb-3">
                                                    <input ref={nombre} type="text" className="form-control" placeholder="name@example.com" />
                                                    <label htmlFor="floatingInput">Escribe el Nombre Completo</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div style={{ display: "flex", justifyContent: "center" }} className="col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                            <div className="datosUsuario">
                                                <label><i className="bi bi-person-badge-fill" style={{ marginRight: "8px" }}></i> Cedula</label>
                                                <div className="form-floating mb-3">
                                                    <input ref={cedula} type="number" className="form-control" placeholder="name@example.com" />
                                                    <label htmlFor="floatingInput">Escribe el Numero de Cedula...</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                    <div style={{ marginLeft: "20px", marginRight: "20px" }} className="row">
                                        <div style={{ display: "flex", justifyContent: "center" }} className="col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                            <div className="datosUsuario">
                                                <label><i className="bi bi-phone-fill" style={{ marginRight: "8px" }}></i> Telefono</label>
                                                <div className="form-floating mb-3">
                                                    <input ref={telefono} type="number" className="form-control" placeholder="name@example.com" />
                                                    <label htmlFor="floatingInput">Escribe el Numero de Telefono</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div style={{ display: "flex", justifyContent: "center" }} className="col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                            <div className="datosUsuario">
                                                <label><i className="bi bi-incognito" style={{ marginRight: "8px" }}></i> Contraseña</label>
                                                <div className="form-floating mb-3">
                                                    <input ref={contra} type="password" className="form-control" placeholder="name@example.com" />
                                                    <label htmlFor="floatingInput">Escribe la Contraseña</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div style={{ marginLeft: "20px", marginBottom: "10px", marginRight: "20px" }} className="row">
                                        <div style={{ display: "flex", justifyContent: "center" }} className="col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                            <div className="datosUsuario">
                                                <label><i className="bi bi-envelope-fill" style={{ marginRight: "8px" }}></i> Correo</label>
                                                <div className="form-floating mb-3">
                                                    <input ref={correo} type="email" className="form-control" placeholder="name@example.com" />
                                                    <label htmlFor="floatingInput">Escribe el Correo</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div style={{ display: "flex", justifyContent: "center" }} className="col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                            <div className="datosUsuario">
                                                <label><i className="bi bi-person-rolodex" style={{ marginRight: "8px" }}></i> Rol.</label>
                                                <div className="form-floating">
                                                    <select ref={rol} className="form-select" id="floatingSelect" aria-label="Floating label select example">
                                                        <option value="">Abrir el Menú de Selección</option>
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

                                    <div style={{ marginLeft: "20px", marginBottom: "10px", marginRight: "20px" }} className="row">
                                        <div className="col">
                                            <div className="btnIniciar">
                                                {
                                                    recargaRegistro === false ? (<> <button style={{ backgroundColor: "#012970", color: "white", fontSize: "18px" }} onClick={registrarUsuario} type="button" className="btn btn-primary btn-block mb-4">
                                                        Guardar
                                                    </button></>) : (<>
                                                        <div className="spinner-grow text-primary" role="status">
                                                            <span className="visually-hidden">Loading...</span>
                                                        </div>
                                                        <div className="spinner-grow text-secondary" role="status">
                                                            <span className="visually-hidden">Loading...</span>
                                                        </div>
                                                        <div className="spinner-grow text-success" role="status">
                                                            <span className="visually-hidden">Loading...</span>
                                                        </div>
                                                        <div className="spinner-grow text-danger" role="status">
                                                            <span className="visually-hidden">Loading...</span>
                                                        </div>
                                                        <div className="spinner-grow text-warning" role="status">
                                                            <span className="visually-hidden">Loading...</span>
                                                        </div>
                                                        <div className="spinner-grow text-info" role="status">
                                                            <span className="visually-hidden">Loading...</span>
                                                        </div>

                                                        <div className="spinner-grow text-dark" role="status">
                                                            <span className="visually-hidden">Loading...</span>
                                                        </div></>)
                                                }

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

export default CrearUsuario;