import React, { useRef, useState, useEffect } from "react";
import Layout from "../components/Layout";
import { useNavigate, useParams } from "react-router-dom";

import "./MainPage.css";

function MainPage() {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);

  //Refactorizar
  const [helps, setHelps] = useState([]);
  const [setErrorMessage] = React.useState(false);

  const { username } = useParams();

  const ws = useRef();

  useEffect(() => {
    //Example: ws://localhost:8080/?username=tiburcio
    const SERVER_URL = `${process.env.REACT_APP_SERVER_URL}/?username=${username}`;
    ws.current = new WebSocket(SERVER_URL);

    ws.current.onopen = () => {
      console.log("Connection opened");
    };

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);

      setUsers(data.users);
      setHelps(data.helps);
    };

    return () => {
      console.log("Cleaning up...");
      ws.current.close();
    };
  }, [username]);

  const scrollTarget = useRef(null);

  function Salir() {
    if (!username) {
      setErrorMessage(true);
      return;
    }
    navigate("/");
  }

  useEffect(() => {
    if (scrollTarget.current) {
      scrollTarget.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [helps]);

  return (
    <Layout>
      <div id="helping-me-view-container">
        <h3>Personas conectadas</h3>
        {users.map((user, index) => {
          return (
            <div class="helper" key={index}>
              <div>{user.username} está conectado.</div>
            </div>
          );
        })}
        <button onClick={Salir}>Desconectarse</button>
      </div>

      <div ref={scrollTarget} />
    </Layout>
  );
}

export default MainPage;
