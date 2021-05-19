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
listarSubGrupos();
listarGrupos();

function listarSubGrupos() {
  let html = "";
  ///Recorremos nuestra lista de grupos
  db["sub-grupos"].forEach((sub) => {
    html += `
    <tr>
        <td>${sub.id}</td>
        <td>${obtenerNombreGrupo(parseInt(sub.grupo)) }</td>
        <td>${sub.nombre}</td>

        <td>${sub.descripcion}</td>
        <td><a href="#" class="btn btn-light btn-ms" onClick="editarGrupo(${sub.id})">Editar</a> | <a href="#" class="btn btn-light btn-ms" onClick="eliminarGrupo(${sub.id})">Eliminar</a> </td>
    </tr> `;
  });
  //Insertamos todas las filas creadas al body de la tabla mediante el ID
  $("#lista").html(html);
}


function obtenerNombreGrupo(id) {
    //recorremos nuestros array de grupos
    let nombre='';
    db["grupos"].forEach(function (grupo, index, object) {
      if (grupo.id === id) {
        //y buscamos por el atributo ID
          nombre = object[index].nombre;
        }
    });
    return nombre;
  
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

function editarGrupo(id) {
  //Abrimos el modad de editar
  $("#editar").modal("show");
  //recorremos nuestros array de grupos
  db["sub-grupos"].forEach(function (grupo, index, object) {
      //y buscamos por el atributo ID
    if (grupo.id === id) {
      //Asiganamos los valores por defecto
        $("#id").val(id);
      $("#grupo").val(object[index].grupo);
        
        $("#nombre").val(object[index].nombre);
        
      $("#descripcion").val(object[index].descripcion);
    }
  });
}

// Detectamos cuando se envia el formulario actualizar
$("#editar").submit(function (e) {
  e.preventDefault(); // Evita que se recarge la pagina
    var id = parseInt($("#id").val()); //guardamos el id
    console.log(id);
  //Creamos un objeto con los valores de los campos del formulario
  const datos = {
      nombre: $("#nombre").val(),
    grupo: $("#grupo").val(),
      
    descripcion: $("#descripcion").val(),
  };

  //recorremos nuestros array de grupos
  db["sub-grupos"].forEach(function (sub, index, object) {
      //y buscamos por el atributo ID
    if (sub.id === id) {
      //Asiganamos los nuevos valores para el objeto
        object[index].nombre = datos.nombre;
      object[index].grupo = datos.grupo;        
      object[index].descripcion = datos.descripcion;
    }
  });

  //Actualizamos nuestra db en localStorage
  localStorage.setItem("db", JSON.stringify(db));

  // Llamado de funciones globales
  listarSubGrupos();
    //Ocultamos el Modal
  $("#editar").modal("hide");
    
});
