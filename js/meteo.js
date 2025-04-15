// Coordinate geografiche di Tolfa
const TOLFA_COORDS = { latitude: 42.15, longitude: 11.93 };

// Mappatura dei codici meteo alle descrizioni in italiano
const weatherCodeMap = {
  0: 'Sereno', 
  1: 'Prevalentemente sereno', 
  2: 'Parzialmente nuvoloso', 
  3: 'Nuvoloso', 
  45: 'Nebbia', 
  48: 'Nebbia gelata', 
  51: 'Pioviggine leggera', 
  53: 'Pioviggine moderata', 
  55: 'Pioviggine intensa', 
  56: 'Pioggia gelata', 
  57: 'Pioggia gelata intensa', 
  61: 'Pioggia leggera', 
  63: 'Pioggia moderata', 
  65: 'Pioggia intensa', 
  66: 'Pioggia gelata', 
  67: 'Pioggia gelata intensa', 
  71: 'Neve leggera', 
  73: 'Neve moderata', 
  75: 'Neve intensa', 
  77: 'Granelli di neve', 
  80: 'Rovesci leggeri', 
  81: 'Rovesci moderati', 
  82: 'Rovesci violenti', 
  85: 'Nevicate leggere', 
  86: 'Nevicate intense', 
  95: 'Temporale', 
  96: 'Temporale con grandine', 
  99: 'Temporale con grandine intensa'
};

// Nomi dei giorni della settimana in italiano
const daysOfWeek = [
  'Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato'
];

// Ottiene il nome dell'icona in base al codice meteo
function getIconName(code) {
  const customIconMap = {
    0: 'clear-day',
    1: 'clear-day',
    2: 'partly-cloudy-day',
    3: 'cloudy',
    45: 'fog',
    48: 'fog',
    51: 'drizzle',
    53: 'drizzle',
    55: 'drizzle',
    56: 'rain',
    57: 'rain',
    61: 'rain',
    63: 'rain',
    65: 'torrential-rain',
    66: 'sleet',
    67: 'sleet',
    71: 'snow',
    73: 'snow',
    75: 'snow',
    77: 'snow',
    80: 'rain',
    81: 'rain',
    82: 'torrential-rain',
    85: 'snow',
    86: 'snow',
    95: 'thunderstorms',
    96: 'thunderstorms-rain',
    99: 'thunderstorms-rain'
  };
  return customIconMap[code] || 'cloudy';
}

