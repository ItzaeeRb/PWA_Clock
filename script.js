// Función que actualiza la hora en pantalla cada segundo
function actualizarReloj() {
    let date = new Date();
    let hh = date.getHours();
    let mm = date.getMinutes();
    let ss = date.getSeconds();

    hh = (hh < 10) ? "0" + hh : hh;
    mm = (mm < 10) ? "0" + mm : mm;
    ss = (ss < 10) ? "0" + ss : ss; 

    let time = hh + ":" + mm + ":" + ss;
    let watch = document.querySelector('#digital');
    watch.innerHTML = time;

    let hhRotation = ((hh % 12)*180)/6;
    let mmRotation = (mm * 180)/30;
    let ssRotation = (ss * 180)/30;

    document.querySelector('#hours').style.transform = "rotate(" + hhRotation + "deg)";
    document.querySelector('#minutes').style.transform = "rotate(" + mmRotation + "deg)";
    document.querySelector('#seconds').style.transform = "rotate(" + ssRotation + "deg)";

  }
  
  // Iniciar actualización cada segundo
  setInterval(actualizarReloj, 1000);
  
  // PWA: botón de instalación
let deferredPrompt;
const installBtn = document.getElementById('installBtn');

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  installBtn.style.display = 'block';

  installBtn.addEventListener('click', () => {
    installBtn.style.display = 'none';
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then(choiceResult => {
      if (choiceResult.outcome === 'accepted') {
        console.log('✅ App instalada');
      } else {
        console.log('❌ Instalación cancelada');
      }
      deferredPrompt = null;
    });
  });
});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then(reg => console.log('✅ SW registrado:', reg.scope))
      .catch(err => console.error('❌ Error registrando SW:', err));
  });
}