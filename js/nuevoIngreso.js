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



$('#nuevo').submit(function(e) {
    e.preventDefault(); // Evita que se recarge la pagina
    //Creamos un objeto con los valores de los campos del formulario
    const datos = {
        id: Math.floor(Math.random() * 1000000), // Creamos un id aleatorio
        nombre: $('#nombre').val(),
        fecha: $('#fecha').val(),
        cantidad: $('#cantidad').val()

    };

    //Agregamos en nuestra db en el array 
    db["ingresos"].push(datos);

    //Actualizamos nuestra db en localStorage
    localStorage.setItem('db', JSON.stringify(db));

    //redirigiomos a la pagina de lista
    window.location.href = "ingresos.html";

});