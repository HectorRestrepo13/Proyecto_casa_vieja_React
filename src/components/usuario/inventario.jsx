import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const Inventario = () => {

    const [seleccionarCategoriaMenu, setSeleccionarCategoriaMenu] = useState("Todos");
    const [datosMenu, setDatosMenu] = useState(null);




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
                        console.log(jsonSeleccionarMenu)

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





    return (
        <>
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
                                                    <button>Agregar</button>
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
                                                                                <button>Editar</button>
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
    );
}

export default Inventario;