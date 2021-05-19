// Obtenemos nuestra base dedatos de localStorage
let db = JSON.parse(localStorage.getItem("db"));

//Evaluamos si existe, si no la creamos
if (db == null) {
  db = {
    grupos: [],
    "sub-grupos": [],
    gastos: [],
    ingresos: [],
  };
  //Creamos la db
  localStorage.setItem("db", JSON.stringify(db));
}

// Llamado de funciones globales
listarGrupos();

function listarGrupos() {
    let html = "";
    ///Recorremos nuestra lista de grupos
    db["grupos"].forEach((grupo) => {
      html += `
     <option value="${grupo.id}">${grupo.nombre}</option>`;
    });
    //Insertamos todas nuestra opciones de grupo en el list box de grupos
    $("#grupo").html(html);
  }

  $('#nuevo').submit(function (e) {
    e.preventDefault();// Evita que se recarge la pagina
    //Creamos un objeto con los valores de los campos del formulario
    const datos = {
        id: Math.floor(Math.random() * 1000000), // Creamos un id aleatorio
        nombre: $('#nombre').val(),
        grupo: $('#grupo').val(),
        nombre: $('#nombre').val(),
        descripcion: $('#descripcion').val()
    };
    
    //Agregamos en nuestra db en el array de grupos
    db["sub-grupos"].push(datos);

    //Actualizamos nuestra db en localStorage
    localStorage.setItem('db', JSON.stringify(db));

    //redirigiomos a la pagina de lista de grupos
    window.location.href = "subGrupos.html";

});