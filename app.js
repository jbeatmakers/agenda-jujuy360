// Datos de ejemplo de eventos deportivos en Jujuy
const eventosDeportivos = [
    {
        id: 1,
        nombre: "Partido Gimnasia y Esgrima de Jujuy",
        deporte: "futbol",
        ciudad: "san-salvador",
        fecha: "2025-10-15",
        hora: "21:00",
        lugar: "Estadio 23 de Agosto",
        direccion: "Av. 19 de Abril, San Salvador de Jujuy",
        coordenadas: { lat: -24.1858, lng: -65.2995 },
        descripcion: "Torneo Nacional - Primera Nacional",
        fuente: "Liga Profesional de Fútbol"
    },
    {
        id: 2,
        nombre: "Copa Jujuy de Pádel 2025",
        deporte: "padel",
        ciudad: "san-salvador",
        fecha: "2025-10-20",
        hora: "09:00",
        lugar: "Complejo Deportivo Provincial",
        direccion: "Ruta Nacional 9, San Salvador de Jujuy",
        coordenadas: { lat: -24.1945, lng: -65.3015 },
        descripcion: "Torneo Provincial de Pádel - Todas las categorías",
        fuente: "Unión Jujeña de Pádel"
    },
    {
        id: 3,
        nombre: "Jujuy Corre 2025",
        deporte: "running",
        ciudad: "san-salvador",
        fecha: "2025-11-16",
        hora: "07:00",
        lugar: "Plaza Belgrano",
        direccion: "Centro, San Salvador de Jujuy",
        coordenadas: { lat: -24.1857, lng: -65.2995 },
        descripcion: "Maratón urbana 21K, 10K y 5K",
        fuente: "Fundación URKU"
    },
    {
        id: 4,
        nombre: "Tilcara Trail Running",
        deporte: "running",
        ciudad: "tilcara",
        fecha: "2025-10-25",
        hora: "08:00",
        lugar: "Pucara de Tilcara",
        direccion: "Tilcara, Jujuy",
        coordenadas: { lat: -23.5775, lng: -65.3958 },
        descripcion: "Carrera de montaña en la Quebrada de Humahuaca",
        fuente: "URKU Trail & Running"
    },
    {
        id: 5,
        nombre: "Campeonato Teco Racing Jujuy",
        deporte: "motor",
        ciudad: "san-salvador",
        fecha: "2025-10-12",
        hora: "14:00",
        lugar: "Ciudad Cultural",
        direccion: "Av. Almirante Brown, San Salvador de Jujuy",
        coordenadas: { lat: -24.1902, lng: -65.3043 },
        descripcion: "Exhibición de autos clásicos y competencia",
        fuente: "Club de Autos de Colección Jujuy"
    },
    {
        id: 6,
        nombre: "Torneo de Básquet Provincial",
        deporte: "basquet",
        ciudad: "palpala",
        fecha: "2025-10-18",
        hora: "19:00",
        lugar: "Polideportivo de Palpalá",
        direccion: "Palpalá, Jujuy",
        coordenadas: { lat: -24.2572, lng: -65.2119 },
        descripcion: "Liga Provincial de Básquet - Semifinales",
        fuente: "Federación Jujeña de Básquet"
    }
];

// Variables globales
let eventosFiltrados = [...eventosDeportivos];

// Inicializar la aplicación
document.addEventListener('DOMContentLoaded', function() {
    cargarEventos();
    configurarFiltros();
    actualizarCuentasRegresivas();
    setInterval(actualizarCuentasRegresivas, 60000); // Actualizar cada minuto
});

// Función para cargar eventos en el DOM
function cargarEventos() {
    const contenedor = document.getElementById('listaEventos');
    const sinEventos = document.getElementById('sinEventos');
    
    contenedor.innerHTML = '';
    
    if (eventosFiltrados.length === 0) {
        sinEventos.style.display = 'block';
        return;
    }
    
    sinEventos.style.display = 'none';
    
    eventosFiltrados.forEach(evento => {
        const eventoCard = crearTarjetaEvento(evento);
        contenedor.appendChild(eventoCard);
    });
}

