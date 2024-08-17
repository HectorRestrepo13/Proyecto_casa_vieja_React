const Inventario = () => {
    return (
        <>
            <main id="main" className="main">

                {/* TITULO DEL INVENTARIO Y CATEGORIAS */}
                <div className="pagetitle">
                    <h1>Inventario Menu</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item item1 active">Todo</li>
                            <li className="breadcrumb-item item2">Entradas</li>
                            <li className="breadcrumb-item item3">Platos Fuertes</li>
                            <li className="breadcrumb-item item4">Licores</li>
                            <li className="breadcrumb-item item5">Bebidas</li>
                            <li className="breadcrumb-item item6">Postres</li>

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
                                                    <h1>Entradas</h1>                                                </div>
                                                <div className="btnAgregarMenu">
                                                    <button>Agregar</button>
                                                </div>
                                            </div>

                                        </div>

                                    </div>
                                    {/* FILA DEL MENU */}
                                    <div style={{ marginLeft: "20px", display: "flex", justifyContent: "space-between" }} className="row">
                                        <div class="row row-cols-sm-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-3  g-4">
                                            <div class="col">
                                                <div class="card">
                                                    <img style={{ height: "150px" }} src="hamburguesa.png" class="card-img-top imagenCart" alt="..." />
                                                    <div class="card-body cardPersonalizado">
                                                        <div className="titulo">
                                                            <h5 class="card-title tituloCart">Hamburguesa a la Parrilla </h5>
                                                            <div className="contePrecio">
                                                                <h6 class="card-title precio">$25500</h6>

                                                            </div>

                                                        </div>
                                                        <div className="miniDescripcion">
                                                            <div className="estadoCart">
                                                                <p style={{ marginLeft: "5px" }}> Estado:</p>
                                                                <p style={{ marginLeft: "5px", color: "#198754" }}>Activo</p>

                                                            </div>
                                                            <div className="categoriaCart">
                                                                <p>Categaria:</p>
                                                                <p style={{ marginLeft: "5px" }}>Plato fuerte</p>


                                                            </div>
                                                        </div>
                                                        <p class="card-text textoCart">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
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
                                            <div class="col">
                                                <div class="card">
                                                    <img style={{ height: "150px" }} src="hamburguesa.png" class="card-img-top imagenCart" alt="..." />
                                                    <div class="card-body cardPersonalizado">
                                                        <div className="titulo">
                                                            <h5 class="card-title tituloCart">Hamburguesa a la Parrilla </h5>
                                                            <div className="contePrecio">
                                                                <h6 class="card-title precio">$2500</h6>

                                                            </div>

                                                        </div>
                                                        <div className="miniDescripcion">
                                                            <div className="estadoCart">
                                                                <p style={{ marginLeft: "5px" }}> Estado:</p>
                                                                <p style={{ marginLeft: "5px" }}>Activo</p>

                                                            </div>
                                                            <div className="categoriaCart">
                                                                <p>Categaria:</p>
                                                                <p style={{ marginLeft: "5px" }}>Plato fuerte</p>


                                                            </div>
                                                        </div>
                                                        <p class="card-text textoCart">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
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

                                            <div class="col">
                                                <div class="card">
                                                    <img style={{ height: "150px" }} src="hamburguesa.png" class="card-img-top imagenCart" alt="..." />
                                                    <div class="card-body cardPersonalizado">
                                                        <div className="titulo">
                                                            <h5 class="card-title tituloCart">Hamburguesa a la Parrilla </h5>
                                                            <div className="contePrecio">
                                                                <h6 class="card-title precio">$2500</h6>

                                                            </div>

                                                        </div>
                                                        <div className="miniDescripcion">
                                                            <div className="estadoCart">
                                                                <p style={{ marginLeft: "5px" }}> Estado:</p>
                                                                <p style={{ marginLeft: "5px" }}>Activo</p>

                                                            </div>
                                                            <div className="categoriaCart">
                                                                <p>Categaria:</p>
                                                                <p style={{ marginLeft: "5px" }}>Plato fuerte</p>


                                                            </div>
                                                        </div>
                                                        <p class="card-text textoCart">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
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
                                            <div class="col">
                                                <div class="card">
                                                    <img style={{ height: "150px" }} src="hamburguesa.png" class="card-img-top imagenCart" alt="..." />
                                                    <div class="card-body cardPersonalizado">
                                                        <div className="titulo">
                                                            <h5 class="card-title tituloCart">Hamburguesa a la Parrilla </h5>
                                                            <div className="contePrecio">
                                                                <h6 class="card-title precio">$2500</h6>

                                                            </div>

                                                        </div>
                                                        <div className="miniDescripcion">
                                                            <div className="estadoCart">
                                                                <p style={{ marginLeft: "5px" }}> Estado:</p>
                                                                <p style={{ marginLeft: "5px" }}>Activo</p>

                                                            </div>
                                                            <div className="categoriaCart">
                                                                <p>Categaria:</p>
                                                                <p style={{ marginLeft: "5px" }}>Plato fuerte</p>


                                                            </div>
                                                        </div>
                                                        <p class="card-text textoCart">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
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