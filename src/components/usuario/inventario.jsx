import { useEffect, useState, useRef } from "react";
import Swal from "sweetalert2";

const Inventario = ({ setMenuDespliegue }) => {

    const [seleccionarCategoriaMenu, setSeleccionarCategoriaMenu] = useState("Todos");
    const [datosMenu, setDatosMenu] = useState(null);
    const [editarMenu, setEditarMenu] = useState(null);

    useEffect(() => {
        // FUNCION PARA SELECCIONAR EL MENU
        const seleccionarMenuCategoria = async () => {

            try {

                // aca voy hacer una desicion donde se va colocar el ID de la llave foranea de la categoria del menu
                let llaveForanea;
                if (seleccionarCategoriaMenu != "Todos") {

                    // SI ENTRA AQUI ES PORQUE ESCOGIO UNA CATEGORIA ENTONCES ES PARA CONSUMIR LA API QUE TRAE EL MENU POR CATEGORIA

                    if (seleccionarCategoriaMenu == "Entradas") {
                        llaveForanea = 1;
                    } else if (seleccionarCategoriaMenu == "Platos Fuertes") {
                        llaveForanea = 2;
                    } else if (seleccionarCategoriaMenu == "Postres") {
                        llaveForanea = 3;
                    } else if (seleccionarCategoriaMenu == "Licores") {
                        llaveForanea = 4;
                    } else if (seleccionarCategoriaMenu == "Bebidas") {
                        llaveForanea = 5;
                    } else if (seleccionarCategoriaMenu == "Infantil") {
                        llaveForanea = 6;
                    }

                    let seleccionarMenu = await fetch("http://localhost:3000/api/menu/menu/selecionarMenuEspecificoCategoria/", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": "Bearer " + localStorage.getItem("tokenUsuario"),
                        }
                        ,
                        body: JSON.stringify({ idCategoria: llaveForanea })
                    })

                    if (!seleccionarMenu.ok) {
                        throw new Error(`Hubo un Error al Consumir la API: ${seleccionarMenu.status}`)
                    }


                    let jsonSeleccionarMenu = await seleccionarMenu.json();

                    if (jsonSeleccionarMenu.status == true) {
                        setDatosMenu(jsonSeleccionarMenu.datos)

                    }
                    else {
                        console.log(jsonSeleccionarMenu)
                        Swal.fire({
                            title: "Hubo un Error!!",
                            text: "Error en la API",
                            icon: "error"
                        });
                    }





                } else {

                    // ACA VA CONSUMIR LA API QUE TRAE TODO EL MENU

                    let seleccionarMenu = await fetch("http://localhost:3000/api/menu/menu/selecionarTodosLosMenus/", {
                        headers: {
                            "Authorization": "Bearer " + localStorage.getItem("tokenUsuario"),
                        }
                        ,
                    })

                    if (!seleccionarMenu.ok) {
                        throw new Error(`Hubo un Error al Consumir la API: ${seleccionarMenu.status}`)
                    }


                    let jsonSeleccionarMenu = await seleccionarMenu.json();

                    if (jsonSeleccionarMenu.status == true) {
                        setDatosMenu(jsonSeleccionarMenu.datos)
                    }
                    else {
                        console.log(jsonSeleccionarMenu)
                        Swal.fire({
                            title: "Hubo un Error!!",
                            text: "Error en la API",
                            icon: "error"
                        });
                    }

                }


            } catch (error) {
                console.log(`Hubo un error al Consumir la API: ${error}`)

                Swal.fire({
                    title: "Hubo un Error!!",
                    text: "Hubo un error al seleccionar el Menu",
                    icon: "error"
                });
            }


        }

        // -- FIN FUNCION --
        seleccionarMenuCategoria();


    }, [seleccionarCategoriaMenu])


    // ACA VA A ESTAR LAS FUNCIONALIDADES DEL EDITAR ITEM 

    let imagenMenu = useRef(null);
    let inputRutaImagen = useRef(null);
    let nombreMenu = useRef(null);
    let precioMenu = useRef(null);
    let descripcionMenu = useRef(null);
    let categoriaMenu = useRef(null);

    const [categoriasMenu, setCategoriasMenu] = useState(null);
    const [cargaInsertacion, setCargaInsertacion] = useState(false);


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

        //  imagenMenu.current.value =;
        //  inputRutaImagen.current.value =;
        nombreMenu.current.value = editarMenu.nombre;
        precioMenu.current.value = editarMenu.precio;
        descripcionMenu.current.value = editarMenu.descripcion;
        //  categoriaMenu.current.value =;

        seleccionarCategorias();




    }, [editarMenu])

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

    return (

        <>
            {
                editarMenu == null ? (
                    <>
                        {/* ACA SE MUESTRA EL INVENTARIO */}
                        <main id="main" className="main">

                            {/* TITULO DEL INVENTARIO Y CATEGORIAS */}
                            <div className="pagetitle">
                                <h1>Inventario Menu</h1>
                                <nav>
                                    <ol className="breadcrumb">
                                        <li onClick={() => { setSeleccionarCategoriaMenu("Todos") }} className="breadcrumb-item item1 active">Todos</li>
                                        <li onClick={() => { setSeleccionarCategoriaMenu("Entradas") }} className="breadcrumb-item item2">Entradas</li>
                                        <li onClick={() => { setSeleccionarCategoriaMenu("Platos Fuertes") }} className="breadcrumb-item item3">Platos Fuertes</li>
                                        <li onClick={() => { setSeleccionarCategoriaMenu("Licores") }} className="breadcrumb-item item4">Licores</li>
                                        <li onClick={() => { setSeleccionarCategoriaMenu("Bebidas") }} className="breadcrumb-item item5">Bebidas</li>
                                        <li onClick={() => { setSeleccionarCategoriaMenu("Postres") }} className="breadcrumb-item item6">Postres</li>
                                        <li onClick={() => { setSeleccionarCategoriaMenu("Infantil") }} className="breadcrumb-item item6">Infantil</li>

                                    </ol>
                                </nav>
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
                                                                <h1>{seleccionarCategoriaMenu}</h1>
                                                            </div>
                                                            <div className="btnAgregarMenu">
                                                                <button onClick={() => { setMenuDespliegue("crearNuevoMenu") }}>Agregar</button>
                                                            </div>
                                                        </div>

                                                    </div>

                                                </div>
                                                {/* FILA DEL MENU */}
                                                <div style={{ marginLeft: "20px", display: "flex", justifyContent: "space-between" }} className="row">
                                                    <div className="row row-cols-sm-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-3  g-4">
                                                        {
                                                            datosMenu != null ?
                                                                datosMenu.length > 0 ? (
                                                                    datosMenu.map((menu, index) => (
                                                                        <div className="col" key={index}>
                                                                            <div className="card">
                                                                                <img
                                                                                    style={{ height: "150px" }}
                                                                                    src={menu.UrlImagen}
                                                                                    className="card-img-top imagenCart"
                                                                                    alt={menu.nombre}
                                                                                />
                                                                                <div className="card-body cardPersonalizado">
                                                                                    <div className="titulo">
                                                                                        <h5 className="card-title tituloCart">{menu.nombre}</h5>
                                                                                        <div className="contePrecio">
                                                                                            <h6 style={{ marginLeft: "1pt", fontSize: "25px" }} className="card-title precio">${menu.precio}</h6>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="miniDescripcion">
                                                                                        <div className="estadoCart">
                                                                                            <p style={{ marginLeft: "5px" }}>Estado:</p>
                                                                                            <p style={{ marginLeft: "5px", color: menu.estado == "activo" ? "#198754" : "red" }}>{menu.estado}</p>
                                                                                        </div>
                                                                                        <div className="categoriaCart">
                                                                                            <p>Categoria:</p>
                                                                                            <p style={{ marginLeft: "5px" }}>{menu.categoria}</p>
                                                                                        </div>
                                                                                    </div>
                                                                                    <p className="card-text textoCart">
                                                                                        {menu.descripcion}
                                                                                    </p>
                                                                                    <div className="contBotones">
                                                                                        <div className="secundariBotonAnular">
                                                                                            <button>Anular</button>
                                                                                        </div>
                                                                                        <div className="secundariBotonEditar">
                                                                                            <button
                                                                                                onClick={() => {
                                                                                                    setEditarMenu({
                                                                                                        id: menu.id,
                                                                                                        nombre: menu.nombre,
                                                                                                        precio: menu.precio,
                                                                                                        categoria: menu.categoria,
                                                                                                        descripcion: menu.descripcion,
                                                                                                        estado: menu.estado,
                                                                                                        UrlImagen: menu.UrlImagen
                                                                                                    })
                                                                                                }}
                                                                                            >Editar</button>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    ))
                                                                ) : (
                                                                    <>
                                                                        {/* ESTE ES LO QUE LE APARECERA SI NO TIENE MENU EN ESA CATEGORIA */}
                                                                        <div className="empty-container">
                                                                            <div className="text-center">
                                                                                {/* <!-- Icono de alerta --> */}
                                                                                <div className="empty-icon">
                                                                                    <i className="bi bi-folder-x"></i>
                                                                                </div>
                                                                                {/* <!-- Texto de categoría vacía --> */}
                                                                                <div className="empty-text mt-3">
                                                                                    <h4>No hay elementos en esta categoría</h4>
                                                                                    <p>Por favor, intente con otra categoría o vuelva más tarde.</p>
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                    </>
                                                                ) : (<>
                                                                    {/* ESTE ES LO QUE APARECERA AL USUARIO MIENTRAS ESPERA LA CARGA DE LA API */}
                                                                    <div className="loading-container">
                                                                        <div className="text-center">
                                                                            {/* <!-- Spinner de carga --> */}
                                                                            <div className="spinner-border text-primary" role="status">
                                                                                <span className="visually-hidden">Cargando...</span>
                                                                            </div>
                                                                            {/* <!-- Texto de carga --> */}
                                                                            <div className="loading-text">Cargando, por favor espere...</div>
                                                                        </div>
                                                                    </div>
                                                                </>)

                                                        }




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
                ) : (
                    <>
                        {/* PAGINA DE EDITAR EL MENU */}
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
                                                                                <button type="button" className="btn btn-primary">Guardar</button>
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
                    </>)
            }

        </>
    );
}

export default Inventario;