// Rileva se il dispositivo è mobile
function isMobileDevice() {
  return window.innerWidth <= 768 || 
         /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Verifica se la data è oggi
function isToday(dateStr) {
  const today = new Date();
  const date = new Date(dateStr);
  return date.getDate() === today.getDate() && 
         date.getMonth() === today.getMonth() && 
         date.getFullYear() === today.getFullYear();
}

// Versione della cache meteo - incrementare per forzare l'aggiornamento
const CACHE_VERSION = 'v5'; // Incrementato per forzare l'aggiornamento
const DAY_NAMES = ['Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato'];
const CACHE_DURATION = 1800000; // 30 minuti in millisecondi (ridotto per dati più freschi)

// Funzione principale per aggiornare il meteo
async function updateTolfaWeather() {
    try {
        console.log("🌤️ Aggiornamento previsioni meteo per Tolfa...");
        
        // Controlla la cache
        const cachedData = checkWeatherCache();
        if (cachedData) {
            console.log("✅ Trovati dati meteo nella cache, aggiornamento: " + new Date(cachedData.lastUpdated));
            displayWeatherData(cachedData.data);
            displayCurrentTemperature(cachedData.data); // Aggiunta questa riga
            return;
        }

        // Se non c'è cache valida, richiedi i dati dall'API
        console.log("🔄 Nessuna cache valida, richiedo dati dall'API meteo...");
        const [forecastData, currentData] = await Promise.all([
            fetchWeatherData(),
            fetchCurrentWeather()
        ]);
        
        // Combina i dati di previsione con i dati attuali
        const weatherData = {
            ...forecastData,
            current: currentData?.current || null
        };
        
        if (weatherData) {
            displayWeatherData(weatherData);
            displayCurrentTemperature(weatherData); // Aggiunta questa riga
            // Aggiorna la cache
            saveWeatherCache(weatherData);
            console.log("✅ Previsioni meteo aggiornate con successo!");
        }
    } catch (error) {
        console.error("❌ Errore nell'aggiornamento del meteo:", error);
        displayWeatherError();
    }
}

// Funzione per mostrare la temperatura attuale nella sezione dedicata
function displayCurrentTemperature(weatherData) {
    try {
        console.log("📊 Tentativo aggiornamento temperatura attuale", weatherData);
        
        if (!weatherData || !weatherData.current) {
            console.error("⚠️ Dati meteo attuali non disponibili", weatherData);
            
            // Prova a fare una richiesta separata per i dati attuali
            fetchCurrentWeather().then(data => {
                if (data && data.current) {
                    console.log("✅ Recuperati dati aggiornati per la temperatura attuale");
                    
                    const currentTemp = Math.round(data.current.temperature_2m);
                    const weatherCode = data.current.weather_code;
                    const { icon, description } = getWeatherInfo(weatherCode);
                    
                    updateCurrentTempDisplay(currentTemp, icon, description);
                    
                    // Assicura il corretto z-index
                    ensureProperZIndex();
                }
            }).catch(err => {
                console.error("❌ Impossibile recuperare i dati meteo attuali", err);
            });
            
            return;
        }

        const currentTemp = Math.round(weatherData.current.temperature_2m);
        const weatherCode = weatherData.current.weather_code;
        const { icon, description } = getWeatherInfo(weatherCode);
        
        updateCurrentTempDisplay(currentTemp, icon, description);
        
        // Assicura il corretto z-index
        ensureProperZIndex();
    } catch (error) {
        console.error("❌ Errore nella visualizzazione della temperatura attuale:", error);
    }
}

// Funzione per garantire il corretto z-index degli elementi meteo
function ensureProperZIndex() {
    const tempAttualeSection = document.getElementById('temperatura-attuale');
    if (tempAttualeSection) {
        tempAttualeSection.style.position = 'relative';
        tempAttualeSection.style.zIndex = '2';
        
        // Assicura che il contenitore interno abbia anche un z-index appropriato
        const container = tempAttualeSection.querySelector('.container');
        if (container) {
            container.style.position = 'relative';
            container.style.zIndex = '2';
        }
    }
}

// Funzione ausiliaria per aggiornare l'interfaccia della temperatura attuale
function updateCurrentTempDisplay(temp, iconFile, description) {
    const tempElement = document.getElementById('current-temperature');
    const iconElement = document.getElementById('current-weather-icon');
    const descElement = document.getElementById('current-weather-description');
    
    if (tempElement && iconElement && descElement) {
        console.log(`🌡️ Aggiornamento temperatura: ${temp}°C, Icona: ${iconFile}, Descrizione: ${description}`);
        
        tempElement.textContent = `${temp}°C`;
        
        // Usa un percorso assoluto per l'icona
        const iconUrl = window.location.origin + '/icons/' + iconFile;
        console.log("🖼️ URL icona: " + iconUrl);
        
        iconElement.src = iconUrl;
        iconElement.alt = description;
        descElement.textContent = description;
    } else {
        console.error("⚠️ Elementi HTML per la temperatura attuale non trovati");
    }
}

// Funzione per mostrare i dati meteo
function displayWeatherData(weatherData) {
    try {
        // Prepara il container
        const weatherSection = document.querySelector('.weather-section');
        const weatherContainer = document.getElementById('weather-container') || document.createElement('div');
        weatherContainer.id = 'weather-container';
        weatherContainer.className = 'container';
        
        // Pulisci eventuali contenuti precedenti
        weatherContainer.innerHTML = '';
        
        // Crea il titolo
        const title = document.createElement('h2');
        title.textContent = 'Previsioni Meteo';
        title.className = 'mb-4 text-center';
        weatherContainer.appendChild(title);
        
        // Crea il contenitore per la temperatura attuale se disponibile
        if (weatherData.current) {
            const currentTempContainer = document.createElement('div');
            currentTempContainer.className = 'current-temp-container';
            
            // Ottenere l'icona e la descrizione per il codice meteo attuale
            const weatherCode = weatherData.current.weather_code;
            const { icon, description } = getWeatherInfo(weatherCode);
            const currentTemp = Math.round(weatherData.current.temperature_2m);
            
            // Crea HTML per la temperatura attuale
            currentTempContainer.innerHTML = `
                <div class="current-temp-wrapper">
                    <img src="icons/${icon}" alt="${description}" class="current-weather-icon">
                    <div class="current-temp-info">
                        <div class="current-temp">${currentTemp}°C</div>
                        <div class="current-desc">${description}</div>
                        <div class="current-time">Aggiornato alle ${new Date(weatherData.current.time).toLocaleTimeString('it-IT', {hour: '2-digit', minute:'2-digit'})}</div>
                    </div>
                </div>
            `;
            
            weatherContainer.appendChild(currentTempContainer);
        }
        
        // Log informativo sui dati
        const daysReceived = weatherData.daily.time.length;
        console.log(`📊 Ricevuti dati per ${daysReceived} giorni`);
        
        // Rimuovi eventuali sezioni precedenti
        const oldWeatherGrid = document.querySelector('.weather-grid');
        if (oldWeatherGrid) {
            oldWeatherGrid.remove();
        }
        
        // Crea la griglia per le previsioni
        const weatherGrid = document.createElement('div');
        weatherGrid.className = 'weather-grid';
        
        // Assicurati di avere 4 giorni di dati
        let daysToShow = Math.max(4, weatherData.daily.time.length);
        
        // Se abbiamo meno di 4 giorni, copia l'ultimo giorno
        if (weatherData.daily.time.length < 4) {
            console.log("⚠️ API ha restituito meno di 4 giorni, generando dati aggiuntivi");
            const lastIndex = weatherData.daily.time.length - 1;
            const lastDay = new Date(weatherData.daily.time[lastIndex]);
            
            for (let i = weatherData.daily.time.length; i < 4; i++) {
                // Aggiungi un giorno alla data dell'ultimo giorno disponibile
                const nextDay = new Date(lastDay);
                nextDay.setDate(nextDay.getDate() + (i - lastIndex));
                
                // Formatta la data come YYYY-MM-DD
                const formattedDate = nextDay.toISOString().split('T')[0];
                
                // Aggiungi i dati mancanti copiando l'ultimo giorno
                weatherData.daily.time.push(formattedDate);
                weatherData.daily.weathercode.push(weatherData.daily.weathercode[lastIndex]);
                weatherData.daily.temperature_2m_max.push(weatherData.daily.temperature_2m_max[lastIndex]);
                weatherData.daily.temperature_2m_min.push(weatherData.daily.temperature_2m_min[lastIndex]);
                weatherData.daily.precipitation_probability_max.push(
                    weatherData.daily.precipitation_probability_max[lastIndex]
                );
            }
            
            console.log(`✅ Generati dati aggiuntivi, ora abbiamo ${weatherData.daily.time.length} giorni`);
        }
        
        // Limita a 4 giorni esattamente
        daysToShow = 4;
        console.log(`🗓️ Mostro esattamente ${daysToShow} giorni di previsioni`);
        
        // Riempire la griglia con i dati meteo
        for (let i = 0; i < daysToShow; i++) {
            // Crea la card per un giorno
            const day = document.createElement('div');
            day.className = 'weather-day';
            if (i === 0) {
                day.classList.add('today');
            }
            
            // Converti la data YYYY-MM-DD in formato leggibile
            const date = new Date(weatherData.daily.time[i]);
            const dayName = DAY_NAMES[date.getDay()];
            const dateFormatted = `${date.getDate()}/${date.getMonth() + 1}`;
            
            // Imposta il codice meteo e altre informazioni
            const weatherCode = weatherData.daily.weathercode[i];
            const maxTemp = Math.round(weatherData.daily.temperature_2m_max[i]);
            const minTemp = Math.round(weatherData.daily.temperature_2m_min[i]);
            const precipitationProbability = weatherData.daily.precipitation_probability_max[i];
            
            // Ottieni l'icona e la descrizione per il codice meteo
            const { icon, description } = getWeatherInfo(weatherCode);
            
            // Crea HTML per la card
            day.innerHTML = `
                <div class="weather-date">
                    <span class="weather-day-name">${dayName}</span>
                    <br>${dateFormatted}
                </div>
                ${i === 0 ? '<div class="today-badge"></div>' : ''}
                <div class="weather-icon-wrapper">
                    <img src="icons/${icon}" alt="${description}" class="weather-icon-tolfa">
                </div>
                <div class="weather-temp-tolfa">
                    <span class="temp-max">${maxTemp}°</span>
                    <span class="temp-separator">|</span>
                    <span class="temp-min">${minTemp}°</span>
                </div>
                <div class="weather-condition">${description}</div>
                <div class="precipitation-info">
                    <i class="fas fa-tint"></i> ${precipitationProbability}%
                </div>
            `;
            
            weatherGrid.appendChild(day);
        }
        
        // Aggiungi la griglia al container
        weatherContainer.appendChild(weatherGrid);
        
        // Aggiungi l'indicatore di scroll su mobile
        const scrollIndicator = document.createElement('div');
        scrollIndicator.className = 'weather-scroll-indicator';
        scrollIndicator.innerHTML = `
            <div class="scroll-dots">
                <span class="scroll-dot active"></span>
                <span class="scroll-dot"></span>
                <span class="scroll-dot"></span>
                <span class="scroll-dot"></span>
            </div>
            <span>Scorri per vedere tutti i giorni</span>
        `;
        weatherContainer.appendChild(scrollIndicator);
        
        // Aggiungi il container alla sezione meteo o aggiornalo
        if (!document.querySelector('#weather-container')) {
            weatherSection.appendChild(weatherContainer);
        }
        
        // Animazione di comparsa delle card
        setTimeout(() => {
            initWeatherAnimations();
        }, 200);
        
        // Aggiorna lo stato di scroll per i puntini
        initWeatherScrollIndicator();
    } catch (error) {
        console.error("❌ Errore nella visualizzazione del meteo:", error);
        displayWeatherError();
    }
}

// Funzione per il fetch dei dati attuali dall'API
async function fetchCurrentWeather() {
    const tolfaCoordinates = { lat: 42.1523, lon: 11.9355 };
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${tolfaCoordinates.lat}&longitude=${tolfaCoordinates.lon}&current=temperature_2m,weather_code&timezone=Europe/Rome`;
    
    console.log(`🔍 Richiedo dati meteo attuali: ${url}`);
    
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Errore HTTP: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error("❌ Errore nella richiesta meteo attuale:", error);
        return null; // Ritorna null invece di lanciare un errore per consentire alle previsioni di continuare
    }
}

// Funzione per il fetch dei dati dall'API
async function fetchWeatherData() {
    const tolfaCoordinates = { lat: 42.1523, lon: 11.9355 };
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${tolfaCoordinates.lat}&longitude=${tolfaCoordinates.lon}&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=Europe/Rome&forecast_days=4`;
    
    console.log(`🔍 Richiedo URL: ${url}`);
    
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Errore HTTP: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error("❌ Errore nella richiesta meteo:", error);
        throw error;
    }
}

