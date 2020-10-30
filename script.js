var $primeraCarta = null, // Guarda la primera carta de una pareja de clicks
    $cartas = null, // Contenedor (div) de la lista de cartas
    $texto_panel = null, // Mensajes de texto
    numClicks = 0, // Contador de clicks
    parejas = 0, // Contador de parejas
    numcarta = ['1', '2', '3', '4', '5', '6'];

function CrearCartas() {
  var listaCartas = [];
  // Crea la lista de cartas
  for (var i = 0; i < 6; i++) {
    listaCartas[i] = numcarta[i];
    listaCartas[i + 6] = numcarta[i];
  }
  // Baraja las cartas
  listaCartas = barajar(listaCartas);
  // Crea las cartas
  for (i = 0; i < 12; i++) {
    $cartas.append('<div id=carta' + i + '><span>' + listaCartas[i] + '</span></div>');
  }
  // Añade un manejador del evento click a cada carta
  $cartas.children("div").click(ClickCarta);
}

function EmpezarJuego() {
  // Elimina cartas
  $cartas.empty();
  // Resetear texto del panel
  $texto_panel.html("0 clicks");
  // Inicializa variables
  numClicks = 0;
  parejas = 0;
  // Crea cartas
  CrearCartas();
}

function ClickCarta() {
  var $carta = $(this),
    $carta_span = $carta.find("span");
  // No se puede hacer click en esta carta
  $carta.off("click");
  // Contabiliza clicks
  numClicks++;
  $texto_panel.html(numClicks + ' clicks');
  // Visualiza la carta
  $.when($carta_span.click()).then(function(){
    $carta_span.fadeToggle();
    $carta.css("background-image","none");
});
  // Primera carta
  if ($primeraCarta === null) {
    $primeraCarta = $carta;
  } else { // Segunda carta
    // Son iguales?
    if (eval($carta_span.text().replace('x', '*') + ' == ' + $primeraCarta.find("span").text().replace('x', '*'))) { // Sí
      parejas++;
    } else { // Diferentes
      $primeraCarta.find("span").fadeToggle();
      $.when($carta_span.fadeToggle()).then(function(){
        $carta.effect('pulsate', 300);
        $carta.css("background-image","url('reverso.jpg')");
      });
      $primeraCarta.effect('pulsate', 300);
      $primeraCarta.css("background-image","url('reverso.jpg')");
      // Habilitar el click nuevamente
      $primeraCarta.click(ClickCarta);
      $carta.click(ClickCarta);
    }
    $primeraCarta = null;
  }
  // Hemos terminado?
  if (parejas == 6) { // Todas las parejas
    $texto_panel.html('¡Felicidades, has encontrado todas las parejas en '+numClicks+' clicks!');
  } 
}

function barajar(array) {
  var m = array.length,
      t, i;
    // Mientras queden elementos por barajar
    while (m) {
      // Elige un elemento
      i = Math.floor(Math.random() * m--);
      // Y lo cambia por el elemento actual
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }
    return array;
}

$(document).ready(function () {
  $cartas = $('#cartas');
  $texto_panel = $('#texto_panel');
  EmpezarJuego();
});