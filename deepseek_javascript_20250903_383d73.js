// Navegación con animación
function mostrarSeccion(id) {
  const secciones = ['appGeneral', 'appChilena'];
  secciones.forEach(sec => {
    const el = document.getElementById(sec);
    if (sec === id) {
      el.classList.remove('hide');
      setTimeout(() => el.style.display = 'block', 10);
    } else {
      el.classList.add('hide');
      setTimeout(() => el.style.display = 'none', 400);
    }
  });
}

// Mostrar custom logo input
function mostrarInputCustomGeneral(valor) {
  document.getElementById("customLogoInputGeneral").style.display = (valor === "custom") ? "block" : "none";
}

function mostrarInputCustomChilena(valor) {
  document.getElementById("customLogoInputChilena").style.display = (valor === "custom") ? "block" : "none";
}

// General App
function generarVistaPreviaGeneral() {
  const patente = document.getElementById('patenteGeneral').value.toUpperCase();
  const fuente = document.getElementById('fuenteGeneral').value;
  const tamano = document.getElementById('tamanoLetraGeneral').value;
  const grosor = document.getElementById('grosorLetraGeneral').value;
  const logoSize = document.getElementById('tamanoLogoGeneral').value;
  const marca = document.getElementById('marcaGeneral').value;
  const customFile = document.getElementById('customLogoFileGeneral').files[0];
  const preview = document.getElementById('vistaPreviaGeneral');

  preview.innerHTML = '';
  preview.style.fontFamily = fuente;
  preview.style.fontSize = tamano + "px";
  preview.style.fontWeight = grosor;

  const texto = document.createElement("span");
  texto.innerText = patente;

  if (marca === "custom" && customFile) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const img = document.createElement('img');
      img.src = e.target.result;
      img.style.height = logoSize + "px";
      preview.appendChild(img);
      preview.insertBefore(img, preview.firstChild);
      preview.appendChild(texto);
    };
    reader.readAsDataURL(customFile);
    guardarEnHistorial('general', patente);
    return;
  }

  if (marca && marca !== "custom") {
    const img = document.createElement('img');
    img.id = "logoMarca";
    img.alt = marca;
    img.style.height = logoSize + "px";
    img.crossOrigin = "anonymous";
    img.src = `https://img.icons8.com/color/48/${marca}.png`;

    img.onerror = function () {
      const logosAlternativos = {
        mercedes: "https://upload.wikimedia.org/wikipedia/commons/9/90/Mercedes-Logo.svg",
        landrover: "https://upload.wikimedia.org/wikipedia/commons/8/8a/Land_Rover_logo_black.svg",
        bugatti: "https://upload.wikimedia.org/wikipedia/commons/1/19/Bugatti_logo.svg",
        tesla: "https://upload.wikimedia.org/wikipedia/commons/b/bd/Tesla_Motors.svg",
        man: "https://upload.wikimedia.org/wikipedia/commons/1/15/MAN_Logo.svg",
        lucid: "https://upload.wikimedia.org/wikipedia/commons/e/ef/Lucid_Motors_logo.svg",
        nio: "https://upload.wikimedia.org/wikipedia/commons/4/44/NIO_logo.svg",
        rivian: "https://upload.wikimedia.org/wikipedia/commons/d/d3/Rivian_logo.svg"
      };
      const altSrc = logosAlternativos[marca];
      if (altSrc) this.src = altSrc;
      else this.remove();
    };

    preview.appendChild(img);
    preview.insertBefore(img, preview.firstChild);
  }

  preview.appendChild(texto);
  guardarEnHistorial('general', patente);
}

