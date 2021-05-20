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

//Llamado de funciones globales
listarSubGrupos();

function listarSubGrupos() {
    let html = "";
    ///Recorremos nuestra lista 
    db["sub-grupos"].forEach((sub) => {
        html += `
       <option value="${sub.id}">${sub.nombre}</option>`;
    });
    //Insertamos todas las filas creadas al body de la tabla mediante el ID
    $("#subgrupo").html(html);
}


$('#nuevo').submit(function(e) {
    e.preventDefault(); // Evita que se recarge la pagina
    //Creamos un objeto con los valores de los campos del formulario
    const datos = {
        id: Math.floor(Math.random() * 1000000), // Creamos un id aleatorio
        nombre: $('#nombre').val(),
        subgrupo: $('#subgrupo').val(),
        fecha: $('#fecha').val(),
        cantidad: $('#cantidad').val()

    };

    //Agregamos en nuestra db en el array de grupos
    db["gastos"].push(datos);

    //Actualizamos nuestra db en localStorage
    localStorage.setItem('db', JSON.stringify(db));

    //redirigiomos a la pagina de lista de grupos
    window.location.href = "gastos.html";

});