// Verifica se esiste una cache valida
function checkWeatherCache() {
    try {
        const cachedWeather = localStorage.getItem(`tolfa-weather-${CACHE_VERSION}`);
        if (!cachedWeather) return null;
        
        const { data, lastUpdated } = JSON.parse(cachedWeather);
        const now = new Date().getTime();
        
        // Verifica che la cache sia valida (meno di 30 minuti)
        if (now - lastUpdated < CACHE_DURATION) {
            return { data, lastUpdated };
        } else {
            console.log("⏰ Cache meteo scaduta");
            return null;
        }
    } catch (error) {
        console.error("⚠️ Errore nella lettura della cache meteo:", error);
        localStorage.removeItem(`tolfa-weather-${CACHE_VERSION}`);
        // Rimuovi anche eventuali versioni precedenti della cache
        localStorage.removeItem('tolfa-weather-v3');
        localStorage.removeItem('tolfa-weather-v2');
        localStorage.removeItem('tolfa-weather-v1');
        localStorage.removeItem('tolfa-weather');
        return null;
    }
}

// Salva i dati nella cache
function saveWeatherCache(data) {
    try {
        const cacheData = {
            data,
            lastUpdated: new Date().getTime()
        };
        localStorage.setItem(`tolfa-weather-${CACHE_VERSION}`, JSON.stringify(cacheData));
        console.log("💾 Dati meteo salvati nella cache");
    } catch (error) {
        console.error("⚠️ Errore nel salvataggio della cache meteo:", error);
    }
}

