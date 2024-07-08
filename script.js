//alert del carrito
const carrito = document.querySelector("#carrito")
carrito.addEventListener("click", function(){
  alert("Aún no agregamos un carrito.")
})

//Se agrega un add event listener al modelo de los objetos del documento (el DOM, el "árbol" de la página) para que cuando termine de cargar se ejecute el movimiento de la gallina
document.addEventListener('DOMContentLoaded', function() {
  var chicken = document.getElementById('gallina');
  var body = document.body;
  var start = Date.now(); // Tiempo de inicio de la animación

  // Función para animar la gallina
  function animateChicken() {  
    
    //Creamos un intervalo, es decir, una serie de acciones que se ejecuten cada cierto tiempo expresado en milisegundos (el de este timer y el timer 2 es cada 20 milisegundos, equivalente a 0.02 segundos)
    var timer = setInterval(function() {
      var timePassed = Date.now() - start; // Tiempo transcurrido desde el inicio
      var leftChicken = parseInt(chicken.style.left) || 0;

      // Movimiento inicial de la gallina desde la izquierda a la derecha
      if (leftChicken <= body.clientWidth) {
        drawChicken1(timePassed);
      }

      // Cuando la gallina llega al borde derecho
      if (leftChicken > body.clientWidth) {
        clearInterval(timer); // Detener el temporizador actual
        chicken.style.display = 'none'; // Ocultar la gallina

        // Posicionar la gallina para la segunda animación (abajo a la derecha)
        chicken.style.left = '0px'; // Reiniciar posición a la izquierda
        chicken.style.top = '50vh'; // Posicionar en la parte inferior de la pantalla
        chicken.style.display = 'block'; // Mostrar la gallina nuevamente

        start = Date.now(); // Reiniciar tiempo de inicio para la segunda animación

        // Animación de la gallina desde la derecha inferior
        let timer2 = setInterval(function() {
          let timePassed2 = Date.now() - start;
          drawChicken1(timePassed2);
          
          if (parseInt(chicken.style.left) > body.clientWidth) {
            clearInterval(timer2); // Detener la segunda animación al llegar al borde derecho
            chicken.style.display = 'none'; // Ocultar la gallina
          }
        }, 20);
      }
    }, 20);
  }

  // Función para dibujar la posición de la gallina
  function drawChicken1(timePassed) {
    chicken.style.left = timePassed / 5 + 'px';
  }

  // Iniciar la animación cuando se carga el contenido
  animateChicken();
});

//Carrusel
// Selección de elementos del DOM, con query selector llamamos a todos los selectores de css que coincidan con las siguientes clases y id.
const btnLeft = document.querySelector(".btn-left"); // Selecciona el botón izquierdo
const btnRight = document.querySelector(".btn-right"); // Selecciona el botón derecho
const slider = document.querySelector("#slider"); // Selecciona el slider
const sliderSection = document.querySelectorAll(".slider-section"); // Selecciona todas las secciones del slider

// Event Listeners
btnLeft.addEventListener("click", e => moveToLeft()); // Agrega un event listener al botón izquierdo que llama a la función moveToLeft al hacer clic
btnRight.addEventListener("click", e => moveToRight()); // Agrega un event listener al botón derecho que llama a la función moveToRight al hacer clic
setInterval(() => {
    moveToRight(); // Establece un intervalo para llamar a la función moveToRight cada 3 segundos, creando un efecto de presentación automática
}, 3000);

// Declaración de variables
let operacion = 0; // Inicializa la variable operacion en 0
let counter = 0; // Inicializa la variable counter en 0
let widthImg = 100 / sliderSection.length; // Calcula el ancho de cada imagen dividiendo 100 por la cantidad de secciones del slider

// Función para mover hacia la derecha, se la va a llamar al hacer click en su botón correspondiente
function moveToRight() {
    if (counter >= sliderSection.length-1) { // Verifica si el contador es mayor o igual a la cantidad de secciones menos 1
        counter = 0; // Reinicia el contador a 0
        operacion = 0; // Reinicia la operacion a 0
        slider.style.transform = `translate(-${operacion}%)`; // Establece la transformación del slider
        slider.style.transition = "none"; // Elimina la transición
        return; // Sale de la función
    } 
    counter++; // Incrementa el contador
    operacion = operacion + widthImg; // Actualiza la operacion sumando el ancho de la imagen
    slider.style.transform = `translate(-${operacion}%)`; // Establece la transformación del slider
    slider.style.transition = "all ease .6s"; // Aplica una transición
}  

// Función para mover hacia la izquierda, se la va a llamar al hacer click en su botón correspondiente
function moveToLeft() {
    counter--; // Decrementa el contador
    if (counter < 0 ) { // Verifica si el contador es menor a 0
        counter = sliderSection.length-1; // Establece el contador al valor máximo
        operacion = widthImg * (sliderSection.length-1); // Calcula la operacion basada en el nuevo contador
        slider.style.transform = `translate(-${operacion}%)`; // Establece la transformación del slider
        slider.style.transition = "none"; // Elimina la transición
        return; // Sale de la función
    } 
    operacion = operacion - widthImg; // Actualiza la operacion restando el ancho de la imagen
    slider.style.transform = `translate(-${operacion}%)`; // Establece la transformación del slider
    slider.style.transition = "all ease .6s"; // Aplica una transición
}