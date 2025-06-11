
import { SiteData } from '@/utils/siteGenerator';

interface SitePreviewProps {
  data: SiteData;
}

const SitePreview = ({ data }: SitePreviewProps) => {
  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
      <div className="bg-gray-100 px-4 py-2 flex items-center space-x-2">
        <div className="flex space-x-1">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        </div>
        <div className="bg-white rounded px-3 py-1 text-sm text-gray-600 flex-1">
          {data.title.toLowerCase().replace(/\s+/g, '-')}.html
        </div>
      </div>
      
      <div 
        className="p-8 min-h-[400px] flex flex-col justify-center items-center text-center"
        style={{
          background: `linear-gradient(135deg, ${data.primaryColor}15, ${data.primaryColor}05)`
        }}
      >
        <div className="mb-8 animate-fade-in">
          <h1 
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ color: data.primaryColor }}
          >
            {data.title}
          </h1>
          <h2 className="text-xl md:text-2xl text-gray-600 font-light mb-6">
            {data.subtitle}
          </h2>
        </div>
        
        <div className="max-w-2xl animate-fade-in">
          <p className="text-lg text-gray-700 mb-8 leading-relaxed">
            {data.paragraph}
          </p>
          <button 
            className="px-8 py-3 rounded-full text-white font-semibold text-lg transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            style={{ backgroundColor: data.primaryColor }}
          >
            Saiba Mais
          </button>
        </div>
        
        <div className="mt-auto pt-8">
          <p className="text-gray-500 text-sm">
            © 2024 {data.title}. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SitePreview;
