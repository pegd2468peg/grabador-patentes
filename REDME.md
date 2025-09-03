<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Grabador de Patentes Unificado</title>
  <script src="https://cdn.jsdelivr.net/npm/tesseract.js@4/dist/tesseract.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>
  <link href="https://fonts.googleapis.com/css2?family=Roboto&family=Open+Sans&family=Montserrat&family=Oswald&family=Lobster&family=Courier+Prime&family=Orbitron&family=PT+Sans+Narrow&family=Anton&display=swap" rel="stylesheet">
  <style>
    :root {
      --fondo: #fff;
      --panel: #b0b0b0;
      --boton: #8B0000;
      --borde: #000;
      --texto: #111;
    }
    body {
      font-family: 'Roboto', sans-serif;
      margin: 0;
      padding: 0;
      background: var(--fondo);
      color: var(--texto);
    }
    header {
      background: var(--panel);
      color: var(--texto);
      padding: 10px;
      text-align: center;
      border-bottom: 2px solid var(--borde);
    }
    nav {
      background: var(--panel);
      color: var(--texto);
      padding: 10px;
      text-align: center;
      border-bottom: 2px solid var(--borde);
    }
    nav button {
      margin: 5px;
      padding: 10px 18px;
      cursor: pointer;
      background: var(--boton);
      color: #fff;
      border: 2px solid var(--borde);
      border-radius: 6px;
      font-weight: bold;
      font-size: 1rem;
      transition: background 0.2s;
    }
    nav button:hover {
      background: #a80000;
    }
    .container {
      padding: 20px;
    }
    .form-section {
      background: var(--panel);
      padding: 20px;
      border-radius: 10px;
      border: 2px solid var(--borde);
      margin-bottom: 30px;
      box-shadow: 0 2px 6px rgba(0,0,0,0.08);
      transition: opacity 0.4s, transform 0.4s;
      opacity: 1;
    }
    .form-section.hide {
      opacity: 0;
      transform: translateY(30px);
      pointer-events: none;
      position: absolute;
      z-index: -1;
    }
    label {
      display: block;
      margin: 10px 0 5px;
      font-weight: bold;
    }
    input, select {
      width: 100%;
      padding: 8px;
      margin-bottom: 10px;
      border: 2px solid var(--borde);
      border-radius: 5px;
      font-size: 1rem;
    }
    .preview {
      margin-top: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      flex-wrap: wrap;
      padding: 20px;
      background: var(--fondo);
      border: 2px solid var(--borde);
      border-radius: 10px;
      min-height: 60px;
      transition: box-shadow 0.4s, transform 0.4s, background 0.4s;
      box-shadow: 0 2px 6px rgba(0,0,0,0.08);
      animation: fadeIn 0.5s;
    }
    .preview:empty {
      box-shadow: none;
      animation: none;
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: scale(0.96);}
      to { opacity: 1; transform: scale(1);}
    }
    /* Patente Chilena específica */
    .patente-chilena {
      display: inline-block;
      background: #fff;
      border-radius: 8px;
      padding: 10px 20px 60px;
      font-family: 'Courier Prime', monospace;
      text-align: center;
      box-sizing: border-box;
      width: auto;
      border: 2px solid var(--borde);
    }
    .patente-chilena .texto {
      font-size: var(--tamano-letra, 48px);
      font-weight: var(--grosor-letra, bold);
      letter-spacing: 0.5vw;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      flex-wrap: nowrap;
    }
    .patente-chilena .punto {
      width: 1vw;
      height: 1vw;
      min-width: 6px;
      min-height: 6px;
      background: black;
      border-radius: 50%;
      display: inline-block;
    }
    .patente-chilena .escudo {
      width: 24px;
      height: 24px;
    }
    .patente-chilena .pais {
      margin-top: 5px;
      font-size: 3vw;
      letter-spacing: 0.7vw;
      font-family: 'Anton', sans-serif;
    }
    @media (min-width: 600px) {
      .patente-chilena .texto {
        font-size: 48px;
        letter-spacing: 10px;
      }
      .patente-chilena .pais {
        font-size: 20px;
        letter-spacing: 8px;
      }
    }
    /* Botones dentro de secciones */
    .form-section button {
      background: var(--boton);
      color: #fff;
      border: 2px solid var(--borde);
      border-radius: 6px;
      font-weight: bold;
      font-size: 1rem;
      margin-right: 8px;
      margin-bottom: 8px;
      padding: 10px 18px;
      cursor: pointer;
      transition: background 0.2s;
    }
    .form-section button:hover {
      background: #a80000;
    }
    /* Historial */
    .historial-lista {
      list-style: none;
      padding-left: 0;
      margin-top: 10px;
      margin-bottom: 0;
    }
    .historial-lista li {
      margin-bottom: 6px;
      background: #fff;
      border: 1px solid var(--borde);
      border-radius: 5px;
      padding: 6px 10px;
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 1rem;
      transition: background 0.3s;
      animation: fadeIn 0.4s;
    }
    .historial-lista li button {
      margin: 0 2px;
      padding: 4px 10px;
      font-size: 0.95em;
      border-radius: 4px;
      border-width: 1.5px;
    }
  </style>
