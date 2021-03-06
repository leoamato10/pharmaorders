import React, { useState, useEffect } from "react";
import "./App.css";
import { db } from "./database";
import "firebase/firestore";

function App() {
  // const [orders, setOrders] = useState([]);
  const [orderStatus, setOrderStatus] = useState("not order added yet");
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [locationStatus, setLocationStatus] = useState(null);
  const [checked, setChecked] = useState(false);
  const [state, setState] = useState({
    latitude: "",
    longitude: "",
    status: false,
  });

  const getLocation = () => {
    if (!navigator.geolocation) {
      setLocationStatus("Geolocation is not supported by your browser");
    } else {
      setLocationStatus("Locating...");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocationStatus(null);
          setLat(position.coords.latitude);
          setLng(position.coords.longitude);
        },
        () => {
          setLocationStatus("Unable to retrieve your location");
        }
      );
    }
  };

  const addItem = async () => {
    try {
      await db.collection("orders").add({
        bussisnessId: "4ntCBmHQwgHP4zB8x", //ID del negocio si aplica
        busisnessName: "TicTeams", //Nombre del negocio
        busisnesslogo: "logo", //URL del logo del negocio
        deliveryId: "", // al registrar un nuevo pedido no tiene delivery
        status: "PORCONFIRMAR",
        isAssigned: checked,
        orderdetails: [
          {
            amount: 2, // double
            productId: 15, //idproducto
            productdescription: "esta es la descripcion", //descripcionproducto
            price: Number(55).toFixed(2), //precio
          },
        ], //arreglo de objetos items.
        rating: 0, //rating del pedido
        subtotal: Number(55).toFixed(2), //cantidad total antes ed impuesto
        iva: Number(55) * 10.5, //total impuesto
        total: Number(55 + 55 * 10.5 + 5).toFixed(2), //total completo
        deliverycharge: 5, //cargo de dellivery del pedido por ejemplo la comisi??n del delivery.
        delivereddate: null, // delivery
        paymethod: "card", //netodo de pago
        customeraddress: {
          latitude: state.latitude,
          longitude: state.longitude,
        }, //Direcci??n de entrega del cliente
        marketaddress: { latitude: 0, longitude: 0 }, //Direcci??n del local
        cardId: 1, //id de tarjeta de la colecci??n de tarjetas si es que aplica.
        sessionId: 1,
      });
      setOrderStatus("order added");
    } catch (error) {
      console.log(error);
      setOrderStatus("error al a??adir orden");
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  const handleLatitude = (lat) => {
    setState({
      latitude: lat.target.value,
      longitude: state.longitude,
    });
  };
  const handleLongitude = (long) => {
    setState({
      latitude: state.latitude,
      longitude: long.target.value,
      status: false,
    });
  };

  const handleSubmit = (event) => {
    // setState({ latitude: state.latitude, longitude: state.long });
    event.preventDefault();
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Coordinates</h1>
        {locationStatus ? (
          <p>{locationStatus}</p>
        ) : (
          <div>
            {lat && <p>Latitude: {lat}</p>}
            {lng && <p>Longitude: {lng}</p>}
            <div>
              <form onSubmit={handleSubmit}>
                <label>
                  new latitude:
                  <input
                    type="text"
                    value={state.latitude}
                    onChange={(lat) => handleLatitude(lat)}
                  />
                </label>
                <label>
                  new longitude:
                  <input
                    type="text"
                    value={state.longitude}
                    onChange={(long) => handleLongitude(long)}
                  />
                </label>
                <label>
                  new orderStatus:
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => setChecked(!checked)}
                  />
                </label>
                {/* <input type="submit" value="update values" /> */}
              </form>
            </div>
          </div>
        )}
        <button onClick={addItem}>Add Order</button>
        {/* <div>{orders ? orders.map((order) => <p>{order.name}</p>) : null}</div> */}

        {orderStatus === "not order added yet" ? (
          <p>not order added yet</p>
        ) : (
          <p>{orderStatus}</p>
        )}
      </header>
    </div>
  );
}

export default App;
