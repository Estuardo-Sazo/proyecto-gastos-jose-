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
    <tr>
        <td>${grupo.id}</td>
        <td>${grupo.nombre}</td>
        <td>${grupo.descripcion}</td>
        <td><a href="#" class="btn btn-light btn-ms" onClick="editarGrupo(${grupo.id})">Editar</a> | <a href="#" class="btn btn-light btn-ms" onClick="eliminarGrupo(${grupo.id})">Eliminar</a> </td>
    </tr> `;
  });
  //Insertamos todas las filas creadas al body de la tabla mediante el ID
  $("#lista").html(html);
}

function eliminarGrupo(id) {
  //recorremos nuestros array de grupos
  db["grupos"].forEach(function (grupo, index, object) {
    if (grupo.id === id) {
      //y buscamos por el atributo ID
      object.splice(index, 1); //Si el id conside se elimina el objeto de la lista de grupo
    }
  });
  //Actualizamos nuestra db en localStorage
  localStorage.setItem("db", JSON.stringify(db));
  // Llamado de funciones globales
  listarGrupos();
}

function editarGrupo(id) {
  //Abrimos el modad de editar
  $("#editar").modal("show");
  //recorremos nuestros array de grupos
  db["grupos"].forEach(function (grupo, index, object) {
    if (grupo.id === id) {
      //y buscamos por el atributo ID
      //Asiganamos los valores por defecto
      $("#id").val(id);
      $("#nombre").val(object[index].nombre);
      $("#descripcion").val(object[index].descripcion);
    }
  });
}

// Detectamos cuando se envia el formulario actualizar
$("#editar").submit(function (e) {
  e.preventDefault(); // Evita que se recarge la pagina
  var id = parseInt($("#id").val()); //guardamos el id
  //Creamos un objeto con los valores de los campos del formulario
  const datos = {
    nombre: $("#nombre").val(),
    descripcion: $("#descripcion").val(),
  };

  //recorremos nuestros array de grupos
  db["grupos"].forEach(function (grupo, index, object) {
    if (grupo.id === id) {
      //y buscamos por el atributo ID
      //Asiganamos los nuevos valores para el objeto
      object[index].nombre = datos.nombre;
      object[index].descripcion = datos.descripcion;
    }
  });

  //Actualizamos nuestra db en localStorage
  localStorage.setItem("db", JSON.stringify(db));

  // Llamado de funciones globales
    listarGrupos();
    //Ocultamos el Modal
  $("#editar").modal("hide");
    
});
