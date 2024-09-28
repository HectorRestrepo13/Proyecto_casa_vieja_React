import { useEffect, useRef } from "react";
import { jwtDecode } from "jwt-decode";


const VerPerfil = () => {

    let nombreUsuario = useRef(null);
    let cedulaUsuario = useRef(null);
    let telefonoUsuario = useRef(null);
    let correoUsuario = useRef(null);
    let rolUsuario = useRef(null);
    let tituloNombre = useRef(null);



    // FUNCION PARA TRAER LOS DATOS DEL USUARIO


    const traerDatosUsuario = () => {

        // Decodificar el token sin verificar la firma
        const tokenDescodificado = jwtDecode(localStorage.getItem("tokenUsuario"));

        nombreUsuario.current.value = tokenDescodificado.datos[0].nombreCompleto;
        tituloNombre.current.innerText = tokenDescodificado.datos[0].nombreCompleto;
        cedulaUsuario.current.value = tokenDescodificado.datos[0].cedula;
        telefonoUsuario.current.value = tokenDescodificado.datos[0].telefono;
        correoUsuario.current.value = tokenDescodificado.datos[0].correo;

        if (tokenDescodificado.datos[0].RolId == 1) {
            rolUsuario.current.value = "ADMIN";

        }
        else if (tokenDescodificado.datos[0].RolId == 2) {
            rolUsuario.current.value = "CAJERO";

        }
        else if (tokenDescodificado.datos[0].RolId == 3) {
            rolUsuario.current.value = "MESERO";

        }
        else if (tokenDescodificado.datos[0].RolId == 4) {
            rolUsuario.current.value = "RECEPCIONISTA";

        }



    }

    // -- FIN FUNCION --

    useEffect(() => {
        traerDatosUsuario();
    }, [])






    return (
        <>
            {/* PAGINA DE EDITAR EL MENU */}
            <main id="main" className="main">

                {/* TITULO DEL INVENTARIO Y CATEGORIAS */}
                <div className="pagetitle">
                    <h1>Visualizar Perfil Usuario</h1>

                </div>
                {/* <!-- FIN PAGINA Title --> */}

                {/* <!-- CART DONDE SE VA MOSTRAR EL INVETARIO DEL MENU --> */}
                <section className="section dashboard">
                    <div className="container-fluid">

                        <div className="row">
                            {/* <!-- Left side columns --> */}
                            <div className="col-xxl-12 col-md-12">
                                {/* <!-- Sales Card --> */}
                                <div className="card info-card sales-card">
                                    <div style={{ marginLeft: "20px", marginTop: "20px", display: "flex", justifyContent: "space-between" }} className="row">
                                        <div className="col">
                                            <div className="contenTituloMenu">
                                                <div className="tituloCategoriaMenu">
                                                    <h1 ref={tituloNombre}>Nombre de Usuario</h1>
                                                </div>

                                            </div>

                                        </div>

                                    </div>
                                    {/* FILA DEL MENU */}
                                    <div style={{ marginLeft: "20px", display: "flex", justifyContent: "space-between" }} className="row">
                                        <div className="col">
                                            <div className="row rowDatosMenu">
                                                <div className="col-sm-12 col-md-6 col-lg-7 col-xl-7">
                                                    <form>
                                                        <div className="contenDatosUsuaeio">
                                                            <div style={{ width: "48%" }} className="form-floating mb-3">
                                                                <input ref={cedulaUsuario} disabled type="number" className="form-control" placeholder="name@example.com" />
                                                                <label htmlFor="floatingInput">Cedula Usuario:</label>
                                                            </div>
                                                            <div style={{ width: "48%" }} className="form-floating mb-3">
                                                                <input ref={nombreUsuario} disabled type="text" className="form-control" placeholder="name@example.com" />
                                                                <label htmlFor="floatingInput">Nombre Usuario:</label>
                                                            </div>
                                                        </div>

                                                        <div className="form-floating mb-3">
                                                            <input ref={telefonoUsuario} disabled type="number" className="form-control" placeholder="name@example.com" />
                                                            <label htmlFor="floatingInput">Telefono:</label>
                                                        </div>
                                                        <div className="form-floating mb-3">
                                                            <input ref={rolUsuario} disabled type="text" className="form-control" placeholder="name@example.com" />
                                                            <label htmlFor="floatingInput">Rol Usuario:</label>
                                                        </div>
                                                        <div className="form-floating mb-3">
                                                            <input ref={correoUsuario} disabled type="text" className="form-control" placeholder="name@example.com" />
                                                            <label htmlFor="floatingInput">Correo:</label>
                                                        </div>


                                                    </form>
                                                </div>
                                                <div className="col-sm-12 col-md-6 col-lg-5 col-xl-5">
                                                    <div className="contImgenMenu">

                                                        <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                                                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                                                            <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
                                                        </svg>

                                                    </div>


                                                </div>



                                            </div>
                                        </div>

                                    </div>


                                </div>
                            </div>
                            {/* !-- End Left side columns --> */}
                        </div>
                    </div>
                </section >
                {/* <!-- FIN PAGINA CART --> */}

            </main >
            {/* < !--End #main -- > */}
        </>
    );
}

export default VerPerfil;