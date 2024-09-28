import { useState, useEffect } from "react";


const Cocina = () => {

    const [seleccionPedidos, setSeleccionPedidos] = useState([]);


    // FUNCION PARA CONSUMIR API PARA LLAMAR TODOS LOS PEDIDOS EN ESTADO PREPARACION

    const seleccionarPedidos = async () => {

        try {


            let pedidos = await fetch("http://localhost:3000/api/pedido/pedidosEnPreparacion/");

            if (!pedidos.ok) {
                throw new Error(`Error en la Api: ${pedidos.status}`)
            }

            let jsonConsulta = await pedidos.json();
            console.log(jsonConsulta)
            setSeleccionPedidos(jsonConsulta.datos)



        } catch (error) {
            console.log(`Hubo un Error ${error}`)
        }


    }

    // -- FIN FUNCION --

    useEffect(() => {
        seleccionarPedidos();

        const intervalId = setInterval(() => {
            seleccionarPedidos();
        }, 60000);

        return () => clearInterval(intervalId); // Limpia el intervalo cuando el componente se desmonte
    }, []);






    return (
        <>
            <main id="main" className="main">
                <div className="pageContenedor">
                    <div className="pagetitle">
                        <h1>PEDIDOS REALIZADOS</h1>

                    </div>
                </div>

                <section className="section dashboard">
                    <div className="container-fluid">
                        <div className="row">

                            {/*  ACA VA LA TARJETA CON CADA PEDIDO */}
                            {
                                seleccionPedidos.map((pedido) => (


                                    <div key={pedido.id} className="col-xxl-12 col-md-12">
                                        <div className="card info-card sales-card">
                                            <div className="row">
                                                <div className="col">
                                                    {/*  ACA VA EL TITULO DEL PEDIDO */}
                                                    <div style={{ display: "flex", justifyContent: "center", marginTop: "10px" }} className="contenTituloMenu">
                                                        <div className="tituloCategoriaMenu">
                                                            <h1>{`Pedido # ${pedido.id}`}</h1>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>



                                            <div className="row row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-4  g-3 p-3">

                                                {
                                                    pedido.DetallePedidos.map((detalle) => (


                                                        <div key={detalle.id + 135} className="col">
                                                            <div className="card text-bg-light mb-3" style={{ maxWidth: "28rem" }}>

                                                                <div className="card-header contenedorHeaderPedido">
                                                                    <div className="checkPedido">
                                                                        <input type="checkbox" value="preparado"></input>

                                                                    </div>
                                                                    <div className="headerPedido">
                                                                        {
                                                                            detalle.Menu.nombre
                                                                        }

                                                                    </div>
                                                                </div>
                                                                <div className="card-body">

                                                                    <h5 className="card-title" style={{ paddingBottom: "0", }}>{`Cantidad: ${detalle.cantidad}`}</h5>
                                                                    <div className="descripcionPedido">
                                                                        <h5 className="card-title">Descripcion:</h5>

                                                                    </div>


                                                                    <p className="card-text">{detalle.descripcion != null ? detalle.descripcion : "Con Todo"}</p>
                                                                </div>
                                                            </div>
                                                        </div>


                                                    ))
                                                }






                                            </div>




                                        </div>
                                    </div>










                                ))
                            }

                        </div>



                    </div>
                </section >
            </main >
        </>
    );
}

export default Cocina;