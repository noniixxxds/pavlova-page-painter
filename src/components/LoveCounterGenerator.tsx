
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, ArrowRight, Link2, Calendar, MessageSquare, Palette } from 'lucide-react';
import { SiteData, generateSiteUrl } from '@/utils/siteGenerator';
import LoveCounterPreview from './LoveCounterPreview';
import { toast } from 'sonner';

const LoveCounterGenerator = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [generatedUrl, setGeneratedUrl] = useState<string>('');
  const [siteData, setSiteData] = useState<SiteData>({
    title: '',
    partnerName1: '',
    partnerName2: '',
    relationshipDate: '',
    message: '',
    primaryColor: '#e91e63'
  });

  const steps = [
    { number: 1, title: 'Título', icon: Heart, description: 'Nome da sua página de amor' },
    { number: 2, title: 'Casal', icon: Heart, description: 'Nomes do casal' },
    { number: 3, title: 'Data', icon: Calendar, description: 'Data do início do relacionamento' },
    { number: 4, title: 'Mensagem', icon: MessageSquare, description: 'Mensagem especial' },
    { number: 5, title: 'Cor', icon: Palette, description: 'Cor principal do site' }
  ];

  const handleInputChange = (field: keyof SiteData, value: string) => {
    setSiteData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const generateSite = () => {
    try {
      const url = generateSiteUrl(siteData);
      setGeneratedUrl(url);
      toast.success('Site gerado com sucesso!', {
        description: 'Seu site de amor está pronto para ser compartilhado.'
      });
    } catch (error) {
      toast.error('Erro ao gerar o site', {
        description: 'Tente novamente ou verifique os dados inseridos.'
      });
    }
  };

  const predefinedColors = [
    '#e91e63', // Pink
    '#f06292', // Light Pink
    '#ad1457', // Dark Pink
    '#880e4f', // Very Dark Pink
    '#ff5722', // Deep Orange
    '#ff9800', // Orange
    '#9c27b0', // Purple
    '#673ab7', // Deep Purple
  ];

  const isStepValid = () => {
    switch (currentStep) {
      case 1: return siteData.title.trim() !== '';
      case 2: return siteData.partnerName1.trim() !== '' && siteData.partnerName2.trim() !== '';
      case 3: return siteData.relationshipDate !== '';
      case 4: return siteData.message.trim() !== '';
      case 5: return siteData.primaryColor !== '';
      default: return false;
    }
  };

  if (generatedUrl) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full text-center">
          <CardHeader>
            <CardTitle className="text-3xl text-pink-600 mb-4">
              🎉 Seu site está pronto!
            </CardTitle>
            <CardDescription className="text-lg">
              Compartilhe este link especial com quem você ama
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg border-2 border-dashed border-gray-300">
              <div className="flex items-center justify-center gap-2 text-lg font-mono">
                <Link2 className="w-5 h-5" />
                {generatedUrl}
              </div>
            </div>
            
            <div className="flex gap-4 justify-center">
              <Button 
                onClick={() => navigator.clipboard.writeText(generatedUrl)}
                variant="outline"
              >
                Copiar Link
              </Button>
              <Button 
                onClick={() => window.open(generatedUrl, '_blank')}
                className="bg-pink-600 hover:bg-pink-700"
              >
                Abrir Site
              </Button>
            </div>
            
            <Button 
              onClick={() => {
                setGeneratedUrl('');
                setCurrentStep(1);
                setSiteData({
                  title: '',
                  partnerName1: '',
                  partnerName2: '',
                  relationshipDate: '',
                  message: '',
                  primaryColor: '#e91e63'
                });
              }}
              variant="ghost"
              className="w-full"
            >
              Criar Novo Site
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Love Counter
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Crie sua página de amor personalizada
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8">
          {/* Formulário */}
          <div className="space-y-6">
            {/* Progress bar */}
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-gray-600">
                  {currentStep}/{steps.length} - {steps[currentStep - 1].title}
                </span>
                <span className="text-sm text-gray-500">
                  {Math.round((currentStep / steps.length) * 100)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-pink-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(currentStep / steps.length) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Step content */}
            <Card className="backdrop-blur-sm bg-white/90 border-white/20 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {React.createElement(steps[currentStep - 1].icon, { className: "w-5 h-5 text-pink-600" })}
                  {steps[currentStep - 1].title}
                </CardTitle>
                <CardDescription>
                  {steps[currentStep - 1].description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {currentStep === 1 && (
                  <div className="space-y-2">
                    <Label htmlFor="title">Título da página</Label>
                    <Input
                      id="title"
                      value={siteData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      placeholder="Ex: João & Maria ou Feliz Aniversário ou etc"
                      className="text-lg"
                    />
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="partner1">Primeiro nome</Label>
                      <Input
                        id="partner1"
                        value={siteData.partnerName1}
                        onChange={(e) => handleInputChange('partnerName1', e.target.value)}
                        placeholder="Nome da primeira pessoa"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="partner2">Segundo nome</Label>
                      <Input
                        id="partner2"
                        value={siteData.partnerName2}
                        onChange={(e) => handleInputChange('partnerName2', e.target.value)}
                        placeholder="Nome da segunda pessoa"
                      />
                    </div>
                  </div>
                )}

                {currentStep === 3 && (
                  <div className="space-y-2">
                    <Label htmlFor="date">Data do início do relacionamento</Label>
                    <Input
                      id="date"
                      type="date"
                      value={siteData.relationshipDate}
                      onChange={(e) => handleInputChange('relationshipDate', e.target.value)}
                    />
                  </div>
                )}

                {currentStep === 4 && (
                  <div className="space-y-2">
                    <Label htmlFor="message">Mensagem especial</Label>
                    <Textarea
                      id="message"
                      value={siteData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      placeholder="Escreva uma mensagem romântica ou especial..."
                      rows={4}
                      className="resize-none"
                    />
                  </div>
                )}

                {currentStep === 5 && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="primaryColor">Cor principal</Label>
                      <div className="flex items-center gap-3">
                        <Input
                          id="primaryColor"
                          type="color"
                          value={siteData.primaryColor}
                          onChange={(e) => handleInputChange('primaryColor', e.target.value)}
                          className="w-16 h-12 p-1 rounded-lg"
                        />
                        <Input
                          value={siteData.primaryColor}
                          onChange={(e) => handleInputChange('primaryColor', e.target.value)}
                          placeholder="#e91e63"
                          className="flex-1"
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label>Cores românticas</Label>
                      <div className="grid grid-cols-4 gap-2">
                        {predefinedColors.map((color) => (
                          <button
                            key={color}
                            onClick={() => handleInputChange('primaryColor', color)}
                            className={`w-12 h-12 rounded-lg border-2 transition-all hover:scale-110 ${
                              siteData.primaryColor === color 
                                ? 'border-gray-800 ring-2 ring-gray-400' 
                                : 'border-gray-300'
                            }`}
                            style={{ backgroundColor: color }}
                            title={color}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex gap-3 pt-4">
                  {currentStep > 1 && (
                    <Button 
                      onClick={prevStep}
                      variant="outline"
                      className="flex-1"
                    >
                      Voltar
                    </Button>
                  )}
                  
                  {currentStep < steps.length ? (
                    <Button 
                      onClick={nextStep}
                      disabled={!isStepValid()}
                      className="flex-1 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700"
                    >
                      Próxima etapa
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  ) : (
                    <Button 
                      onClick={generateSite}
                      disabled={!isStepValid()}
                      className="flex-1 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700"
                    >
                      Gerar Site
                      <Heart className="w-4 h-4 ml-2" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Preview */}
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Visualização em tempo real</h2>
              <p className="text-gray-600">Veja como seu site ficará</p>
            </div>
            
            <LoveCounterPreview data={siteData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoveCounterGenerator;
