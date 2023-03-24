// @deno-types="https://deno.land/x/servest@v1.3.4/types/react/index.d.ts"
import React from "https://dev.jspm.io/react@16.13.1";
// @deno-types="https://deno.land/x/servest@v1.3.4/types/react-dom/server/index.d.ts"
import ReactDOMServer from "https://dev.jspm.io/react-dom/server.js";
import { createApp } from "https://deno.land/x/servest@v1.3.4/app.ts";

const app = createApp();

const colores: string[] = ["red", "blue", "green"];

const renderColores = () => {
  return (
    <ul style={{ fontSize: 25 }} className="list-unstyled w-50">
      {colores.map((color) => (
        <li key={color} style={{ color }} className="bg-dark my-1">
          {color}
        </li>
      ))}
    </ul>
  );
};
app.handle("/", async (req) => {
  const color : string  | null = req.query.get("color");
  color && colores.push(color);
  await req.respond({
    status: 200,
    headers: new Headers({
      "content-type": "text/html; charset=UTF-8",
    }),
    body: ReactDOMServer.renderToString(
      <html>
        <head>
          <meta charSet="utf-8" />
          <title>Formulario Deno - Colores</title>
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
            integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65"
            crossOrigin="anonymous"
          >
          </link>
        </head>
        <body className="w-100 d-flex row justify-content-center align-content-start">
          <h1 id="title" className="text-center my-4">Formulario de Colores</h1>
          <hr className="w-75"/>
          <div className="w-100 d-flex justify-content-center">
          <form className="d-flex row w-50 justify-content-center">
              <label htmlFor="color" className="text-center my-2">
                Ingrese Color
              </label>           
              <input type="text" id="color" name="color" className="m-1 form-text"></input>
              <button type="submit" className="btn btn-secondary w-25 m-1">Enviar</button>
          </form>
          </div>
          {renderColores()}
        </body>
      </html>,
    ),
  });
});

const PORT = 3030;
app.listen({ port: PORT });