// Crear tarjeta HTML para un evento
function crearTarjetaEvento(evento) {
    const col = document.createElement('div');
    col.className = 'col-md-6 col-lg-4';
    
    const fechaEvento = new Date(evento.fecha + 'T' + evento.hora);
    const tiempoRestante = calcularTiempoRestante(fechaEvento);
    
    col.innerHTML = `
        <div class="evento-card" data-deporte="${evento.deporte}" data-ciudad="${evento.ciudad}">
            <div class="evento-header">
                <h3 class="evento-titulo">${evento.nombre}</h3>
                <span class="evento-deporte deporte-${evento.deporte}">${obtenerNombreDeporte(evento.deporte)}</span>
            </div>
            <div class="evento-info">
                <p><i class="bi bi-calendar-event"></i> <strong>Fecha:</strong> ${formatearFecha(fechaEvento)}</p>
                <p><i class="bi bi-clock"></i> <strong>Hora:</strong> ${evento.hora} hs</p>
                <p><i class="bi bi-geo-alt-fill"></i> <strong>Lugar:</strong> ${evento.lugar}</p>
                <p><i class="bi bi-pin-map"></i> <strong>Ciudad:</strong> ${obtenerNombreCiudad(evento.ciudad)}</p>
                <p><i class="bi bi-info-circle"></i> ${evento.descripcion}</p>
            </div>
            <div class="cuenta-regresiva" data-fecha="${evento.fecha}T${evento.hora}">
                <div class="cuenta-regresiva-texto">Faltan</div>
                <div class="cuenta-regresiva-numeros">${tiempoRestante}</div>
            </div>
            <small class="text-muted"><i class="bi bi-link-45deg"></i> Fuente: ${evento.fuente}</small>
        </div>
    `;
    
    return col;
}

// Calcular tiempo restante
function calcularTiempoRestante(fechaEvento) {
    const ahora = new Date();
    const diferencia = fechaEvento - ahora;
    
    if (diferencia < 0) {
        return 'Evento finalizado';
    }
    
    const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
    
    if (dias > 0) {
        return `${dias} día${dias > 1 ? 's' : ''} ${horas} hora${horas !== 1 ? 's' : ''}`;
    } else if (horas > 0) {
        return `${horas} hora${horas !== 1 ? 's' : ''} ${minutos} min`;
    } else {
        return `${minutos} minuto${minutos !== 1 ? 's' : ''}`;
    }
}

// Actualizar todas las cuentas regresivas
function actualizarCuentasRegresivas() {
    const cuentas = document.querySelectorAll('.cuenta-regresiva');
    cuentas.forEach(cuenta => {
        const fechaStr = cuenta.getAttribute('data-fecha');
        const fechaEvento = new Date(fechaStr);
        const tiempoRestante = calcularTiempoRestante(fechaEvento);
        const numerosDiv = cuenta.querySelector('.cuenta-regresiva-numeros');
        if (numerosDiv) {
            numerosDiv.textContent = tiempoRestante;
        }
    });
}

// Configurar filtros
function configurarFiltros() {
    const filtroDeporte = document.getElementById('filtroDeporte');
    const filtroCiudad = document.getElementById('filtroCiudad');
    const busqueda = document.getElementById('busqueda');
    
    filtroDeporte.addEventListener('change', aplicarFiltros);
    filtroCiudad.addEventListener('change', aplicarFiltros);
    busqueda.addEventListener('input', aplicarFiltros);
}

// Aplicar filtros
function aplicarFiltros() {
    const deporteSeleccionado = document.getElementById('filtroDeporte').value;
    const ciudadSeleccionada = document.getElementById('filtroCiudad').value;
    const terminoBusqueda = document.getElementById('busqueda').value.toLowerCase();
    
    eventosFiltrados = eventosDeportivos.filter(evento => {
        const cumpleDeporte = !deporteSeleccionado || evento.deporte === deporteSeleccionado;
        const cumpleCiudad = !ciudadSeleccionada || evento.ciudad === ciudadSeleccionada;
        const cumpleBusqueda = !terminoBusqueda || 
            evento.nombre.toLowerCase().includes(terminoBusqueda) ||
            evento.descripcion.toLowerCase().includes(terminoBusqueda) ||
            evento.lugar.toLowerCase().includes(terminoBusqueda);
        
        return cumpleDeporte && cumpleCiudad && cumpleBusqueda;
    });
    
    cargarEventos();
}

// Formatear fecha
function formatearFecha(fecha) {
    const opciones = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return fecha.toLocaleDateString('es-AR', opciones);
}

// Obtener nombre del deporte
function obtenerNombreDeporte(codigo) {
    const deportes = {
        futbol: 'Fútbol',
        basquet: 'Básquet',
        running: 'Running',
        motor: 'Motor',
        padel: 'Pádel',
        otros: 'Otros'
    };
    return deportes[codigo] || codigo;
}

// Obtener nombre de ciudad
function obtenerNombreCiudad(codigo) {
    const ciudades = {
        'san-salvador': 'San Salvador de Jujuy',
        'palpala': 'Palpalá',
        'tilcara': 'Tilcara',
        'humahuaca': 'Humahuaca',
        'perico': 'Perico',
        'otras': 'Otras'
    };
    return ciudades[codigo] || codigo;
}
