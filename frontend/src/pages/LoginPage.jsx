import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import "./LoginPage.css";

function LoginPage() {

  const navigate = useNavigate();

  const [username, setUsername] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState(false);

  function handleSubmit() {
    if (!username) {
      setErrorMessage(true);
      return;
    }

    navigate(`/main/${username}`);
  }

  return (
    <Layout>
      <form id="login-page-username-form">
        <label htmlFor="login-page-username">Escribe tu nombre de usuario</label>
        <input id="login-page-username" type="text" placeholder="Tu nombre o nickname"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        {errorMessage ? <span id="login-page-error-message">* Escribe un nombre de usuario o nickname</span> : <></>}
        <button id="login-page-login-button" type="button" onClick={handleSubmit}>Entrar</button>
      </form>
    </Layout>
  )
}

export default LoginPage;