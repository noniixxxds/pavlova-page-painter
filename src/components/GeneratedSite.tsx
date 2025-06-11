
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { SiteData } from '@/utils/siteGenerator';

const GeneratedSite = () => {
  const { siteId } = useParams();
  const [counter, setCounter] = useState({ years: 0, months: 0, days: 0, hours: 0 });
  
  // Dados simulados - em um app real, isso viria de um banco de dados
  const siteData: SiteData = {
    title: 'Nosso Amor',
    partnerName1: 'Guilherme',
    partnerName2: 'Isabela',
    relationshipDate: '1998-10-08',
    message: 'a muito tempo eu te amei, mas de forma platonica todo o amor foi criado mentalmente e nao de verdade para ambas as partes',
    primaryColor: '#f06292',
    photos: [],
    youtubeUrl: ''
  };

  useEffect(() => {
    if (!siteData.relationshipDate) return;

    const updateCounter = () => {
      const startDate = new Date(siteData.relationshipDate);
      const now = new Date();
      
      const diff = now.getTime() - startDate.getTime();
      
      const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
      const months = Math.floor((diff % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30));
      const days = Math.floor((diff % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      
      setCounter({ years, months, days, hours });
    };

    updateCounter();
    const interval = setInterval(updateCounter, 3600000);
    
    return () => clearInterval(interval);
  }, [siteData.relationshipDate]);

  const extractYouTubeVideoId = (url: string): string => {
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : '';
  };

  const youtubeVideoId = siteData.youtubeUrl ? extractYouTubeVideoId(siteData.youtubeUrl) : '';

  return (
    <div className="min-h-screen" style={{
      background: 'linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <div className="max-w-4xl mx-auto px-4 py-8 min-h-screen flex flex-col justify-center items-center text-center text-white">
        <header className="mb-8">
          <h1 
            className="text-5xl md:text-6xl font-bold mb-4 animate-fade-in"
            style={{ 
              color: siteData.primaryColor,
              textShadow: '0 2px 4px rgba(0,0,0,0.3)'
            }}
          >
            {siteData.title}
          </h1>
          <p className="text-2xl text-gray-300 font-light">
            {siteData.partnerName1} ❤️ {siteData.partnerName2}
          </p>
        </header>

        {siteData.photos.length > 0 && (
          <div className="flex gap-4 mb-8 justify-center flex-wrap">
            {siteData.photos.map((photo, index) => (
              <div 
                key={index}
                className="w-24 h-32 rounded-2xl overflow-hidden border-3 shadow-lg"
                style={{ 
                  borderColor: siteData.primaryColor,
                  boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
                }}
              >
                <img 
                  src={photo} 
                  alt={`Foto ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        )}
        
        <main className="mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 max-w-2xl">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
              <div 
                className="text-3xl font-bold mb-2"
                style={{ 
                  color: siteData.primaryColor,
                  textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                }}
              >
                {counter.years}
              </div>
              <div className="text-sm text-gray-300 uppercase tracking-wider">Anos</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
              <div 
                className="text-3xl font-bold mb-2"
                style={{ 
                  color: siteData.primaryColor,
                  textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                }}
              >
                {counter.months}
              </div>
              <div className="text-sm text-gray-300 uppercase tracking-wider">Meses</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
              <div 
                className="text-3xl font-bold mb-2"
                style={{ 
                  color: siteData.primaryColor,
                  textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                }}
              >
                {counter.days}
              </div>
              <div className="text-sm text-gray-300 uppercase tracking-wider">Dias</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
              <div 
                className="text-3xl font-bold mb-2"
                style={{ 
                  color: siteData.primaryColor,
                  textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                }}
              >
                {counter.hours}
              </div>
              <div className="text-sm text-gray-300 uppercase tracking-wider">Horas</div>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 max-w-2xl mb-6">
            <p className="text-lg text-gray-300 leading-relaxed italic">
              {siteData.message}
            </p>
          </div>

          {youtubeVideoId && (
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 max-w-2xl">
              <div className="rounded-lg overflow-hidden">
                <iframe 
                  src={`https://www.youtube.com/embed/${youtubeVideoId}?controls=1&autoplay=0`}
                  className="w-full h-48 md:h-64"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="YouTube video player"
                />
              </div>
            </div>
          )}
        </main>
        
        <footer className="mt-auto pt-8">
          <p className="text-gray-500 text-sm">
            © 2024 {siteData.title}. Feito com ❤️
          </p>
        </footer>
      </div>

      <style>{`
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
        .animate-fade-in {
          animation: fadeInUp 0.8s ease-out;
        }
      `}</style>
    </div>
  );
};

export default GeneratedSite;
