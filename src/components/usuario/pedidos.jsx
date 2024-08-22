import { useEffect, useState, useRef } from "react";
import Swal from "sweetalert2";


const Pedidos = () => {

    // este va hacer el que va almacenar el array de objetos de los Item seleccionados
    const [itemSeleccionados, setItemSeleccionados] = useState([]);
    const [seleccionarCategoriaMenu, setSeleccionarCategoriaMenu] = useState("Todos");
    // aca se va guardar el menu que devuelve la API
    const [datosMenu, setDatosMenu] = useState(null);



    // FUNCION PARA SELECCIONAR EL MENU
    const seleccionarMenuCategoria = async () => {

        try {

            // aca voy hacer una desicion donde se va colocar el ID de la llave foranea de la categoria del menu
            let llaveForanea;
            if (seleccionarCategoriaMenu != "Todos" && seleccionarCategoriaMenu != "Inactivo") {

                // SI ENTRA AQUI ES PORQUE ESCOGIO UNA CATEGORIA ENTONCES ES PARA CONSUMIR LA API QUE TRAE EL MENU POR CATEGORIA

                switch (seleccionarCategoriaMenu) {
                    case "Entradas":
                        llaveForanea = 1;
                        break;
                    case "Platos Fuertes":
                        llaveForanea = 2;
                        break;
                    case "Postres":
                        llaveForanea = 3;
                        break;
                    case "Licores":
                        llaveForanea = 4;
                        break;
                    case "Bebidas":
                        llaveForanea = 5;
                        break;
                    case "Infantil":
                        llaveForanea = 6;
                        break;
                    default:
                        llaveForanea = null;
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

                let estado = "activo";
                if (seleccionarCategoriaMenu == "Inactivo") {
                    estado = "inactivo"
                }

                // ACA VA CONSUMIR LA API QUE TRAE TODO EL MENU

                let seleccionarMenu = await fetch("http://localhost:3000/api/menu/menu/selecionarTodosLosMenus/" + estado, {
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
    useEffect(() => {

        seleccionarMenuCategoria(); // llamar la funcion

    }, [seleccionarCategoriaMenu])
    // -- FIN USE EFFECT --

    // FUNCION PARA SELECCIONAR LOS ITEM QUE VA PEDIR EL USUARIO

    const seleccionarItem = (idMenu, nombreMenu, descripcionMenu, precioMenu, imagenMenu) => {
        try {

            let arregloObjetos = [...itemSeleccionados];
            console.log(arregloObjetos)

            if (arregloObjetos.length > 0) {

                // este boolean es para saber si el Item que selecciono ya esta, entonces con el ciclo voy a recorrer todo
                // y si entra a la decicion va hacer "true" osea que ya esta ese item
                let itemSeleccionado = false;
                arregloObjetos.map((item, index) => {

                    if (item.id == idMenu) {
                        itemSeleccionado = true;

                        arregloObjetos[index] = {
                            id: idMenu,
                            nombre: nombreMenu,
                            descripcion: descripcionMenu,
                            precio: precioMenu,
                            cantidad: item.cantidad + 1,
                            imagen: imagenMenu
                        };

                    }
                })

                if (itemSeleccionado === false) {
                    arregloObjetos.push({
                        id: idMenu,
                        nombre: nombreMenu,
                        descripcion: descripcionMenu,
                        precio: precioMenu,
                        cantidad: 1,
                        imagen: imagenMenu

                    })
                }

                setItemSeleccionados(arregloObjetos);

            }
            else {

                arregloObjetos.push({
                    id: idMenu,
                    nombre: nombreMenu,
                    descripcion: descripcionMenu,
                    precio: precioMenu,
                    cantidad: 1,
                    imagen: imagenMenu

                })

                setItemSeleccionados(arregloObjetos);

            }


        } catch (error) {
            console.log(`Hubo un Error en la Funcion seleccionarItem: ${error}`)

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

    // -- FIN FUNCION --

    return (
        <>
            {/* ACA SE MUESTRA EL INVENTARIO */}
            <main id="main" className="main">

                {/* TITULO DEL INVENTARIO Y CATEGORIAS */}
                <div className="pageContenedor">
                    <div className="pagetitle">
                        <h1>Agregar Nuevo Pedido</h1>
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
                    <div className="contenedorCarrito">
                        <nav className="header-nav ms-auto">
                            <ul className="d-flex align-items-center">


                                <li className="nav-item dropdown">

                                    <a className="nav-link nav-icon iconoCarrito" href="#" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="currentColor" className="bi bi-cart4" viewBox="0 0 16 16">
                                            <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l.5 2H5V5zM6 5v2h2V5zm3 0v2h2V5zm3 0v2h1.36l.5-2zm1.11 3H12v2h.61zM11 8H9v2h2zM8 8H6v2h2zM5 8H3.89l.5 2H5zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0m9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0" />
                                        </svg>
                                        <span className="badge bg-primary badge-number">{itemSeleccionados.length}</span>
                                    </a>
                                    {/* <!-- End Notification Icon --> */}

                                </li>
                                {/* <!-- End Notification Nav --> */}

                            </ul>
                        </nav>
                    </div>
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
                                        <div className="col-sm-12 col-md-5 col-lg-5 col-xl-5">
                                            <div style={{ display: "flex", justifyContent: "center", marginTop: "10px" }} className="contenTituloMenu">
                                                <div className="tituloCategoriaMenu">
                                                    <h1>{seleccionarCategoriaMenu}</h1>
                                                </div>


                                            </div>

                                        </div>
                                        <div className="col-sm-12 col-md-7 col-lg-7 col-xl-7">
                                            <div className="contenedorInputBusqueda">
                                                <form className="d-flex">
                                                    <input type="text" name="query" className="form-control search-input" placeholder="Buscar..." aria-label="Buscar" />
                                                    <button type="button" className="btn btn-primary search-button btnAgregar">
                                                        <i className="bi bi-search"></i> Buscar
                                                    </button>
                                                </form>
                                            </div>
                                        </div>

                                    </div>
                                    {/* FILA DEL MENU */}
                                    <div style={{ marginLeft: "20px", display: "flex", justifyContent: "space-between", marginBottom: "40px" }} className="row">
                                        <div className="row row-cols-sm-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-3  g-4">
                                            {
                                                datosMenu != null ?
                                                    datosMenu.length > 0 ? (
                                                        datosMenu.map((menu, index) => (
                                                            <div className="col" key={index}>
                                                                <div className="cardd">
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

                                                                            <div className="secundariBotonAgregarCarrito">
                                                                                <button onClick={() => { seleccionarItem(menu.id, menu.nombre, menu.descripcion, menu.precio, menu.UrlImagen) }}><i className="bi bi-cart4"></i> Agregar</button>
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
                        {/* <!-- Modal --> */}

                        <div className="row">
                            <div className="col">
                                {/* <!-- Modal --> */}
                                <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div className="modal-dialog modal-fullscreen">
                                        <div className="modal-content">
                                            <div className="modal-header headerPersonalizadoModal">
                                                <h1 className="modal-title fs-5" id="exampleModalLabel">PEDIDOS DEL MENÚ</h1>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div className="modal-body modalPersonalizado">
                                                <section className="section dashboard">
                                                    <div className="container-fluid">

                                                        <div className="row">
                                                            {/* <!-- Left side columns --> */}
                                                            <div className="col-sm-12 col-md-8 col-lg-8 col-xl-8">
                                                                {/* <!-- Sales Card --> */}
                                                                <div className="card info-card sales-card estiloPrincipalIzquierdo">
                                                                    <div className="container no-items-container">
                                                                        <img
                                                                            src="imagenMesero.jpg"
                                                                            alt="No items"
                                                                            className="no-items-image"
                                                                        />
                                                                        <p className="no-items-text">No has Seleccionado Ningun Menú</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-sm-12 col-md-4 col-lg-4 col-xl-4">

                                                            </div>
                                                        </div>
                                                    </div>



                                                </section>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* FIN MODAL */}
                    </div>
                </section >
                {/* <!-- FIN PAGINA CART --> */}

            </main >
            {/* < !--End #main -- > */}
        </>
    );
}

export default Pedidos;