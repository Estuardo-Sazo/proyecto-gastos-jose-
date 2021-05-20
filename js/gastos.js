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
listaGastos();
listarSubGrupos();

function listaGastos() {
    let html = "";
    ///Recorremos nuestra lista 
    db["gastos"].forEach((g) => {
        html += `
    <tr>
        <td>${g.id}</td>
        <td>${obtenerNombreSubGrupo(g.subgrupo) }</td>
        <td>${g.nombre}</td>       
        <td>${g.fecha}</td>       
        
        <td>Q${g.cantidad}</td>
        <td><a href="#" class="btn btn-light btn-ms" onClick="editar(${g.id})">Editar</a> | <a href="#" class="btn btn-light btn-ms" onClick="eliminar(${g.id})">Eliminar</a> </td>
    </tr> `;
    });
    //Insertamos todas las filas creadas al body de la tabla mediante el ID
    $("#lista").html(html);
}

function eliminar(id) {
    //recorremos nuestros array de grupos
    db["gastos"].forEach(function(g, index, object) {
        if (g.id === id) {
            //y buscamos por el atributo ID
            object.splice(index, 1); //Si el id conside se elimina el objeto de la lista de grupo
        }
    });
    //Actualizamos nuestra db en localStorage
    localStorage.setItem("db", JSON.stringify(db));
    // Llamado de funciones globales
    listaGastos();
}


function obtenerNombreSubGrupo(sub) {
    let id = parseInt(sub);
    //recorremos nuestros array de grupos
    let nombre = '';
    db["sub-grupos"].forEach(function(grupo, index, object) {
        if (grupo.id === id) {
            //y buscamos por el atributo ID
            nombre = object[index].nombre;
        }
    });
    return nombre;

}


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

function editar(id) {
    //Abrimos el modad de editar
    $("#editar").modal("show");
    //recorremos nuestros array de grupos
    db["gastos"].forEach(function(grupo, index, object) {
        //y buscamos por el atributo ID
        if (grupo.id === id) {
            //Asiganamos los valores por defecto
            $("#id").val(id);
            $("#subgrupo").val(object[index].subgrupo);
            $("#nombre").val(object[index].nombre);
            $("#fecha").val(object[index].fecha);
            $("#cantidad").val(object[index].cantidad);
        }
    });
}

// Detectamos cuando se envia el formulario actualizar
$("#editar").submit(function(e) {
    e.preventDefault(); // Evita que se recarge la pagina
    var id = parseInt($("#id").val()); //guardamos el id
    console.log(id);
    //Creamos un objeto con los valores de los campos del formulario
    const datos = {
        nombre: $("#nombre").val(),
        subgrupo: $("#subgrupo").val(),
        fecha: $("#fecha").val(),
        cantidad: $("#cantidad").val(),
    };

    //recorremos nuestros array de grupos
    db["gastos"].forEach(function(sub, index, object) {
        //y buscamos por el atributo ID
        if (sub.id === id) {
            //Asiganamos los nuevos valores para el objeto
            object[index].nombre = datos.nombre;
            object[index].subgrupo = datos.subgrupo;
            object[index].fecha = datos.fecha;
            object[index].cantidad = datos.cantidad;

        }
    });

    //Actualizamos nuestra db en localStorage
    localStorage.setItem("db", JSON.stringify(db));

    // Llamado de funciones globales
    listaGastos();
    //Ocultamos el Modal
    $("#editar").modal("hide");

});