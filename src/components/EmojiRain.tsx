import React, { useEffect, useState } from 'react';

interface EmojiRainProps {
  isActive: boolean;
  emojis?: string[];
  intensity?: number;
}

interface Emoji {
  id: number;
  emoji: string;
  x: number;
  y: number;
  speed: number;
  rotation: number;
  rotationSpeed: number;
}

const EmojiRain: React.FC<EmojiRainProps> = ({ 
  isActive, 
  emojis = ['❤️', '💕', '💖', '💗', '💘', '💝', '💞', '💟', '🌹', '💐'], 
  intensity = 3 
}) => {
  const [emojiList, setEmojiList] = useState<Emoji[]>([]);

  useEffect(() => {
    if (!isActive) {
      setEmojiList([]);
      return;
    }

    const createEmoji = (): Emoji => ({
      id: Math.random(),
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
      x: Math.random() * window.innerWidth,
      y: -50,
      speed: Math.random() * 3 + 2,
      rotation: 0,
      rotationSpeed: (Math.random() - 0.5) * 10,
    });

    const interval = setInterval(() => {
      setEmojiList(prev => {
        const newEmojis = [...prev];
        
        // Add new emojis
        for (let i = 0; i < intensity; i++) {
          if (Math.random() < 0.3) {
            newEmojis.push(createEmoji());
          }
        }

        // Update positions and remove off-screen emojis
        return newEmojis
          .map(emoji => ({
            ...emoji,
            y: emoji.y + emoji.speed,
            rotation: emoji.rotation + emoji.rotationSpeed,
          }))
          .filter(emoji => emoji.y < window.innerHeight + 50)
          .slice(-50); // Limit total emojis
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isActive, emojis, intensity]);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {emojiList.map(emoji => (
        <div
          key={emoji.id}
          className="absolute text-2xl select-none"
          style={{
            left: `${emoji.x}px`,
            top: `${emoji.y}px`,
            transform: `rotate(${emoji.rotation}deg)`,
            animation: 'float 3s ease-in-out infinite',
          }}
        >
          {emoji.emoji}
        </div>
      ))}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(180deg); }
        }
      `}</style>
    </div>
  );
};

export default EmojiRain;