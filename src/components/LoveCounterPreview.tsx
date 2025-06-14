
import { SiteData } from '@/utils/siteGenerator';
import { useEffect, useState } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface LoveCounterPreviewProps {
  data: SiteData;
}

const LoveCounterPreview = ({ data }: LoveCounterPreviewProps) => {
  const [counter, setCounter] = useState({ years: 0, months: 0, days: 0, hours: 0 });

  useEffect(() => {
    if (!data.relationshipDate) return;

    const updateCounter = () => {
      const startDate = new Date(data.relationshipDate);
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
  }, [data.relationshipDate]);

  const extractYouTubeVideoId = (url: string): string => {
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : '';
  };

  const youtubeVideoId = data.youtubeUrl ? extractYouTubeVideoId(data.youtubeUrl) : '';

  return (
    <div className="w-full max-w-4xl mx-auto bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 rounded-lg shadow-xl overflow-hidden">
      <div className="bg-gray-800 px-4 py-2 flex items-center space-x-2">
        <div className="flex space-x-1">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        </div>
        <div className="bg-gray-700 rounded px-3 py-1 text-sm text-gray-300 flex-1">
          love-counter-{Math.random().toString(36).substring(2, 8)}.lovecounter.app
        </div>
      </div>
      
      <div className="p-8 min-h-[500px] flex flex-col justify-center items-center text-center text-white">
        <div className="mb-6 animate-fade-in">
          <h1 
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ color: data.primaryColor }}
          >
            {data.title || 'Love Counter'}
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 font-light">
            {data.partnerName1 || 'Partner 1'} ❤️ {data.partnerName2 || 'Partner 2'}
          </p>
        </div>

        {data.photos.length > 0 && (
          <div className="w-full max-w-xs mb-6 animate-fade-in">
            <Carousel className="w-full">
              <CarouselContent>
                {data.photos.map((photo, index) => (
                  <CarouselItem key={index}>
                    <div className="p-1">
                      <div 
                        className="aspect-[9/16] rounded-lg overflow-hidden border-2 border-white/20 mx-auto"
                        style={{ 
                          borderColor: data.primaryColor,
                          maxHeight: '200px',
                          width: 'auto'
                        }}
                      >
                        <img 
                          src={photo} 
                          alt={`Foto ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="text-white border-white hover:bg-white/20 -left-8" />
              <CarouselNext className="text-white border-white hover:bg-white/20 -right-8" />
            </Carousel>
          </div>
        )}
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6 w-full max-w-xl animate-fade-in">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/20">
            <div 
              className="text-2xl font-bold mb-1"
              style={{ color: data.primaryColor }}
            >
              {counter.years}
            </div>
            <div className="text-xs text-gray-300 uppercase tracking-wider">Anos</div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/20">
            <div 
              className="text-2xl font-bold mb-1"
              style={{ color: data.primaryColor }}
            >
              {counter.months}
            </div>
            <div className="text-xs text-gray-300 uppercase tracking-wider">Meses</div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/20">
            <div 
              className="text-2xl font-bold mb-1"
              style={{ color: data.primaryColor }}
            >
              {counter.days}
            </div>
            <div className="text-xs text-gray-300 uppercase tracking-wider">Dias</div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/20">
            <div 
              className="text-2xl font-bold mb-1"
              style={{ color: data.primaryColor }}
            >
              {counter.hours}
            </div>
            <div className="text-xs text-gray-300 uppercase tracking-wider">Horas</div>
          </div>
        </div>
        
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 max-w-lg mb-4 animate-fade-in">
          <p className="text-sm text-gray-300 italic leading-relaxed">
            {data.message || 'Sua mensagem especial aparecerá aqui...'}
          </p>
        </div>

        {youtubeVideoId && (
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 max-w-lg mb-4 animate-fade-in">
            <div className="aspect-video rounded-lg overflow-hidden">
              <iframe 
                src={`https://www.youtube.com/embed/${youtubeVideoId}?controls=1&autoplay=0`}
                className="w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="YouTube video player"
              />
            </div>
          </div>
        )}
        
        <div className="mt-auto pt-6">
          <p className="text-gray-500 text-sm">
            © 2024 {data.title || 'Love Counter'}. Feito com ❤️
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoveCounterPreview;