// Mostra un messaggio di errore
function displayWeatherError() {
    const weatherSection = document.querySelector('.weather-section');
    const weatherContainer = document.getElementById('weather-container') || document.createElement('div');
    weatherContainer.id = 'weather-container';
    weatherContainer.className = 'container';
    
    weatherContainer.innerHTML = `
        <h2 class="mb-4 text-center">Previsioni Meteo</h2>
        <div class="weather-error">
            <p>Impossibile caricare le previsioni meteo</p>
            <small>Controlla la connessione e riprova</small>
            <br>
            <button onclick="updateTolfaWeather()" class="mt-3">
                <i class="fas fa-sync-alt"></i> Riprova
            </button>
        </div>
    `;
    
    if (!document.querySelector('#weather-container')) {
        weatherSection.appendChild(weatherContainer);
    }
}

// Inizializza le animazioni per le card meteo
function initWeatherAnimations() {
    const weatherCards = document.querySelectorAll('.weather-day');
    
    // Su desktop, l'animazione è gestita dal CSS
    if (window.innerWidth >= 992) return;
    
    // Su mobile, animiamo manualmente
    weatherCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100 * index);
    });
}

// Inizializza l'indicatore di scroll
function initWeatherScrollIndicator() {
    const weatherGrid = document.querySelector('.weather-grid');
    const dots = document.querySelectorAll('.scroll-dot');
    
    if (!weatherGrid || window.innerWidth >= 992) return;
    
    weatherGrid.addEventListener('scroll', () => {
        const scrollPosition = weatherGrid.scrollLeft;
        const maxScroll = weatherGrid.scrollWidth - weatherGrid.clientWidth;
        const scrollPercentage = scrollPosition / maxScroll;
        
        // Aggiorna i puntini in base allo scroll
        dots.forEach((dot, index) => {
            const dotPosition = index / (dots.length - 1);
            if (Math.abs(scrollPercentage - dotPosition) < 0.25) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    });
}

// Funzione per ottenere icona e descrizione in base al codice meteo
function getWeatherInfo(code) {
    // Codici meteo WMO: https://www.nodc.noaa.gov/archive/arc0021/0002199/1.1/data/0-data/HTML/WMO-CODE/WMO4677.HTM
    switch(code) {
        case 0: // Clear sky
            return { icon: 'clear-day.png', description: 'Cielo sereno' };
        case 1:
        case 2: // Partly cloudy
            return { icon: 'partly-cloudy-day.png', description: 'Parzialmente nuvoloso' };
        case 3: // Cloudy
            return { icon: 'cloudy.png', description: 'Nuvoloso' };
        case 45:
        case 48: // Fog
            return { icon: 'fog.png', description: 'Nebbia' };
        case 51:
        case 53:
        case 55: // Drizzle
            return { icon: 'drizzle.png', description: 'Pioggia leggera' };
        case 56:
        case 57: // Freezing Drizzle
            return { icon: 'sleet.png', description: 'Pioggia gelata' };
        case 61:
        case 63:
        case 65: // Rain
            return { icon: 'rain.png', description: 'Pioggia' };
        case 66:
        case 67: // Freezing Rain
            return { icon: 'sleet.png', description: 'Pioggia gelata' };
        case 71:
        case 73:
        case 75: // Snow
            return { icon: 'snow.png', description: 'Neve' };
        case 77: // Snow grains
            return { icon: 'snow.png', description: 'Nevischio' };
        case 80:
        case 81:
        case 82: // Rain showers
            return { icon: 'rain.png', description: 'Rovesci di pioggia' };
        case 85:
        case 86: // Snow showers
            return { icon: 'snow.png', description: 'Rovesci di neve' };
        case 95: // Thunderstorm
            return { icon: 'thunderstorms.png', description: 'Temporale' };
        case 96:
        case 99: // Thunderstorm with hail
            return { icon: 'thunderstorms-rain.png', description: 'Temporale con grandine' };
        default:
            return { icon: 'partly-cloudy-day.png', description: 'Previsione non disponibile' };
    }
}

// Avvio l'aggiornamento del meteo quando il documento è pronto
document.addEventListener('DOMContentLoaded', function() {
    console.log("🌤️ Inizializzazione meteo...");
    
    // Crea la sezione meteo se non esiste
    let weatherSection = document.querySelector('.weather-section');
    if (!weatherSection) {
        weatherSection = document.createElement('section');
        weatherSection.className = 'weather-section';
        weatherSection.id = 'meteo';
        
        // Posiziona dopo la hero o come prima sezione
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.after(weatherSection);
        } else {
            document.querySelector('main').prepend(weatherSection);
        }
    }
    
    // Aggiorna il meteo
    updateTolfaWeather();
});