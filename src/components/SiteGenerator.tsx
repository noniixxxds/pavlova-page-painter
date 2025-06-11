
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Download, Eye, Palette, Type, FileText } from 'lucide-react';
import { SiteData, generateSiteUrl } from '@/utils/siteGenerator';
import SitePreview from './SitePreview';
import { toast } from 'sonner';

const SiteGenerator = () => {
  const [siteData, setSiteData] = useState<SiteData>({
    title: 'Meu Site Incrível',
    partnerName1: 'Partner 1',
    partnerName2: 'Partner 2',
    relationshipDate: '2024-01-01',
    message: 'Este é um exemplo de mensagem que pode conter informações sobre seu relacionamento ou qualquer conteúdo que você deseje compartilhar.',
    primaryColor: '#6366f1',
    photos: [],
    youtubeUrl: ''
  });

  const [activeTab, setActiveTab] = useState('form');

  const handleInputChange = (field: keyof SiteData, value: string) => {
    setSiteData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleGenerateSite = () => {
    try {
      const url = generateSiteUrl(siteData);
      toast.success('Site gerado com sucesso!', {
        description: `Seu site está disponível em: ${url}`
      });
    } catch (error) {
      toast.error('Erro ao gerar o site', {
        description: 'Tente novamente ou verifique os dados inseridos.'
      });
    }
  };

  const predefinedColors = [
    '#6366f1', // Indigo
    '#8b5cf6', // Purple
    '#06b6d4', // Cyan
    '#10b981', // Emerald
    '#f59e0b', // Amber
    '#ef4444', // Red
    '#ec4899', // Pink
    '#14b8a6', // Teal
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Gerador de Sites
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Crie sites estáticos profissionais em segundos. Personalize, visualize e baixe seus arquivos instantaneamente.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="max-w-6xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="form" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Configuração
            </TabsTrigger>
            <TabsTrigger value="preview" className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              Preview
            </TabsTrigger>
          </TabsList>

          <TabsContent value="form" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="backdrop-blur-sm bg-white/80 border-white/20 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Type className="w-5 h-5" />
                    Conteúdo do Site
                  </CardTitle>
                  <CardDescription>
                    Defina o conteúdo principal do seu site
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Título Principal</Label>
                    <Input
                      id="title"
                      value={siteData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      placeholder="Ex: João & Maria"
                      className="text-lg"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="partnerName1">Primeiro Nome</Label>
                    <Input
                      id="partnerName1"
                      value={siteData.partnerName1}
                      onChange={(e) => handleInputChange('partnerName1', e.target.value)}
                      placeholder="Ex: João"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="partnerName2">Segundo Nome</Label>
                    <Input
                      id="partnerName2"
                      value={siteData.partnerName2}
                      onChange={(e) => handleInputChange('partnerName2', e.target.value)}
                      placeholder="Ex: Maria"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Mensagem Especial</Label>
                    <Textarea
                      id="message"
                      value={siteData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      placeholder="Escreva uma mensagem romântica..."
                      rows={4}
                      className="resize-none"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="backdrop-blur-sm bg-white/80 border-white/20 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Palette className="w-5 h-5" />
                    Personalização Visual
                  </CardTitle>
                  <CardDescription>
                    Escolha a cor principal do seu site
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="primaryColor">Cor Principal</Label>
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
                        placeholder="#6366f1"
                        className="flex-1"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label>Cores Predefinidas</Label>
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

                  <div className="pt-4">
                    <Button 
                      onClick={handleGenerateSite}
                      className="w-full text-lg py-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg"
                    >
                      <Download className="w-5 h-5 mr-2" />
                      Gerar e Baixar Site
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="preview" className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Preview do Seu Site</h2>
              <p className="text-gray-600">Veja como seu site ficará antes de gerar os arquivos</p>
            </div>
            
            <SitePreview data={siteData} />
            
            <div className="text-center pt-6">
              <Button 
                onClick={handleGenerateSite}
                className="text-lg px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg"
              >
                <Download className="w-5 h-5 mr-2" />
                Gerar e Baixar Site
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SiteGenerator;
