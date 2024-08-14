import './css/styleRegistro.css'
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';

const Registro = () => {

    let navigate = useNavigate();
    const [datosRoles, setDatosRoles] = useState(null);
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
                console.log(jsonRegistrar)
                if (jsonRegistrar.status == true) {

                }
                else {

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
            <div className="container-fluid">
                <div className="row">
                    <div style={{ padding: "0%" }} className="col">
                        <section className="background-radial-gradient overflow-hidden">

                            <div className="container px-4 py-5 px-md-5 text-center text-lg-start my-5">
                                <div className="row gx-lg-5 align-items-center mb-5">
                                    <div className="col-lg-6 mb-5 mb-lg-0" style={{ zIndex: "10" }}>
                                        <h1 className="my-5 display-5 fw-bold ls-tight" style={{ color: "#241212" }}>
                                            Registro del
                                            <span style={{ color: "#57B7F2" }}> Personal</span>
                                        </h1>
                                        <p className="mb-4 opacity-70" style={{ color: "#241212" }}>

                                            ¡Hola! 🌟 ¿Te apasiona la buena comida y el servicio al cliente? ¡Restaurante Casa Vieja es el lugar perfecto para ti! Aquí no solo serás parte de un equipo que valora la tradición y la calidad, sino que también tendrás la oportunidad de aprender, crecer y contribuir a una experiencia culinaria única.

                                            En Casa Vieja, cada plato que servimos cuenta una historia, y cada cliente que atendemos se convierte en parte de nuestra familia. Si estás buscando un lugar donde tu pasión por la gastronomía y el servicio al cliente puedan brillar, ¡esta es tu oportunidad!

                                            Únete a nosotros y ayuda a escribir el próximo capítulo de Casa Vieja. ¡Tu energía, creatividad y dedicación son justo lo que necesitamos para seguir sorprendiendo a nuestros clientes y mantener vivo el sabor de la tradición! 🍽️🔥

                                            ¡Estamos emocionados de conocerte y trabajar juntos para crear algo realmente especial!
                                        </p>
                                    </div>

                                    <div className="col-lg-6 mb-5 mb-lg-0 position-relative">
                                        <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
                                        <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>

                                        <div className="card bg-glass">
                                            <div className="card-body px-4 py-5 px-md-5">
                                                <form>
                                                    <div className="iconoUsuario">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                                                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                                                            <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
                                                        </svg>
                                                    </div>


                                                    {/* <!-- Email input --> */}
                                                    <div className="contenedorDatos">
                                                        <div style={{ marginRight: "auto" }} className="form-floating mb-3">
                                                            <input ref={cedula} type="number" className="form-control" placeholder="name@example.com" />
                                                            <label htmlFor="floatingInput">Cedula</label>
                                                        </div>
                                                        <div className="form-floating mb-3">
                                                            <input ref={nombre} type="text" className="form-control" placeholder="name@example.com" />
                                                            <label htmlFor="floatingInput">Nombre Completo</label>
                                                        </div>

                                                    </div>
                                                    <div className="contenedorDatos">
                                                        <div style={{ marginRight: "auto" }} className="form-floating mb-3">
                                                            <input ref={telefono} type="number" className="form-control" placeholder="name@example.com" />
                                                            <label htmlFor="floatingInput">Telefono</label>
                                                        </div>
                                                        <div className="form-floating mb-3">
                                                            <input ref={contra} type="password" className="form-control" placeholder="name@example.com" />
                                                            <label htmlFor="floatingInput">Contraseña</label>
                                                        </div>

                                                    </div>
                                                    <div className="form-floating mb-3">
                                                        <input ref={correo} type="email" className="form-control" placeholder="name@example.com" />
                                                        <label htmlFor="floatingInput">Correo</label>
                                                    </div>

                                                    {/* <!-- Password input --> */}
                                                    <div style={{ marginBottom: "10px" }} className="form-floating">
                                                        <select
                                                            className="form-select"
                                                            id="floatingSelect"
                                                            aria-label="Floating label select example"
                                                            ref={rol}
                                                        >
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
                                                        <label htmlFor="floatingSelect">Seleccionar Rol</label>
                                                    </div>



                                                    {/* <!-- Submit button --> */}
                                                    <div className="btnIniciar">
                                                        <button onClick={registrarUsuario} type="button" className="btn btn-primary btn-block mb-4">
                                                            Guardar
                                                        </button>
                                                    </div>


                                                    {/* <!-- Register buttons --> */}
                                                    <div className="text-center">
                                                        <p>¿Ya tienes Cuenta?, <a onClick={() => { navigate("/") }} href="#">Iniciar Sesion</a></p>
                                                        <button type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-link btn-floating mx-1">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-facebook" viewBox="0 0 16 16">
                                                                <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951" />
                                                            </svg>                                            </button>

                                                        <button type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-link btn-floating mx-1">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-instagram" viewBox="0 0 16 16">
                                                                <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334" />
                                                            </svg>                                            </button>

                                                        <button type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-link btn-floating mx-1">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-whatsapp" viewBox="0 0 16 16">
                                                                <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
                                                            </svg>                                            </button>


                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
                <div className="row">
                    <div style={{ padding: "0%" }} className="col">
                        <footer className="text-center text-lg-start" style={{ backgroundColor: "#000", color: "#f8f9fa" }}>
                            <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
                                <div className="me-2 d-none d-lg-block">
                                    <span>Conéctate con nosotros en las redes sociales:</span>
                                </div>

                                <div>
                                    <a href="" className="me-4 text-reset" style={{ color: "#f8f9fa" }}>
                                        <i className="bi bi-facebook"></i>
                                    </a>
                                    <a href="" className="me-4 text-reset" style={{ color: "#f8f9fa" }}>
                                        <i className="bi bi-twitter"></i>
                                    </a>
                                    <a href="" className="me-4 text-reset" style={{ color: "#f8f9fa" }}>
                                        <i className="bi bi-google"></i>
                                    </a>
                                    <a href="" className="me-4 text-reset" style={{ color: "#f8f9fa" }}>
                                        <i className="bi bi-instagram"></i>
                                    </a>
                                    <a href="" className="me-4 text-reset" style={{ color: "#f8f9fa" }}>
                                        <i className="bi bi-linkedin"></i>
                                    </a>
                                    <a href="" className="me-4 text-reset" style={{ color: "#f8f9fa" }}>
                                        <i className="bi bi-github"></i>
                                    </a>
                                </div>
                            </section>

                            <section>
                                <div className="container text-center text-md-start mt-5">
                                    <div className="row mt-3">
                                        <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                                            <h6 className="text-uppercase fw-bold mb-4">
                                                <i className="bi bi-gem me-3"></i>Casa Vieja
                                            </h6>
                                            <p>
                                                Bienvenido a Restaurante Casa Vieja, un lugar donde la tradición y el sabor
                                                auténtico se unen para ofrecerte una experiencia culinaria inolvidable. Desde 1985,
                                                nos hemos dedicado a celebrar la riqueza de nuestra gastronomía, combinando ingredientes
                                                frescos con recetas que han pasado de generación en generación. Relájate y disfruta de un
                                                ambiente acogedor mientras te deleitas con los sabores únicos que solo Casa Vieja puede
                                                ofrecer. ¡Nos complace tenerte con nosotros!.
                                            </p>
                                        </div>
                                        <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                                            <h6 className="text-uppercase fw-bold mb-4">
                                                Productos
                                            </h6>
                                            <p>
                                                <a href="#!" className="text-reset" style={{ color: "#f8f9fa" }}>Menú del Día</a>
                                            </p>
                                            <p>
                                                <a href="#!" className="text-reset" style={{ color: "#f8f9fa" }}>Platos Tradicionales</a>
                                            </p>
                                            <p>
                                                <a href="#!" className="text-reset" style={{ color: "#f8f9fa" }}>Postres Caseros</a>
                                            </p>
                                            <p>
                                                <a href="#!" className="text-reset" style={{ color: "#f8f9fa" }}>Bebidas Artesanales</a>
                                            </p>
                                        </div>

                                        <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                                            <h6 className="text-uppercase fw-bold mb-4">
                                                Enlaces útiles
                                            </h6>
                                            <p>
                                                <a href="#!" className="text-reset" style={{ color: "#f8f9fa" }}>Precios</a>
                                            </p>
                                            <p>
                                                <a href="#!" className="text-reset" style={{ color: "#f8f9fa" }}>Eventos</a>
                                            </p>
                                            <p>
                                                <a href="#!" className="text-reset" style={{ color: "#f8f9fa" }}>Pedidos</a>
                                            </p>
                                            <p>
                                                <a href="#!" className="text-reset" style={{ color: "#f8f9fa" }}>Ayuda</a>
                                            </p>
                                        </div>

                                        <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                                            <h6 className="text-uppercase fw-bold mb-4">Contacto</h6>
                                            <p><i className="bi bi-house me-3"></i>Cartago Valle del Cauca, #11-135 Calle 14</p>
                                            <p>
                                                <i className="bi bi-envelope me-3"></i>
                                                info@example.com
                                            </p>
                                            <p><i className="bi bi-telephone me-3"></i> +57 316 0185286</p>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <div className="text-center p-4" style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}>
                                © 2024 Hecho por:
                                <a className="text-reset fw-bold" style={{ color: "#f8f9fa" }} href="https://mdbootstrap.com/">Hector Restrepo - Jhon Narvaes</a>
                            </div>
                        </footer>
                    </div>
                </div>
            </div>


        </>
    );
}

export default Registro;