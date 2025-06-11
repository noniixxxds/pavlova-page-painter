
export interface SiteData {
  title: string;
  subtitle: string;
  paragraph: string;
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
            <h2 class="subtitle">${data.subtitle}</h2>
        </header>
        
        <main class="main">
            <p class="paragraph">${data.paragraph}</p>
            <button class="cta-button">Saiba Mais</button>
        </main>
        
        <footer class="footer">
            <p>&copy; 2024 ${data.title}. Todos os direitos reservados.</p>
        </footer>
    </div>
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
    color: #333;
    background: linear-gradient(135deg, ${data.primaryColor}15, ${data.primaryColor}05);
    min-height: 100vh;
}

.container {
    max-width: 1200px;
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
    font-size: 3.5rem;
    font-weight: 700;
    color: ${data.primaryColor};
    margin-bottom: 1rem;
    text-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.subtitle {
    font-size: 1.5rem;
    color: #666;
    font-weight: 300;
    margin-bottom: 2rem;
}

.main {
    margin-bottom: 3rem;
    max-width: 800px;
    animation: fadeInUp 0.8s ease-out 0.2s both;
}

.paragraph {
    font-size: 1.2rem;
    line-height: 1.8;
    color: #555;
    margin-bottom: 2.5rem;
}

.cta-button {
    background: ${data.primaryColor};
    color: white;
    padding: 1rem 2.5rem;
    border: none;
    border-radius: 50px;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
}

.cta-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0,0,0,0.3);
    background: ${data.primaryColor}dd;
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
        font-size: 2.5rem;
    }
    
    .subtitle {
        font-size: 1.2rem;
    }
    
    .paragraph {
        font-size: 1rem;
    }
}`;
};

export const downloadFile = (content: string, filename: string, type: string = 'text/plain') => {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export const downloadSiteFiles = (data: SiteData) => {
  const htmlContent = generateHTML(data);
  const cssContent = generateCSS(data);
  
  // Download HTML file
  downloadFile(htmlContent, 'index.html', 'text/html');
  
  // Download CSS file with a small delay
  setTimeout(() => {
    downloadFile(cssContent, 'style.css', 'text/css');
  }, 500);
};
