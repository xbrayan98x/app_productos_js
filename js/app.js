class Producto {
  constructor(nombre, precio, year) {
    this.nombre = nombre;
    this.precio = precio;
    this.year = year;
  }
}


class UI {
  agregaProducto(producto){
    const productlist = document.getElementById('listar-producto');
    const elemento = document.createElement('div');
    elemento.innerHTML = `
      <div class="card text-center mb-4">
        <div class="card-body">
          <strong>Nombre Producto</strong>: ${producto.nombre}<br>
          <strong>Precio Producto</strong>: ${producto.precio}<br>
          <strong>Año Producto</strong>: ${producto.year}<br>
          <a href="#" class="btn btn-danger" name="eliminar">Eliminar</a>
        </div>
      </div>
    `;
    productlist.appendChild(elemento);
    this.mostrarMensaje('Producto agregado correctamente','success')
    this.limpiarForm();

  }

  eliminaProducto(elemento){
    //recibe toda la cadena html donde ejecutaron click
    if (elemento.name === 'eliminar') {
      elemento.parentElement.parentElement.parentElement.remove();
      this.mostrarMensaje('Producto eliminado correctamente','danger');
    }
  }

  mostrarMensaje(msj, cssClass){
    const divmsj = document.createElement('div')
    divmsj.className = `alert alert-${cssClass} mt-4`;
    divmsj.appendChild(document.createTextNode(msj));
    const container = document.querySelector('.container');
    const app = document.querySelector('#app');
    container.insertBefore(divmsj,app);
    setTimeout(function(){
      document.querySelector('.alert').remove();
    },2500);

  }

  limpiarForm(){
    document.getElementById('form-producto').reset();
  }

}

// DOM Events - submit
document.getElementById('form-producto').addEventListener
('submit',
  function(e){
    /*
    const = valor no cambia,
    var = variable valor cambia (scope local), ES5
    let = variable valor cambia, pero solo vivirá(Funcionara) en el bloque donde fue declarada.
    */
    const nombrep = document.getElementById('frm-prd-nombre').value;
    const preciop = document.getElementById('frm-prd-preciop').value;
    const yearp = document.getElementById('frm-prd-aniop').value;

    //evalue valores correctos de data
    const producto = new Producto(nombrep, preciop, yearp);
    const ui = new UI();

    if (nombrep === '' || preciop === '' || yearp === '') {
      return ui.mostrarMensaje('Por favor complete los campos', 'danger');
    }

    ui.agregaProducto(producto);
    e.preventDefault(); //quitar comportamiento normal del formulario (refresh page)
  }
)


// DOM Events - delete
document.getElementById('listar-producto').addEventListener
(
  'click',
  function(e){
    const uid = new UI();
    uid.eliminaProducto(e.target);
  }
)
