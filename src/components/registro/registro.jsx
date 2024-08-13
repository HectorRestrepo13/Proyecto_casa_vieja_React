import './css/styleRegistro.css'
import { useNavigate } from 'react-router-dom';

const Registro = () => {

    let navigate = useNavigate();



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
                                                        <div style={{ marginRight: "10px" }} className="form-floating mb-3">
                                                            <input type="email" className="form-control" placeholder="name@example.com" />
                                                            <label htmlFor="floatingInput">Cedula</label>
                                                        </div>
                                                        <div className="form-floating mb-3">
                                                            <input type="email" className="form-control" placeholder="name@example.com" />
                                                            <label htmlFor="floatingInput">Nombre Completo</label>
                                                        </div>

                                                    </div>
                                                    <div className="contenedorDatos">
                                                        <div style={{ marginRight: "10px" }} className="form-floating mb-3">
                                                            <input type="email" className="form-control" placeholder="name@example.com" />
                                                            <label htmlFor="floatingInput">Telefono</label>
                                                        </div>
                                                        <div className="form-floating mb-3">
                                                            <input type="email" className="form-control" placeholder="name@example.com" />
                                                            <label htmlFor="floatingInput">Contraseña</label>
                                                        </div>

                                                    </div>
                                                    <div className="form-floating mb-3">
                                                        <input type="email" className="form-control" placeholder="name@example.com" />
                                                        <label htmlFor="floatingInput">Correo</label>
                                                    </div>

                                                    {/* <!-- Password input --> */}
                                                    <div style={{ marginBottom: "10px" }} class="form-floating">
                                                        <select class="form-select" id="floatingSelect" aria-label="Floating label select example">
                                                            <option selected>Abrir el Menu de Seleccion</option>
                                                            <option value="1">One</option>
                                                            <option value="2">Two</option>
                                                            <option value="3">Three</option>
                                                        </select>
                                                        <label for="floatingSelect">Seleccionar Rol</label>
                                                    </div>



                                                    {/* <!-- Submit button --> */}
                                                    <div className="btnIniciar">
                                                        <button type="button" className="btn btn-primary btn-block mb-4">
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
                        <footer className="bg-body-tertiary text-center piePagina">
                            {/* Grid container */}
                            <div className="container-fluid piePaginaLink">
                                {/* Section: Social media */}
                                <section className="mb-4">
                                    {/* Facebook */}
                                    <a className="btn text-white btn-floating m-1" style={{ backgroundColor: "#3b5998" }} href="#!" role="button">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-facebook" viewBox="0 0 16 16">
                                            <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951" />
                                        </svg>
                                    </a>
                                    {/* Twitter */}
                                    <a className="btn text-white btn-floating m-1" style={{ backgroundColor: "#55acee" }} href="#!" role="button">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-twitter" viewBox="0 0 16 16">
                                            <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334q.002-.211-.006-.422A6.7 6.7 0 0 0 16 3.542a6.7 6.7 0 0 1-1.889.518 3.3 3.3 0 0 0 1.447-1.817 6.5 6.5 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.32 9.32 0 0 1-6.767-3.429 3.29 3.29 0 0 0 1.018 4.382A3.3 3.3 0 0 1 .64 6.575v.045a3.29 3.29 0 0 0 2.632 3.218 3.2 3.2 0 0 1-.865.115 3 3 0 0 1-.614-.057 3.28 3.28 0 0 0 3.067 2.277A6.6 6.6 0 0 1 .78 13.58a6 6 0 0 1-.78-.045A9.34 9.34 0 0 0 5.026 15" />
                                        </svg>
                                    </a>
                                    {/* Google */}
                                    <a className="btn text-white btn-floating m-1" style={{ backgroundColor: "#dd4b39" }} href="#!" role="button">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-google" viewBox="0 0 16 16">
                                            <path d="M15.545 6.558a9.4 9.4 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.7 7.7 0 0 1 5.352 2.082l-2.284 2.284A4.35 4.35 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.8 4.8 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.7 3.7 0 0 0 1.599-2.431H8v-3.08z" />
                                        </svg>
                                    </a>
                                    {/* Instagram */}
                                    <a className="btn text-white btn-floating m-1" style={{ backgroundColor: "#ac2bac" }} href="#!" role="button">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-instagram" viewBox="0 0 16 16">
                                            <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334" />
                                        </svg>
                                    </a>
                                </section>
                                {/* Section: Social media */}
                            </div>

                            <div className="text-center p-3" style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}>
                                © 2024 Hecho por:
                                <a className="text-body" href="https://mdbootstrap.com/">Hector Restrepo-Jhon Narves</a>
                            </div>
                        </footer>
                    </div>
                </div>
            </div>


        </>
    );
}

export default Registro;