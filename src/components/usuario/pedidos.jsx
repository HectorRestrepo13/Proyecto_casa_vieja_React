import { useEffect, useState, useRef } from "react";
import Swal from "sweetalert2";
import { jwtDecode } from "jwt-decode";


const Pedidos = () => {

    // este va hacer el que va almacenar el array de objetos de los Item seleccionados
    const [itemSeleccionados, setItemSeleccionados] = useState([]);
    const [seleccionarCategoriaMenu, setSeleccionarCategoriaMenu] = useState("Todos");

    // este va hacer el que va guardar el id del menu del carrito para que muestre la descripcion que lleva
    const [descripcionPlatillo, setDescripcionPlatillo] = useState(null);

    // aca se va guardar el menu que devuelve la API
    const [datosMenu, setDatosMenu] = useState(null);

    let fechaActual = useRef();
    let valorTotal = useRef();
    let metodoPago = useRef();
    let inputBuscarMenu = useRef();


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

    }, [seleccionarCategoriaMenu])
    // -- FIN USE EFFECT --


    // Código para inicializar los popovers en Bootstrap ESTA EN "useEffect" para que se ejecute despues de que cargue todo
    useEffect(() => {
        // Código para inicializar los popovers en Bootstrap
        const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
        popoverTriggerList.map((popoverTriggerEl) => {
            return new window.bootstrap.Popover(popoverTriggerEl);
        });
    }, [itemSeleccionados])

    // FUNCION PARA SELECCIONAR LOS ITEM QUE VA PEDIR EL USUARIO
    const seleccionarItem = (idMenu, nombreMenu, descripcionMenu, precioMenu, imagenMenu) => {
        try {

            let arregloObjetos = [...itemSeleccionados];
            let nuevoArreglo = new Array();
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
                            platillo: descripcionMenu,
                            precio: precioMenu,
                            descripcion: null,
                            cantidad: item.cantidad + 1,
                            imagen: imagenMenu
                        };

                        nuevoArreglo = arregloObjetos;

                    }
                })

                if (itemSeleccionado === false) {
                    arregloObjetos.push({
                        id: idMenu,
                        nombre: nombreMenu,
                        platillo: descripcionMenu,
                        descripcion: null,
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
                    platillo: descripcionMenu,
                    descripcion: null,
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

    // FUNCION PARA MANDAR LOS DATOS AL MODAL 
    const mandarDatosModalCarrito = () => {

        const fecha = new Date();
        const dia = fecha.getDate().toString().padStart(2, '0');
        const mes = (fecha.getMonth() + 1).toString().padStart(2, '0'); // Los meses en JavaScript son 0-indexed, por eso se suma 1
        const anio = fecha.getFullYear();

        fechaActual.current.value = `${dia}/${mes}/${anio}`;
        valorTotal.current.value = "000"

        if (itemSeleccionados.length > 0) {
            let sumaTotal = 0;
            itemSeleccionados.map((datos) => {
                sumaTotal += datos.precio * datos.cantidad;
            })

            valorTotal.current.value = sumaTotal
        }

    }
    // -- FIN FUNCION --


    // FUNCION PARA QUITAR EL ITEM COMPLETO DEL CARRITO
    const quitarItemCompleto = (idItemMenu) => {

        let arregloNuevo = [];
        let valorItemQuitar = 0;

        itemSeleccionados.map((item) => {
            if (item.id != idItemMenu) {
                arregloNuevo.push({
                    id: item.id,
                    nombre: item.nombre,
                    platillo: item.platillo,
                    descripcion: item.descripcion,
                    precio: item.precio,
                    cantidad: item.cantidad,
                    imagen: item.imagen
                })

            }
            else if (item.id == idItemMenu) {
                valorItemQuitar = item.precio * item.cantidad;
            }
        })


        valorTotal.current.value = valorTotal.current.value - valorItemQuitar

        setItemSeleccionados(arregloNuevo)


    }
    // -- FIN FUNCION --


    // FUNCION PARA BUSCAR EL MENU POR EL NOMBRE 
    const buscarMenu = async () => {

        if (inputBuscarMenu.current.value != "") {

            try {

                let seleccionarMenuPorNombre = await fetch("http://localhost:3000/api/menu/seleccionarMenuPorNombre/" + inputBuscarMenu.current.value, {
                    method: 'GET',
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem("tokenUsuario")
                    }
                });

                if (!seleccionarMenuPorNombre.ok) {
                    throw new Error(`Hubo un Error al Consumir la APi: ${seleccionarMenuPorNombre.status}`)
                }

                let jsonSeleccionarMenuPorNombre = await seleccionarMenuPorNombre.json();

                if (jsonSeleccionarMenuPorNombre.status == true) {

                    setDatosMenu(jsonSeleccionarMenuPorNombre.datos)

                } else {

                    console.log(jsonSeleccionarMenuPorNombre)

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
                        title: "Error al Buscar el Menu"
                    });
                }


            } catch (error) {
                console.log(`Error: ${error}`)

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
                icon: "info",
                title: "Ingrese un texto para Buscar"
            });
        }




    }
    // -- FIN FUNCION --


    //  FUNCION PARA GUARDAR EL PEDIDO EN LA BASE DE DATOS
    const guardarPedidoBaseDatos = async () => {

        if (itemSeleccionados.length > 0) {

            try {

                // Decodificar el token, Aca Obtengo el ID del Usuario
                const decoded = jwtDecode(localStorage.getItem("tokenUsuario"));

                let arregloMenu = [];

                // aca meto el menu en el arreglo para enviarlo con valores que pide la API
                itemSeleccionados.map((menu) => {
                    arregloMenu.push({
                        cantidad: menu.cantidad,
                        valorUnidad: menu.precio,
                        MenuId: menu.id,
                        descripcion: null
                    })
                })

                let datosGeneralPedido = {
                    valorTotal: valorTotal.current.value,
                    metodoPago: metodoPago.current.value,
                    UsuarioId: decoded.datos[0].id,
                    datosMenu: arregloMenu,

                }

                // aca ya consumo la API y le envio los Datos
                let insertarPedido = await fetch("http://localhost:3000/api/pedido/insertarPedido/",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${localStorage.getItem("tokenUsuario")}`
                        },
                        body: JSON.stringify(datosGeneralPedido)
                    }
                )

                if (!insertarPedido.ok) {
                    throw new Error(`Hubo un Error al Insertar el Pedido en la API: ${insertarPedido.status}`)
                }

                let jsonInsertarPedido = await insertarPedido.json();

                if (jsonInsertarPedido.status === true) {

                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Pedido Guardado Exitosamente!",
                        showConfirmButton: false,
                        timer: 1500
                    }).then(() => {
                        window.location.reload();
                    })

                }
                else {

                    console.log(jsonInsertarPedido)

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
                        title: "Error al Guardar Pedido!!"
                    });
                }


            } catch (error) {

                console.log(jsonInsertarPedido)

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
                    title: "Error al Guardar Pedido!!"
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
                icon: "info",
                title: "Primero Selecciona un Pedido"
            });
        }

    }
    // -- FIN FUNCION --

    // FUNCION PARA MANDAR EL ID Y MOSTRAR LA DESCRIPCION DEL MENU DE COMO LO QUIEREN
    // pendiente
    const mostrarDescripcion = async (descripcionMenu, idMenu) => {


        const { value: password } = await Swal.fire({
            title: "Enter your password",
            input: "password",
            inputLabel: "Password",
            inputPlaceholder: "Enter your password",
            inputAttributes: {
                maxlength: "10",
                autocapitalize: "off",
                autocorrect: "off"
            }
        });
        if (password) {
            Swal.fire(`Entered password: ${password}`);
        }

        // if (descripcionMenu == null) {






        // const { value: text } = await Swal.fire({
        //     input: "textarea",
        //     inputLabel: "Descripcion Menu",
        //     inputPlaceholder: "Escribe Aqui que quiere o no quiere El Cliente",
        //     inputValue: descripcionMenu, // Aquí puedes establecer el valor inicial
        //     inputAttributes: {
        //         "aria-label": "Type your message here"
        //     },
        //     showCancelButton: true
        // });

        // if (text) {
        //     Swal.fire(text);

        // let copiaArreglo = [...itemSeleccionados]

        // copiaArreglo.map((item, index) => {

        //     if (item.id == idMenu) {
        //         copiaArreglo[index] = {
        //             id: item.id,
        //             nombre: item.nombre,
        //             platillo: item.platillo,
        //             descripcion: text,
        //             precio: item.precio,
        //             cantidad: item.cantidad,
        //             imagen: item.imagen
        //         }
        //     }

        // })

        // setItemSeleccionados(copiaArreglo)

        // }
        // }
        // else {
        //     const { value: text } = await Swal.fire({
        //         input: "textarea",
        //         inputLabel: "Descripcion Menu",
        //         inputPlaceholder: "Escribe Aqui que quiere o no quiere El Cliente",
        //         inputAttributes: {
        //             "aria-label": "Type your message here"
        //         },
        //         showCancelButton: true
        //     });

        //     if (text) {
        //         // Crear una copia del arreglo itemSeleccionados
        //         let copiaArreglo = [...itemSeleccionados];

        //         // Recorrer el arreglo para encontrar el elemento con el idMenu
        //         copiaArreglo.forEach((item, index) => {
        //             if (item.id === idMenu) {
        //                 // Actualizar el elemento encontrado
        //                 copiaArreglo[index] = {
        //                     ...item, // Copiar todas las propiedades del item original
        //                     descripcion: text // Actualizar solo la propiedad descripcion
        //                 };
        //             }
        //         });

        //         // Actualizar el estado con la copia modificada del arreglo
        //         setItemSeleccionados(copiaArreglo);
        //     }
        // }



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
                                <li onClick={() => { setSeleccionarCategoriaMenu("Menu del Dia") }} className="breadcrumb-item item6">Menu del Dia</li>



                            </ol>

                        </nav>

                    </div>
                    <div className="contenedorCarrito">
                        <nav className="header-nav ms-auto">
                            <ul className="d-flex align-items-center">


                                <li className="nav-item dropdown">

                                    <a onClick={mandarDatosModalCarrito} className="nav-link nav-icon iconoCarrito" href="#" data-bs-toggle="modal" data-bs-target="#exampleModal">
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
                                                    <input ref={inputBuscarMenu} type="text" name="query" className="form-control search-input" placeholder="Buscar..." aria-label="Buscar" />
                                                    <button onClick={buscarMenu} type="button" className="btn btn-primary search-button btnAgregar">
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
                                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel">
                                    <div className="modal-dialog modal-fullscreen">
                                        <div className="modal-content">
                                            <div className="modal-header headerPersonalizadoModal">
                                                <h1 className="modal-title fs-5" id="exampleModalLabel">PEDIDOS DEL MENÚ</h1>
                                                <button style={{ width: "85px" }} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div className="modal-body modalPersonalizado">
                                                <section className="section dashboard">
                                                    <div className="container-fluid">

                                                        <div className="row">
                                                            {/* <!-- Left side columns --> */}
                                                            <div className="col-sm-12 col-md-8 col-lg-8 col-xl-8">
                                                                {/* <!-- Sales Card --> */}
                                                                <div className="card info-card sales-card estiloPrincipalIzquierdo">
                                                                    {

                                                                        itemSeleccionados.length > 0 ? (

                                                                            <div style={{ marginTop: "1px", marginLeft: "2px", marginRight: "2px" }} className="row row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-4  g-4">


                                                                                {
                                                                                    itemSeleccionados.map((item, index) => (
                                                                                        <div key={index} className="col">
                                                                                            <div className="card h-100 cartCarrito">
                                                                                                <img src={item.imagen} className="card-img-top" />
                                                                                                <div style={{ height: "70px" }} className="card-body cartPersonalizadoModalCarrito">
                                                                                                    <div className="tituloCartModalCarrito">
                                                                                                        <h5 className="card-title">{item.nombre}</h5>

                                                                                                    </div>
                                                                                                    <div className="CantidadCartModalCarrito">
                                                                                                        <p>Cantidad:{item.cantidad}</p>


                                                                                                    </div>
                                                                                                </div>
                                                                                                <div className="card-footer footerCardPersonalizadoCarrito">
                                                                                                    <div className="btnQuitar">
                                                                                                        <button onMouseDown={() => { quitarItemCompleto(item.id) }}>Quitar</button>
                                                                                                    </div>
                                                                                                    <div className="contenDescripcion">
                                                                                                        <p role="button"
                                                                                                            data-bs-toggle="popover"
                                                                                                            data-bs-placement="right"
                                                                                                            data-bs-custom-class="custom-popover"
                                                                                                            data-bs-title="Descripcion Menú"
                                                                                                            data-bs-content={item.descripcion != null ? item.descripcion : "No Tiene Nada Nuevo Agregado"}>Platillo</p>



                                                                                                        <p onClick={() => { mostrarDescripcion(item.descripcion, item.id) }} style={{ marginLeft: "auto" }} >Descripcion</p>
                                                                                                    </div>


                                                                                                </div>




                                                                                            </div>
                                                                                        </div>

                                                                                    )
                                                                                    )

                                                                                }
                                                                            </div>
                                                                        ) : (
                                                                            <>
                                                                                <div className="container no-items-container">
                                                                                    <img
                                                                                        src="imagenMesero.jpg"
                                                                                        alt="No items"
                                                                                        className="no-items-image"
                                                                                    />
                                                                                    <p className="no-items-text">No has Seleccionado Ningun Menú</p>
                                                                                </div>
                                                                            </>
                                                                        )
                                                                    }

                                                                </div>
                                                            </div>
                                                            <div className="col-sm-12 col-md-4 col-lg-4 col-xl-4">

                                                                <div className="tituloPago">
                                                                    <h2>Descripcion Pedido</h2>
                                                                </div>

                                                                <div className="contenDatosPago">
                                                                    <div className="form-floating mb-3">
                                                                        <input ref={fechaActual} disabled type="text" className="form-control" id="floatingInput" placeholder="name@example.com" />
                                                                        <label htmlFor="floatingInput">Fecha</label>
                                                                    </div>
                                                                </div>

                                                                <div className="contenDatosPago">
                                                                    <label>Valor Total</label>
                                                                    <div className="input-group mb-3">
                                                                        <span className="input-group-text">$</span>
                                                                        <input ref={valorTotal} disabled type="number" className="form-control" aria-label="Amount (to the nearest dollar)" />
                                                                    </div>
                                                                </div>

                                                                <div className="contenDatosPago">
                                                                    <div className="form-floating">
                                                                        <select
                                                                            className="form-select"
                                                                            id="floatingSelect"
                                                                            aria-label="Floating label select example"
                                                                            defaultValue="Pendiente"
                                                                            ref={metodoPago}
                                                                        >
                                                                            <option value="Pendiente">Pendiente</option>
                                                                            <option value="Efectivo">Efectivo</option>
                                                                            <option value="Tarjeta">Tarjeta</option>
                                                                            <option value="Transferencia">Transferencia</option>
                                                                        </select>
                                                                        <label htmlFor="floatingSelect">Seleccione el Metodo de Pago</label>
                                                                    </div>
                                                                </div>

                                                                <div className="contenBotonPedido">
                                                                    <button onClick={guardarPedidoBaseDatos} type="button" className="btn btn-primary">Realizar Pedido</button>
                                                                </div>
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