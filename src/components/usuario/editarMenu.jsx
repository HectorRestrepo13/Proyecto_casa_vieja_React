import { useEffect, useState, useRef } from "react";
import Swal from "sweetalert2";


const Editar = ({ datosMenuEditar, setEditarMenu }) => {


    let imagenMenu = useRef(null);
    let inputRutaImagen = useRef(null);
    let nombreMenu = useRef(null);
    let precioMenu = useRef(null);
    let descripcionMenu = useRef(null);
    let categoriaMenu = useRef(null);
    let idMenu = useRef(null);

    const [categoriasMenu, setCategoriasMenu] = useState(null);
    const [cargaUpdate, setCargaUpdate] = useState(false);


    //  ACA VA ESTAR LA FUNCION DONDE VA TRAER LAS CATEGORIAS DE LA API PARA QUE MUESTRE EN LA PAGINA DE EDITAR
    // Y TAMBIEN VA MANDAR LOS DATOS DEL MENU A EDITAR
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

        // aca envio los datos a los inpus
        imagenMenu.current.src = datosMenuEditar.UrlImagen;
        nombreMenu.current.value = datosMenuEditar.nombre;
        precioMenu.current.value = datosMenuEditar.precio;
        descripcionMenu.current.value = datosMenuEditar.descripcion;

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


    //  FUNCION PARA MANDAR LOS DATOS Y EDITAR EL MENU

    const updateMenu = async () => {

        if (nombreMenu.current.value != "" && precioMenu.current.value != "" && categoriaMenu.current.value != "" && descripcionMenu.current.value != "") {

            try {

                // ACA VERIFICO SI EL USUARIO ESTA MANDANDO UNA IMAGEN O NO, SI LA MANDA LO ENVIO POR EL FORM-DATA SINO NO
                if (inputRutaImagen.current.files[0] != undefined) {

                    let formData = new FormData();
                    formData.append("imagenPlatillo", inputRutaImagen.current.files[0]);

                    setCargaUpdate(true);

                    let updateMenu = await fetch(`http://localhost:3000/api/menu/menu/EditarMenu/?nombreMenu=${nombreMenu.current.value}&descripcionMenu=${descripcionMenu.current.value}&precioMenu=${precioMenu.current.value}&idMenu=${idMenu.current.value}&idCategoria=${categoriaMenu.current.value}`, {
                        method: "PUT",
                        body: formData,
                        headers: {
                            "Authorization": "Bearer " + localStorage.getItem("tokenUsuario"),
                        }
                    })

                    if (!updateMenu.ok) {
                        throw new Error(`Hubo un Error en la API al Editar: ${updateMenu.status}`)
                    }

                    let jsonUpdateMenu = await updateMenu.json();
                    setCargaUpdate(false);

                    // aca verifico si la api devolvio un error

                    if (jsonUpdateMenu.status == true) {
                        // aca verifico si se actualizo 

                        if (jsonUpdateMenu.datos > 0) {

                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: "Se Actualizo con Exito!!",
                                showConfirmButton: false,
                                timer: 1500
                            }).then(() => {
                                setEditarMenu(null)
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
                                icon: "info",
                                title: "No se pudo Actualizar el Menu."
                            });

                        }



                    } else {

                        console.log(jsonUpdateMenu)


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

                }
                else {

                    setCargaUpdate(true);

                    let updateMenu = await fetch(`http://localhost:3000/api/menu/menu/EditarMenu/?nombreMenu=${nombreMenu.current.value}&descripcionMenu=${descripcionMenu.current.value}&precioMenu=${precioMenu.current.value}&idMenu=${idMenu.current.value}&idCategoria=${categoriaMenu.current.value}`, {
                        method: "PUT",
                        headers: {
                            "Authorization": "Bearer " + localStorage.getItem("tokenUsuario"),
                        }
                    })

                    if (!updateMenu.ok) {
                        throw new Error(`Hubo un Error en la API al Editar: ${updateMenu.status}`)
                    }

                    let jsonUpdateMenu = await updateMenu.json();
                    setCargaUpdate(false)
                    // aca verifico si la api devolvio un error

                    if (jsonUpdateMenu.status == true) {
                        // aca verifico si se actualizo 

                        if (jsonUpdateMenu.datos > 0) {

                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: "Se Actualizo con Exito!!",
                                showConfirmButton: false,
                                timer: 1500
                            }).then(() => {
                                setEditarMenu(null)
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
                                icon: "info",
                                title: "No se pudo Actualizar el Menu."
                            });

                        }



                    } else {

                        console.log(jsonUpdateMenu)


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

                }


            } catch (error) {

                console.log(`Hubo un Error ${error}`)

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
                title: "Faltan Casillas Por llenar"
            });
        }

    }

    // -- FIN FUNCION --


    return (
        <>
            {/* PAGINA DE EDITAR EL MENU */}
            <main id="main" className="main">

                {/* TITULO DEL INVENTARIO Y CATEGORIAS */}
                <div className="pagetitle">
                    <h1>Inventario Menú</h1>

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
                                                    <h1>Editar Menu</h1>
                                                </div>
                                                <div className="btnAgregarMenu">
                                                    <button onClick={() => {
                                                        setEditarMenu(null)
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
                                                        <input hidden ref={idMenu} defaultValue={datosMenuEditar.id} type="text" />
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
                                                            <select
                                                                ref={categoriaMenu}
                                                                className="form-select"
                                                                id="floatingSelect"
                                                                aria-label="Floating label select example"
                                                                defaultValue={datosMenuEditar.idCategoria} // Asigna el valor predeterminado al ID de la categoría
                                                            >
                                                                <option value={datosMenuEditar.idCategoria} disabled>
                                                                    {datosMenuEditar.categoria}
                                                                </option>
                                                                {categoriasMenu != null ? (
                                                                    categoriasMenu.map((categorias, index) => (
                                                                        <option key={index} value={categorias.id}>
                                                                            {categorias.descripcion}
                                                                        </option>
                                                                    ))
                                                                ) : (
                                                                    <></>
                                                                )}
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
                                                            cargaUpdate != true ? (
                                                                <>
                                                                    <button onClick={updateMenu} type="button" className="btn btn-primary">Guardar</button>
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

export default Editar;