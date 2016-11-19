# organigrama
Plugin para crear organigramas con JavaScript
**Utiliza clases de Bootstrap, por lo que deverá estar referenciado en el header**

Crear un contenedor para el organigrama

Usar *organigrama.data* para pasarle los datos del organigrama a crear

Ejemplo de *data*

var datos = {
  id : 1,
  puesto : "Director",
  nombre : "David Mares",
  hijos : []
}

Los *hijos* son con la misma estructura

Usar *organigrama.create(id-contenedor)* para crear el organigrama

Pasarle los eventos a utilizar para Agregar/Editar de la siguiente manera
*organigrama.eventAdd = fnAgregar*
*organigrama.eventEdit = fnEditar*

Las funciones reciven como parametro el id del nodo

function fnAgregar(id){
  // tu código aqui
}
