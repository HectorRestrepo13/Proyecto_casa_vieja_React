import { useEffect, useState, useRef } from "react";
import Swal from "sweetalert2";
import Editar from "./editarMenu";

const Inventario = ({ setMenuDespliegue }) => {

    const [seleccionarCategoriaMenu, setSeleccionarCategoriaMenu] = useState("Todos");
    const [cargaActulizacionEstado, setCargaActulizacionEstado] = useState(false);


    // aca se va guardar el menu que devuelve la API
    const [datosMenu, setDatosMenu] = useState(null);
    // aca se va guardar los datos del item seleccionado para editar
    const [editarMenu, setEditarMenu] = useState(null);


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
                    case "Menu del Dia":
                        llaveForanea = 7;
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

    }, [seleccionarCategoriaMenu, editarMenu])


    // FUNCION PARA EDITAR EL ESTADO DEL  ITEM DEL MENU

    const editarEstadoMenu = async (nuevoEstado, idMenu) => {
        try {

            setCargaActulizacionEstado(true);

            let updateEstadoMenu = await fetch("http://localhost:3000/api/menu/anularItemMenu/", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("tokenUsuario")}`
                },
                body: JSON.stringify({
                    idMenu: idMenu,
                    nuevoEstado: nuevoEstado
                })
            })

            if (!updateEstadoMenu.ok) {
                throw new Error(`Hubo un error al Consumir la APi: ${updateEstadoMenu.status}`)
            }

            let jsonUpdate = await updateEstadoMenu.json();

            setCargaActulizacionEstado(false);

            if (jsonUpdate.status == true) {

                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: jsonUpdate.descripcion,
                    showConfirmButton: false,
                    timer: 1500
                }).then(() => {

                    window.location.reload();
                })

            }
            else {
                console.log(jsonUpdate)

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


        } catch (error) {

            console.log(`Error: ${error}`)
            setCargaActulizacionEstado(false);
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
                                        <li onClick={() => { setSeleccionarCategoriaMenu("Menu del Dia") }} className="breadcrumb-item item6">Menu del Dia</li>
                                        <li onClick={() => { setSeleccionarCategoriaMenu("Inactivo") }} className="breadcrumb-item item6">Inactivos</li>


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
                                                                                        <div className="secundariBotonAnular">
                                                                                            {
                                                                                                cargaActulizacionEstado == false ? (
                                                                                                    <>
                                                                                                        <button onClick={() => {
                                                                                                            editarEstadoMenu(menu.estado == "activo" ? "inactivo" : "activo", menu.id)
                                                                                                        }} >{menu.estado == "activo" ? "Anular" : "Activar"}</button>
                                                                                                    </>) : (
                                                                                                    <>
                                                                                                        <button class="btn btn-primary" type="button" disabled>
                                                                                                            <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
                                                                                                        </button>
                                                                                                    </>
                                                                                                )
                                                                                            }

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
                                                                                                        UrlImagen: menu.UrlImagen,
                                                                                                        idCategoria: menu.idCategoria
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
                ) : <Editar setEditarMenu={setEditarMenu} datosMenuEditar={editarMenu}></Editar>
            }

        </>
    );
}

export default Inventario;