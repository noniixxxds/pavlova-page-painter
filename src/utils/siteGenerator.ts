export interface SiteData {
  title: string;
  partnerName1: string;
  partnerName2: string;
  relationshipDate: string;
  message: string;
  primaryColor: string;
  photos: string[];
  youtubeUrl: string;
}

// Mapa para armazenar os dados dos sites gerados
const generatedSites = new Map<string, SiteData>();

export const generateHTML = (data: SiteData): string => {
  const youtubeVideoId = data.youtubeUrl ? extractYouTubeVideoId(data.youtubeUrl) : '';
  
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${data.title}</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <header class="header">
            <h1 class="title">${data.title}</h1>
            <p class="subtitle">${data.partnerName1} ❤️ ${data.partnerName2}</p>
        </header>
        
        ${data.photos.length > 0 ? `
        <div class="photos-section">
            ${data.photos.map(photo => `
                <div class="photo-story">
                    <img src="${photo}" alt="Foto do casal" />
                </div>
            `).join('')}
        </div>
        ` : ''}
        
        <main class="main">
            <div class="counter-section">
                <div class="counter-item">
                    <span class="counter-number" id="years">0</span>
                    <span class="counter-label">Anos</span>
                </div>
                <div class="counter-item">
                    <span class="counter-number" id="months">0</span>
                    <span class="counter-label">Meses</span>
                </div>
                <div class="counter-item">
                    <span class="counter-number" id="days">0</span>
                    <span class="counter-label">Dias</span>
                </div>
                <div class="counter-item">
                    <span class="counter-number" id="hours">0</span>
                    <span class="counter-label">Horas</span>
                </div>
            </div>
            
            <div class="message-section">
                <p class="message">${data.message}</p>
            </div>
            
            ${youtubeVideoId ? `
            <div class="music-section">
                <div class="youtube-player">
                    <iframe 
                        src="https://www.youtube.com/embed/${youtubeVideoId}?controls=1&autoplay=0" 
                        frameborder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen>
                    </iframe>
                </div>
            </div>
            ` : ''}
        </main>
        
        <footer class="footer">
            <p>&copy; 2024 ${data.title}. Feito com ❤️</p>
        </footer>
    </div>

    <script>
        function updateCounter() {
            const startDate = new Date('${data.relationshipDate}');
            const now = new Date();
            
            const diff = now - startDate;
            
            const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
            const months = Math.floor((diff % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30));
            const days = Math.floor((diff % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            
            document.getElementById('years').textContent = years;
            document.getElementById('months').textContent = months;
            document.getElementById('days').textContent = days;
            document.getElementById('hours').textContent = hours;
        }
        
        updateCounter();
        setInterval(updateCounter, 3600000);
    </script>
</body>
</html>`;
};

export const generateCSS = (data: SiteData): string => {
  return `* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    line-height: 1.6;
    color: #fff;
    background: linear-gradient(135deg, #1a1a2e, #16213e, #0f3460);
    min-height: 100vh;
}

.container {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
}

.header {
    margin-bottom: 2rem;
    animation: fadeInUp 0.8s ease-out;
}

.title {
    font-size: 3rem;
    font-weight: 700;
    color: ${data.primaryColor};
    margin-bottom: 1rem;
    text-shadow: 0 2px 4px rgba(0,0,0,0.3);
}

.subtitle {
    font-size: 1.5rem;
    color: #e0e0e0;
    font-weight: 300;
}

.photos-section {
    display: flex;
    gap: 1rem;
    margin-bottom: 2rem;
    flex-wrap: wrap;
    justify-content: center;
    animation: fadeInUp 0.8s ease-out 0.1s both;
}

.photo-story {
    width: 120px;
    height: 160px;
    border-radius: 15px;
    overflow: hidden;
    border: 3px solid ${data.primaryColor};
    box-shadow: 0 4px 15px rgba(0,0,0,0.3);
}

.photo-story img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.main {
    margin-bottom: 3rem;
    animation: fadeInUp 0.8s ease-out 0.2s both;
}

.counter-section {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
    max-width: 500px;
}

.counter-item {
    background: rgba(255, 255, 255, 0.1);
    padding: 1.5rem 1rem;
    border-radius: 20px;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    transition: transform 0.3s ease;
}

.counter-item:hover {
    transform: translateY(-5px);
}

.counter-number {
    display: block;
    font-size: 2rem;
    font-weight: 700;
    color: ${data.primaryColor};
    text-shadow: 0 2px 4px rgba(0,0,0,0.3);
}

.counter-label {
    display: block;
    font-size: 0.9rem;
    color: #e0e0e0;
    margin-top: 0.5rem;
    text-transform: uppercase;
    letter-spacing: 1px;
}

.message-section {
    background: rgba(255, 255, 255, 0.1);
    padding: 2rem;
    border-radius: 20px;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    margin-bottom: 2rem;
    max-width: 600px;
}

.message {
    font-size: 1.2rem;
    line-height: 1.8;
    color: #e0e0e0;
    font-style: italic;
}

.music-section {
    margin-bottom: 2rem;
}

.youtube-player {
    background: rgba(255, 255, 255, 0.1);
    padding: 1rem;
    border-radius: 20px;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
}

.youtube-player iframe {
    width: 100%;
    max-width: 560px;
    height: 200px;
    border-radius: 10px;
}

.footer {
    margin-top: auto;
    padding-top: 2rem;
    color: #888;
    font-size: 0.9rem;
    animation: fadeInUp 0.8s ease-out 0.4s both;
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@media (max-width: 768px) {
    .container {
        padding: 1rem;
    }
    
    .title {
        font-size: 2rem;
    }
    
    .photos-section {
        gap: 0.5rem;
    }
    
    .photo-story {
        width: 100px;
        height: 130px;
    }
    
    .counter-section {
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;
        max-width: 300px;
    }
    
    .counter-number {
        font-size: 1.5rem;
    }
    
    .youtube-player iframe {
        height: 150px;
    }
}`;
};

const extractYouTubeVideoId = (url: string): string => {
  const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url.match(regex);
  return match ? match[1] : '';
};

// Gerar URL única e salvar dados do site
export const generateSiteUrl = (data: SiteData): string => {
  // Gerar um ID único e mais longo para evitar colisões
  const siteId = Date.now().toString(36) + Math.random().toString(36).substring(2, 15);
  
  // Salvar os dados no mapa
  generatedSites.set(siteId, data);
  
  console.log('Site gerado com ID:', siteId);
  console.log('Dados salvos:', data);
  console.log('Sites armazenados:', Array.from(generatedSites.keys()));
  
  return siteId;
};

// Buscar dados do site pelo ID
export const getSiteData = (siteId: string): SiteData | null => {
  console.log('Buscando site com ID:', siteId);
  console.log('Sites disponíveis:', Array.from(generatedSites.keys()));
  
  const data = generatedSites.get(siteId);
  console.log('Dados encontrados:', data);
  
  return data || null;
};