// Patente Chilena App
function generarVistaPreviaChilena() {
  const patente = document.getElementById('patenteChilena').value.toUpperCase().replace(/[^A-Z0-9]/g, '');
  const fuente = document.getElementById('fuenteChilena').value;
  const tamanoLogo = document.getElementById('tamanoLogoChilena').value;
  const tamanoLetra = document.getElementById('tamanoLetraChilena').value;
  const grosorLetra = document.getElementById('grosorLetraChilena').value;
  const marca = document.getElementById('marcaChilena').value;
  const preview = document.getElementById('vistaPreviaChilena');

  const parte1 = patente.slice(0, 2) || "--";
  const parte2 = patente.slice(2, 4) || "--";
  const parte3 = patente.slice(4, 6) || "--";

  preview.innerHTML = '';

  const container = document.createElement('div');
  container.className = 'patente-chilena';
  container.style.fontFamily = fuente;
  container.style.setProperty('--tamano-letra', tamanoLetra + 'px');
  container.style.setProperty('--grosor-letra', grosorLetra);

  const escudoSVG = `
  <svg class="escudo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="black">
    <path d="M32 2L4 10v18c0 16.8 12.8 32 28 34 15.2-2 28-17.2 28-34V10L32 2z"/>
    <polygon points="32,16 36,28 48,28 38,36 42,48 32,40 22,48 26,36 16,28 28,28" fill="white"/>
  </svg>`;

  container.innerHTML = `
    <div class="texto">
      <span>${parte1}</span>
      <span class="punto"></span>
      <span>${parte2}</span>
      ${escudoSVG}
      <span>${parte3}</span>
    </div>
    <div class="pais">CHILE</div>
  `;

  const containerWrapper = document.createElement('div');
  containerWrapper.style.display = 'flex';
  containerWrapper.style.alignItems = 'center';
  containerWrapper.style.gap = '10px';

  const marcaContenedor = document.createElement('div');
  marcaContenedor.style.display = 'flex';
  marcaContenedor.style.alignItems = 'center';
  marcaContenedor.style.justifyContent = 'center';

  if (marca === "custom") {
    const customFile = document.getElementById("customLogoFileChilena").files[0];
    if (customFile) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const logo = document.createElement('img');
        logo.alt = "Custom Logo";
        logo.src = e.target.result;
        logo.style.height = tamanoLogo + "px";
        marcaContenedor.appendChild(logo);
        containerWrapper.appendChild(marcaContenedor);
        containerWrapper.appendChild(container);
        preview.appendChild(containerWrapper);
      };
      reader.readAsDataURL(customFile);
      guardarEnHistorial('chilena', patente);
      return;
    }
  }

  if (marca && marca !== "custom") {
    const logo = document.createElement('img');
    logo.alt = marca;
    logo.style.height = tamanoLogo + "px";
    logo.crossOrigin = "anonymous";
    logo.src = `https://img.icons8.com/color/48/${marca}.png`;
    marcaContenedor.appendChild(logo);
  }

  containerWrapper.appendChild(marcaContenedor);
  containerWrapper.appendChild(container);
  preview.appendChild(containerWrapper);
  guardarEnHistorial('chilena', patente);
}

// OCR reutilizable
async function leerOCR(input, patenteId, previewId) {
  const file = input.files[0];
  if (!file) return;
  const { data: { text } } = await Tesseract.recognize(file, 'eng', { logger: m => console.log(m) });
  const resultado = text.replace(/[^A-Z0-9]/gi, '').toUpperCase().slice(0, 10);
  document.getElementById(patenteId).value = resultado;
  if (previewId === 'vistaPreviaGeneral') generarVistaPreviaGeneral();
  else if (previewId === 'vistaPreviaChilena') generarVistaPreviaChilena();
}

// Descargar PNG reutilizable
function descargarComoPNG(previewId) {
  html2canvas(document.getElementById(previewId), { useCORS: true }).then(canvas => {
    const link = document.createElement("a");
    link.download = "patente.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  });
}

// Compartir WhatsApp reutilizable
function compartirWhatsapp(patenteId) {
  const patente = document.getElementById(patenteId).value.toUpperCase();
  const mensaje = encodeURIComponent("Mira esta patente que generé: " + patente);
  window.open("https://wa.me/?text=" + mensaje, "_blank");
}

// Historial
function guardarEnHistorial(tipo, patente) {
  if (!patente) return;
  const key = tipo === 'general' ? 'historialGeneral' : 'historialChilena';
  let historial = JSON.parse(localStorage.getItem(key) || '[]');
  if (!historial.includes(patente)) {
    historial.unshift(patente);
    if (historial.length > 10) historial = historial.slice(0, 10); // Máximo 10
    localStorage.setItem(key, JSON.stringify(historial));
    mostrarHistorial(tipo);
  }
}

function mostrarHistorial(tipo) {
  const key = tipo === 'general' ? 'historialGeneral' : 'historialChilena';
  const ul = document.getElementById(key);
  let historial = JSON.parse(localStorage.getItem(key) || '[]');
  ul.innerHTML = '';
  historial.forEach(patente => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span style="font-weight:bold">${patente}</span>
      <button onclick="usarHistorial('${tipo}','${patente}')">Ver</button>
      <button onclick="compartirWhatsappHistorial('${patente}')">WhatsApp</button>
    `;
    ul.appendChild(li);
  });
}

function usarHistorial(tipo, patente) {
  if (tipo === 'general') {
    document.getElementById('patenteGeneral').value = patente;
    generarVistaPreviaGeneral();
  } else {
    document.getElementById('patenteChilena').value = patente;
    generarVistaPreviaChilena();
  }
}

function compartirWhatsappHistorial(patente) {
  const mensaje = encodeURIComponent("Mira esta patente que generé: " + patente);
  window.open("https://wa.me/?text=" + mensaje, "_blank");
}

// Inicialización
mostrarHistorial('general');
mostrarHistorial('chilena');
mostrarSeccion('appGeneral');