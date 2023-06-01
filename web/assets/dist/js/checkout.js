(() => {
  "use strict";

  async function getCityData(ciudad, departamento, clima) {
    const options = {
      method: "GET",
    };
    const response = await fetch(
      `http://localhost:3000/ciudad?ciudad=${ciudad}&departamento=${departamento}&clima=${clima}`,
      options
    );
    const data = await response.json();
    return data;
  }
  async function getPHSemilla(cultivo, clima) {
    const options = {
      method: "GET",
    };
    const response = await fetch(
      `http://localhost:3000/semilla?cultivo=${cultivo}&clima=${clima}`,
      options
    );
    const data = await response.json();
    return data;
  }
  
  const ciudad = document.querySelector("#ciudad");
  const semilla = document.querySelector("#semilla"); /**/

  ciudad.addEventListener("change", async (event) => {
    event.preventDefault();
    console.log(event.target.value);

    const depto = document.querySelector("#depto");
    if (depto.value != 1) {
      const clima = "ecuatorial lluvioso";
      console.log("selecciono");
      const data = await getCityData(ciudad.value, depto.value, clima);
      if (data.result) {
        const productos = data.result;
        document.getElementById("total").innerHTML = productos.length;

        document.getElementById("detalle").hidden = false;
        const listado = document.getElementById("listado");

        for (let i = 0; i < productos.length; i++) {
          const li = document.createElement("li");
          li.classList.add("list-group-item");
          li.classList.add("d-flex");
          li.classList.add("justify-content-between");
          li.classList.add("lh-sm");

          const h6 = document.createElement("h6");
          h6.classList.add("my-0");
          h6.innerText = productos[i];

          li.appendChild(h6);

          listado.appendChild(li);
        }
      } /* */

      console.log(data);
    }
  });

  semilla.addEventListener("blur", validarValor);

  async function validarValor(e) {
    e.preventDefault();

    const valor = semilla.value;
    const clima = "ecuatorial lluvioso";

    // Realizar validaciones aquí
    if (valor !== "") {
      const data = await getPHSemilla(valor, clima);
      if (data.result) {
        /* const obj = JSON.parse(data.result ); */

        /*console.log(obj);  
        document.getElementById("ph").innerHTML = productos.length;
        document.getElementById("descripcion").innerHTML = productos.length 
        */

        console.log(...data.result);
        document.getElementById("detale-cultivo").hidden = false;

        document.getElementById("header").innerHTML = valor;
        document.getElementById("descripcion").innerHTML = data.result;
      }
    }
  }
  const cultivo = [
    {
      title: "Distancias de Siembra (m)",
      data: { distancia: "3.3 x 2.0", cantidad: "un colino" },
    },
    {
      title: "Plantas /ha",
      data: "1.500",
    },
  ];
  /*
function detailSemilla(valor){
console.log(valor);
}*/
})();
