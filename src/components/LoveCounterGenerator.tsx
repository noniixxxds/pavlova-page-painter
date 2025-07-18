import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, ArrowRight, Link2, Calendar, MessageSquare, Palette, Image, Music, Download, QrCode, Camera, Upload } from 'lucide-react';
import { SiteData } from '@/utils/siteGenerator';
import LoveCounterPreview from './LoveCounterPreview';
import { toast } from 'sonner';
import { saveMiniSite } from '@/utils/miniSiteService';
import QRCode from 'qrcode';

const LoveCounterGenerator = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [generatedUrl, setGeneratedUrl] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>('');
  const [uploadingPhotos, setUploadingPhotos] = useState(false);
  const [siteData, setSiteData] = useState<SiteData>({
    title: '',
    partnerName1: '',
    partnerName2: '',
    relationshipDate: '',
    message: '',
    primaryColor: '#e91e63',
    photos: [],
    youtubeUrl: ''
  });

  const steps = [
    { number: 1, title: 'Título', icon: Heart, description: 'Nome da sua página de amor' },
    { number: 2, title: 'Casal', icon: Heart, description: 'Nomes do casal' },
    { number: 3, title: 'Data', icon: Calendar, description: 'Data do início do relacionamento' },
    { number: 4, title: 'Fotos', icon: Image, description: 'Adicione até 3 fotos' },
    { number: 5, title: 'Música', icon: Music, description: 'Link do YouTube' },
    { number: 6, title: 'Mensagem', icon: MessageSquare, description: 'Mensagem especial' },
    { number: 7, title: 'Cor', icon: Palette, description: 'Cor principal do site' }
  ];

  const handleInputChange = (field: keyof SiteData, value: string) => {
    setSiteData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const handlePhotoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setUploadingPhotos(true);
      try {
        const fileArray = Array.from(files).slice(0, 3 - siteData.photos.length);
        const base64Photos: string[] = [];
        
        for (const file of fileArray) {
          // Verificar se é uma imagem
          if (!file.type.startsWith('image/')) {
            toast.error('Por favor, selecione apenas arquivos de imagem');
            continue;
          }
          
          // Verificar tamanho do arquivo (máximo 5MB)
          if (file.size > 5 * 1024 * 1024) {
            toast.error('Imagem muito grande. Máximo 5MB por foto');
            continue;
          }
          
          const base64 = await convertToBase64(file);
          base64Photos.push(base64);
        }
        
        setSiteData(prev => ({
          ...prev,
          photos: [...prev.photos, ...base64Photos].slice(0, 3)
        }));
        
        if (base64Photos.length > 0) {
          toast.success(`${base64Photos.length} foto(s) adicionada(s) com sucesso!`);
        }
      } catch (error) {
        console.error('Erro ao processar fotos:', error);
        toast.error('Erro ao processar as fotos. Tente novamente.');
      } finally {
        setUploadingPhotos(false);
      }
    }
  };

  // Função para detectar se está em um webview restritivo
  const isRestrictiveWebView = () => {
    const userAgent = navigator.userAgent.toLowerCase();
    return userAgent.includes('tiktok') || 
           userAgent.includes('instagram') || 
           userAgent.includes('facebook') ||
           userAgent.includes('twitter') ||
           userAgent.includes('linkedin');
  };

  // Função para abrir no navegador externo
  const openInExternalBrowser = () => {
    const currentUrl = window.location.href;
    
    // Tentar diferentes métodos para abrir no navegador externo
    if (navigator.userAgent.includes('iPhone') || navigator.userAgent.includes('iPad')) {
      // iOS
      window.location.href = `googlechrome://${currentUrl.replace('https://', '')}`;
      setTimeout(() => {
        window.location.href = `safari-${currentUrl}`;
      }, 500);
    } else {
      // Android
      window.location.href = `intent://${currentUrl.replace('https://', '')}#Intent;scheme=https;package=com.android.chrome;end`;
    }
  };

  const removePhoto = (index: number) => {
    setSiteData(prev => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index)
    }));
    toast.success('Foto removida com sucesso!');
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

  const generateQRCode = async (url: string) => {
    try {
      const qrDataUrl = await QRCode.toDataURL(url, {
        width: 256,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      });
      setQrCodeDataUrl(qrDataUrl);
    } catch (error) {
      console.error('Erro ao gerar QR Code:', error);
    }
  };

  const downloadQRCode = () => {
    if (qrCodeDataUrl) {
      const link = document.createElement('a');
      link.download = `qr-code-${siteData.title.replace(/\s+/g, '-').toLowerCase()}.png`;
      link.href = qrCodeDataUrl;
      link.click();
    }
  };

  const generateSite = async () => {
    setIsGenerating(true);
    try {
      const siteUrl = await saveMiniSite(siteData);
      const fullUrl = `${window.location.origin}/${siteUrl}`;
      setGeneratedUrl(fullUrl);
      
      // Gerar QR Code
      await generateQRCode(fullUrl);
      
      console.log('Site criado com URL:', siteUrl);
      console.log('URL completa:', fullUrl);
      
      toast.success('Site gerado com sucesso!', {
        description: 'Seu site de amor está pronto para ser compartilhado.'
      });
    } catch (error) {
      console.error('Erro ao gerar site:', error);
      toast.error('Erro ao gerar o site', {
        description: 'Tente novamente ou verifique os dados inseridos.'
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const predefinedColors = [
    '#e91e63', '#f06292', '#ad1457', '#880e4f',
    '#ff5722', '#ff9800', '#9c27b0', '#673ab7',
  ];

  const isStepValid = () => {
    switch (currentStep) {
      case 1: return siteData.title.trim() !== '';
      case 2: return siteData.partnerName1.trim() !== '' && siteData.partnerName2.trim() !== '';
      case 3: return siteData.relationshipDate !== '';
      case 4: return true; // Fotos são opcionais
      case 5: return true; // Música é opcional
      case 6: return siteData.message.trim() !== '';
      case 7: return siteData.primaryColor !== '';
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
              <div className="flex items-center justify-center gap-2 text-lg font-mono break-all">
                <Link2 className="w-5 h-5 flex-shrink-0" />
                {generatedUrl}
              </div>
            </div>
            
            {qrCodeDataUrl && (
              <div className="flex flex-col items-center space-y-4">
                <div className="bg-white p-4 rounded-lg border shadow-sm">
                  <img src={qrCodeDataUrl} alt="QR Code" className="w-48 h-48" />
                </div>
                <p className="text-sm text-gray-600">
                  Escaneie o QR Code para acessar o site
                </p>
              </div>
            )}
            
            <div className="flex flex-wrap gap-4 justify-center">
              <Button 
                onClick={() => navigator.clipboard.writeText(generatedUrl)}
                variant="outline"
                className="flex items-center gap-2"
              >
                <Link2 className="w-4 h-4" />
                Copiar Link
              </Button>
              <Button 
                onClick={() => window.open(generatedUrl, '_blank')}
                className="bg-pink-600 hover:bg-pink-700 flex items-center gap-2"
              >
                <Heart className="w-4 h-4" />
                Abrir Site
              </Button>
              {qrCodeDataUrl && (
                <Button 
                  onClick={downloadQRCode}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Baixar QR Code
                </Button>
              )}
            </div>
            
            <Button 
              onClick={() => {
                setGeneratedUrl('');
                setQrCodeDataUrl('');
                setCurrentStep(1);
                setSiteData({
                  title: '',
                  partnerName1: '',
                  partnerName2: '',
                  relationshipDate: '',
                  message: '',
                  primaryColor: '#e91e63',
                  photos: [],
                  youtubeUrl: ''
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
                      placeholder="Ex: João & Maria"
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
                  <div className="space-y-4">
                    <Label>Adicionar fotos (até 3)</Label>
                    
                    {/* Aviso para webviews restritivos */}
                   
                    {isRestrictiveWebView() && (
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                          <div className="text-yellow-600">⚠️</div>
                          <div className="text-sm">
                            <p className="font-medium text-yellow-800 mb-2">
                              Problema para adicionar fotos?
                            </p>
                            <p className="text-yellow-700 mb-3">
                              Alguns aplicativos (como TikTok) limitam o acesso à galeria. 
                              Para adicionar fotos, abra este site no seu navegador.
                            </p>
                            <Button 
                              onClick={openInExternalBrowser}
                              size="sm"
                              variant="outline"
                              className="text-yellow-700 border-yellow-300 hover:bg-yellow-100"
                            >
                              <Upload className="w-4 h-4 mr-2" />
                              Abrir no Navegador
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="space-y-4">
                      {siteData.photos.length < 3 && (
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                          <Input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handlePhotoUpload}
                            className="hidden"
                            id="photo-upload"
                            disabled={uploadingPhotos}
                        
                          />
                          <Label htmlFor="photo-upload" className="cursor-pointer">
                            <div className="flex flex-col items-center gap-3">
                              <div className="flex gap-2">
                                <Image className="w-8 h-8 text-gray-400" />
                                <Camera className="w-8 h-8 text-gray-400" />
                              </div>
                              <div>
                                <p className="text-gray-600 font-medium">
                                  {uploadingPhotos ? 'Processando fotos...' : 'Adicionar fotos'}
                                </p>
                                <p className="text-sm text-gray-400 mt-1">
                                  Toque para escolher da galeria ou tirar foto
                                </p>
                                <p className="text-xs text-gray-400 mt-1">
                                  Formato stories (9:16) - Máximo 5MB por foto
                                </p>
                              </div>
                            </div>
                          </Label>
                        </div>
                      )}
                      
                      {siteData.photos.length > 0 && (
                        <div className="grid grid-cols-3 gap-2">
                          {siteData.photos.map((photo, index) => (
                            <div key={index} className="relative aspect-[9/16] bg-gray-100 rounded-lg overflow-hidden">
                              <img 
                                src={photo} 
                                alt={`Foto ${index + 1}`}
                                className="w-full h-full object-cover"
                              />
                              <Button
                                onClick={() => removePhoto(index)}
                                className="absolute top-1 right-1 w-6 h-6 p-0 bg-red-500 hover:bg-red-600"
                                size="sm"
                              >
                                ×
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {currentStep === 5 && (
                  <div className="space-y-2">
                    <Label htmlFor="youtube">Link do YouTube (opcional)</Label>
                    <Input
                      id="youtube"
                      value={siteData.youtubeUrl}
                      onChange={(e) => handleInputChange('youtubeUrl', e.target.value)}
                      placeholder="https://www.youtube.com/watch?v=..."
                    />
                    <p className="text-sm text-gray-500">
                      Cole o link de uma música especial do YouTube
                    </p>
                  </div>
                )}

                {currentStep === 6 && (
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

                {currentStep === 7 && (
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
                      disabled={isGenerating || uploadingPhotos}
                    >
                      Voltar
                    </Button>
                  )}
                  
                  {currentStep < steps.length ? (
                    <Button 
                      onClick={nextStep}
                      disabled={!isStepValid() || isGenerating || uploadingPhotos}
                      className="flex-1 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700"
                    >
                      Próxima etapa
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  ) : (
                    <Button 
                      onClick={generateSite}
                      disabled={!isStepValid() || isGenerating || uploadingPhotos}
                      className="flex-1 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700"
                    >
                      {isGenerating ? 'Gerando...' : 'Gerar Site'}
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