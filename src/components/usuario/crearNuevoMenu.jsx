import { useEffect, useState, useRef } from "react";
import Swal from "sweetalert2";
const CrearMenu = ({ setMenuDespliegue }) => {

    let imagenMenu = useRef(null);
    let inputRutaImagen = useRef(null);
    let nombreMenu = useRef(null);
    let precioMenu = useRef(null);
    let descripcionMenu = useRef(null);
    let categoriaMenu = useRef(null);



    const [categoriasMenu, setCategoriasMenu] = useState(null);
    const [cargaInsertacion, setCargaInsertacion] = useState(false);

    useEffect(() => {
        //  ACA VOY A LLAMAR LA API PARA MANDAR LAS CATEGORIAS A LA ETIQUETA SELECT

        const seleccionarCategorias = async () => {

            try {

                let seleccionarCategorias = await fetch("http://localhost:3000/api/menu/menu/seleccionarCategoriasMenu/");

                if (!seleccionarCategorias.ok) {
                    throw new Error(`Hubo un Error: ${seleccionarCategorias.status}`)
                }

                let jsonCategoriasMenu = await seleccionarCategorias.json();
                if (jsonCategoriasMenu.status == true) {
                    setCategoriasMenu(jsonCategoriasMenu.datos)
                }
                else {
                    console.log(jsonCategoriasMenu)

                }

            } catch (error) {
                console.log(`Hubo un Error en la Funcion Seleccionar Categorias: ${error}`)
            }


        }
        // -- FIN FUNCION --

        seleccionarCategorias();


    }, [])


    //  FUNCION PARA PONER LA IMAGEN QUE SELECCIONO 

    const cambiarImagen = () => {
        const file = inputRutaImagen.current.files[0];
        // Verifica que el archivo existe y que su tipo MIME comienza con "image/"
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();

            // Cuando se termina de leer el archivo, se actualiza el src de la imagen
            reader.onload = (e) => {
                imagenMenu.current.src = e.target.result;
            };

            // Se lee el archivo como una URL de datos
            reader.readAsDataURL(file);
        } else {


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
                title: "El archivo seleccionado no es una imagen o no se ha seleccionado ningún archivo."
            });
        }
    };

    // -- FIN FUNCION --

    // FUNCION PARA INSERTAR EL MENU EN LA BASE DE DATOS

    const insertarMenu = async () => {
        if (inputRutaImagen.current.files[0] != undefined && nombreMenu.current.value != "" && precioMenu.current.value != "" && categoriaMenu.current.value != "" && descripcionMenu.current.value != "") {

            try {
                // Crear un nuevo objeto FormData
                let formData = new FormData();
                formData.append('nombreMenu', nombreMenu.current.value);
                formData.append('descripcionMenu', descripcionMenu.current.value);
                formData.append('precioMenu', precioMenu.current.value);
                formData.append('CategoriumId', categoriaMenu.current.value);
                formData.append('imagenPlatillo', inputRutaImagen.current.files[0]);

                setCargaInsertacion(true);

                // Enviar la solicitud POST
                let insertarMenu = await fetch("http://localhost:3000/api/menu/menu/InsertarMenu/",
                    {
                        method: "POST",
                        headers: {
                            "Authorization": "Bearer " + localStorage.getItem("tokenUsuario")
                        },
                        body: formData
                    }
                );

                if (!insertarMenu.ok) {
                    throw new Error(`Hubo un Error en la API al Insertar el Menu: ${insertarMenu.status}`);
                }

                let jsonInsertarMenu = await insertarMenu.json();
                setCargaInsertacion(false);

                if (jsonInsertarMenu.status == true) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Se Guardo con Exito",
                        showConfirmButton: false,
                        timer: 1500
                    }).then(() => {
                        setMenuDespliegue("inventario")
                    })
                }
                else {

                    console.log(jsonInsertarMenu);
                    Swal.fire({
                        position: "top-end",
                        icon: "error",
                        title: "Hubo un Error!!",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }

            } catch (error) {
                console.log(`Hubo un error en la Funcion Insertar Menu: ${error}`);
                setCargaInsertacion(false);
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
                    title: "Error al Guardar el Menu"
                });
            }
        } else {
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
                title: "Faltan Casillas por llenar"
            });
        }
    }

    // -- FIN FUNCION --


    return (
        <>
            <main id="main" className="main">

                {/* TITULO DEL INVENTARIO Y CATEGORIAS */}
                <div className="pagetitle">
                    <h1>Inventario Menu</h1>

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
                                                    <h1>Crear Nuevo Menu</h1>
                                                </div>
                                                <div className="btnAgregarMenu">
                                                    <button onClick={() => {
                                                        setMenuDespliegue("inventario")
                                                    }} >Cancelar</button>
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
                                                        <div className="form-floating mb-3">
                                                            <input ref={nombreMenu} type="text" className="form-control" placeholder="name@example.com" />
                                                            <label htmlFor="floatingInput">Nombre del Menu</label>
                                                        </div>
                                                        <div className="form-floating mb-3">
                                                            <input ref={precioMenu} type="number" className="form-control" placeholder="name@example.com" />
                                                            <label htmlFor="floatingInput">Precio del Menu</label>
                                                        </div>

                                                        {/* Aca voy a colocar el Select con los datos de las Categorias del Menu */}
                                                        <div className="form-floating">
                                                            <select ref={categoriaMenu} className="form-select" id="floatingSelect" aria-label="Floating label select example" defaultValue="">
                                                                <option value="" disabled>Abrir este menú de Selección</option>
                                                                {
                                                                    categoriasMenu != null ? (
                                                                        categoriasMenu.map((categorias, index) => (
                                                                            <option key={index} value={categorias.id}>{categorias.descripcion}</option>

                                                                        ))

                                                                    ) : (<></>)
                                                                }

                                                            </select>
                                                            <label htmlFor="floatingSelect">Seleccione la Categoría del Menú</label>
                                                        </div>
                                                        <div style={{ marginTop: "15px", marginBottom: "15px" }} className="form-floating">
                                                            <textarea ref={descripcionMenu} className="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style={{ height: "100px" }}></textarea>
                                                            <label htmlFor="floatingTextarea2">Escribe la Descripcion del Platillo</label>
                                                        </div>
                                                    </form>
                                                </div>
                                                <div className="col-sm-12 col-md-6 col-lg-5 col-xl-5">
                                                    <div className="contImgenMenu">
                                                        <img ref={imagenMenu} src="https://via.placeholder.com/350x200.png" className="img-preview" alt="Imagen 1" />
                                                        <input onChange={cambiarImagen} type="file" className="form-control" ref={inputRutaImagen} accept="image/*" />

                                                    </div>
                                                    <div className="btnGuardar">
                                                        {
                                                            cargaInsertacion != true ? (
                                                                <>
                                                                    <button onClick={insertarMenu} type="button" className="btn btn-primary">Guardar</button>
                                                                </>) : (
                                                                <>
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
                                                                    </div>

                                                                </>)
                                                        }
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

export default CrearMenu;