</head>
<body>
  <header>
    <h1>Grabador de Patentes Unificado</h1>
  </header>
  <nav>
    <button onclick="mostrarSeccion('appGeneral')">App General</button>
    <button onclick="mostrarSeccion('appChilena')">Patente Chilena</button>
  </nav>
  <div class="container">
    <!-- App General -->
    <section id="appGeneral" class="form-section">
      <h2>Grabador de Patente General</h2>
      <label>Patente:</label>
      <input type="text" id="patenteGeneral" />

      <label>Subir imagen para escanear patente (OCR):</label>
      <input type="file" accept="image/*" onchange="leerOCR(this, 'patenteGeneral', 'vistaPreviaGeneral')" />

      <label>Seleccionar Fuente:</label>
      <select id="fuenteGeneral">
        <option value="Roboto">Roboto</option>
        <option value="Open Sans">Open Sans</option>
        <option value="Montserrat">Montserrat</option>
        <option value="Oswald">Oswald</option>
        <option value="Lobster">Lobster</option>
        <option value="Courier Prime">Courier Prime</option>
        <option value="Orbitron">Orbitron</option>
        <option value="PT Sans Narrow">PT Sans Narrow</option>
        <option value="Anton">Anton</option>
      </select>

      <label>Tamaño de letra (px):</label>
      <input type="number" id="tamanoLetraGeneral" value="48" min="10" max="200" />

      <label>Grosor de letra:</label>
      <select id="grosorLetraGeneral">
        <option value="300">Delgada</option>
        <option value="500">Mediana</option>
        <option value="800">Gruesa</option>
      </select>

      <label>Tamaño del logo (px):</label>
      <input type="number" id="tamanoLogoGeneral" value="40" min="10" max="200" />

      <label>Seleccionar Marca:</label>
      <select id="marcaGeneral" onchange="mostrarInputCustomGeneral(this.value)">
        <option value="">Sin logo</option>
        <option value="toyota">Toyota</option>
        <option value="chevrolet">Chevrolet</option>
        <option value="ford">Ford</option>
        <option value="honda">Honda</option>
        <option value="bmw">BMW</option>
        <option value="mercedes">Mercedes</option>
        <option value="audi">Audi</option>
        <option value="hyundai">Hyundai</option>
        <option value="volkswagen">Volkswagen</option>
        <option value="nissan">Nissan</option>
        <option value="kia">Kia</option>
        <option value="peugeot">Peugeot</option>
        <option value="renault">Renault</option>
        <option value="fiat">Fiat</option>
        <option value="tesla">Tesla</option>
        <option value="jeep">Jeep</option>
        <option value="mazda">Mazda</option>
        <option value="subaru">Subaru</option>
        <option value="mitsubishi">Mitsubishi</option>
        <option value="suzuki">Suzuki</option>
        <option value="landrover">Land Rover</option>
        <option value="volvo">Volvo</option>
        <option value="bentley">Bentley</option>
        <option value="ferrari">Ferrari</option>
        <option value="lamborghini">Lamborghini</option>
        <option value="porsche">Porsche</option>
        <option value="bugatti">Bugatti</option>
        <option value="ram">RAM</option>
        <option value="scania">Scania</option>
        <option value="man">MAN</option>
        <option value="daf">DAF</option>
        <option value="kenworth">Kenworth</option>
        <option value="mack">Mack</option>
        <option value="ducati">Ducati</option>
        <option value="yamaha">Yamaha</option>
        <option value="harley">Harley-Davidson</option>
        <option value="ktm">KTM</option>
        <option value="suzuki-moto">Suzuki (moto)</option>
        <option value="kawasaki">Kawasaki</option>
        <option value="zero">Zero</option>
        <option value="nio">NIO</option>
        <option value="lucid">Lucid Motors</option>
        <option value="rivian">Rivian</option>
        <option value="classic">Vehículo Clásico</option>
        <option value="custom">Custom</option>
      </select>

      <div id="customLogoInputGeneral" style="display:none;">
        <label>Subir logo personalizado:</label>
        <input type="file" id="customLogoFileGeneral" accept="image/*" />
      </div>

      <button onclick="generarVistaPreviaGeneral()">Vista Previa</button>
      <div class="preview" id="vistaPreviaGeneral"></div>
      <button onclick="descargarComoPNG('vistaPreviaGeneral')">Descargar PNG</button>
      <button onclick="compartirWhatsapp('patenteGeneral')">Compartir por WhatsApp</button>

      <h3>Historial de patentes</h3>
      <ul id="historialGeneral" class="historial-lista"></ul>
    </section>

    <!-- Patente Chilena -->
    <section id="appChilena" class="form-section hide">
      <h2>Patente Chilena</h2>
      <label>Patente:</label>
      <input type="text" id="patenteChilena" />

      <label>Subir imagen para escanear patente (OCR):</label>
      <input type="file" accept="image/*" onchange="leerOCR(this, 'patenteChilena', 'vistaPreviaChilena')" />

      <label>Seleccionar Fuente:</label>
      <select id="fuenteChilena">
        <option value="Roboto">Roboto</option>
        <option value="Courier Prime">Courier Prime</option>
        <option value="Anton">Anton</option>
      </select>

      <label>Tamaño de letra (px):</label>
      <input type="number" id="tamanoLetraChilena" value="48" min="10" max="200" />

      <label>Grosor de letra:</label>
      <select id="grosorLetraChilena">
        <option value="300">Delgada</option>
        <option value="500">Mediana</option>
        <option value="800">Gruesa</option>
      </select>

      <label>Tamaño del logo (px):</label>
      <input type="number" id="tamanoLogoChilena" value="40" min="10" max="200" />

      <label>Seleccionar Marca:</label>
      <select id="marcaChilena" onchange="mostrarInputCustomChilena(this.value)">
        <option value="">Sin logo</option>
        <option value="toyota">Toyota</option>
        <option value="chevrolet">Chevrolet</option>
        <option value="ford">Ford</option>
        <option value="custom">Custom</option>
      </select>

      <div id="customLogoInputChilena" style="display:none;">
        <label>Subir Logo Personalizado (PNG, JPG, WEBP):</label>
        <input type="file" id="customLogoFileChilena" accept="image/png, image/jpeg, image/webp" />
      </div>

      <button onclick="generarVistaPreviaChilena()">Vista Previa</button>
      <div class="preview" id="vistaPreviaChilena"></div>
      <button onclick="descargarComoPNG('vistaPreviaChilena')">Descargar PNG</button>
      <button onclick="compartirWhatsapp('patenteChilena')">Compartir por WhatsApp</button>

      <h3>Historial de patentes</h3>
      <ul id="historialChilena" class="historial-lista"></ul>
    </section>
  </div>
<script>
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
</script>
</body>
</html>
