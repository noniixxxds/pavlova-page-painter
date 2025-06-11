
export interface SiteData {
  title: string;
  partnerName1: string;
  partnerName2: string;
  relationshipDate: string;
  message: string;
  primaryColor: string;
}

export const generateHTML = (data: SiteData): string => {
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
        setInterval(updateCounter, 3600000); // Atualiza a cada hora
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
    margin-bottom: 3rem;
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

.main {
    margin-bottom: 3rem;
    animation: fadeInUp 0.8s ease-out 0.2s both;
}

.counter-section {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 2rem;
    margin-bottom: 3rem;
}

.counter-item {
    background: rgba(255, 255, 255, 0.1);
    padding: 2rem 1rem;
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
    font-size: 3rem;
    font-weight: 700;
    color: ${data.primaryColor};
    text-shadow: 0 2px 4px rgba(0,0,0,0.3);
}

.counter-label {
    display: block;
    font-size: 1rem;
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
}

.message {
    font-size: 1.2rem;
    line-height: 1.8;
    color: #e0e0e0;
    font-style: italic;
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
    
    .counter-section {
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;
    }
    
    .counter-number {
        font-size: 2rem;
    }
}`;
};

// Simular salvamento e gerar URL
export const generateSiteUrl = (data: SiteData): string => {
  const siteId = Math.random().toString(36).substring(2, 15);
  // Em um cenário real, aqui você salvaria os arquivos no servidor
  console.log('Site gerado:', { siteId, data });
  return `https://love-counter-${siteId}.lovable.app`;
};
