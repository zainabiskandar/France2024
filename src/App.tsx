import { useState, useEffect } from 'react';
import { ImageWithFallback } from './components/ui/ImageWithFallback';

interface ImageData {
  url: string;
  day: number;
}

export default function App() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedFilter, setSelectedFilter] = useState<string | number>('all');
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [poppedOutImage, setPoppedOutImage] = useState<number | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Collection of France 2024 images with day associations - 2-3 images per day
  const allImages: ImageData[] = [
    // Day 1
    { url: "https://images.unsplash.com/photo-1431274172761-fca41d930114?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxQYXJpcyUyMEVpZmZlbCUyMFRvd2VyfGVufDF8fHx8MTc2Mzg4NzMxNHww&ixlib=rb-4.1.0&q=80&w=1080", day: 1 },
    { url: "https://images.unsplash.com/photo-1668887465040-2e903c8abf01?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxGcmFuY2UlMjBhcmNoaXRlY3R1cmV8ZW58MXx8fHwxNzY0MDA3NzgwfDA&ixlib=rb-4.1.0&q=80&w=1080", day: 1 },
    { url: "https://images.unsplash.com/photo-1635666626028-5e319a2592b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxMb3V2cmUlMjBtdXNldW0lMjBQYXJpc3xlbnwxfHx8fDE3NjQwMDg1NTN8MA&ixlib=rb-4.1.0&q=80&w=1080", day: 1 },
    // Day 2
    { url: "https://images.unsplash.com/photo-1755618425737-0af08494618a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxGcmVuY2glMjBjYWZlJTIwY3VsdHVyZXxlbnwxfHx8fDE3NjQwMDc3ODB8MA&ixlib=rb-4.1.0&q=80&w=1080", day: 2 },
    { url: "https://images.unsplash.com/photo-1710635851336-82ede6083db9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxMeW9uJTIwRnJhbmNlfGVufDF8fHx8MTc2NDAwNzc4MXww&ixlib=rb-4.1.0&q=80&w=1080", day: 2 },
    { url: "https://images.unsplash.com/photo-1652900245928-eb5ee5d2ec29?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxQYXJpcyUyMGNhZmUlMjB0ZXJyYWNlfGVufDF8fHx8MTc2NDAwODU1N3ww&ixlib=rb-4.1.0&q=80&w=1080", day: 2 },
    // Day 3
    { url: "https://images.unsplash.com/photo-1729799635070-cd0c54160d9c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxGcmVuY2glMjBjb3VudHJ5c2lkZXxlbnwxfHx8fDE3NjQwMDc3ODF8MA&ixlib=rb-4.1.0&q=80&w=1080", day: 3 },
    { url: "https://images.unsplash.com/photo-1648923026616-15f1a8ab9842?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxNYXJzZWlsbGUlMjBoYXJib3J8ZW58MXx8fHwxNzYzOTEwNTE5fDA&ixlib=rb-4.1.0&q=80&w=1080", day: 3 },
    // Day 4
    { url: "https://images.unsplash.com/photo-1654921834734-c7002b177e35?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxGcmVuY2glMjBiaXN0cm98ZW58MXx8fHwxNzY0MDA3NzgyfDA&ixlib=rb-4.1.0&q=80&w=1080", day: 4 },
    { url: "https://images.unsplash.com/photo-1608855238293-a8853e7f7c98?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxGcmVuY2glMjBjdWlzaW5lJTIwZm9vZHxlbnwxfHx8fDE3NjQwMDg1NTN8MA&ixlib=rb-4.1.0&q=80&w=1080", day: 4 },
    { url: "https://images.unsplash.com/photo-1662486717731-293f2b6ebfa2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxQcm92ZW5jZSUyMGxhdmVuZGVyJTIwZmllbGRzfGVufDF8fHx8MTc2Mzk4NjExOXww&ixlib=rb-4.1.0&q=80&w=1080", day: 4 },
    // Day 5
    { url: "https://images.unsplash.com/photo-1695746513501-80eb1b74d9d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxOb3RyZSUyMERhbWUlMjBQYXJpc3xlbnwxfHx8fDE3NjQwMDc3ODJ8MA&ixlib=rb-4.1.0&q=80&w=1080", day: 5 },
    { url: "https://images.unsplash.com/photo-1682789217729-8a3a931953de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxGcmVuY2glMjB3aW5lJTIwdmluZXlhcmR8ZW58MXx8fHwxNzY0MDA3NzgzfDA&ixlib=rb-4.1.0&q=80&w=1080", day: 5 },
    // Day 6
    { url: "https://images.unsplash.com/photo-1603378995290-8d4ce0495ddd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBcmMlMjBkZSUyMFRyaW9tcGhlfGVufDF8fHx8MTc2NDAwNzc4M3ww&ixlib=rb-4.1.0&q=80&w=1080", day: 6 },
    { url: "https://images.unsplash.com/photo-1669428702956-09f2cef48958?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxOaWNlJTIwRnJhbmNlJTIwYmVhY2h8ZW58MXx8fHwxNzY0MDA4NTU0fDA&ixlib=rb-4.1.0&q=80&w=1080", day: 6 },
    { url: "https://images.unsplash.com/photo-1493564738392-d148cfbd6eda?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxCb3JkZWF1eCUyMEZyYW5jZXxlbnwxfHx8fDE3NjM5MTA1MTl8MA&ixlib=rb-4.1.0&q=80&w=1080", day: 6 },
    // Day 7
    { url: "https://images.unsplash.com/photo-1604200657090-ae45994b2451?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxGcmVuY2glMjBtYXJrZXR8ZW58MXx8fHwxNzY0MDA3NzgzfDA&ixlib=rb-4.1.0&q=80&w=1080", day: 7 },
    { url: "https://images.unsplash.com/photo-1719760767140-0e4610c624fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxTdHJhc2JvdXJnJTIwRnJhbmNlfGVufDF8fHx8MTc2NDAwODU1NXww&ixlib=rb-4.1.0&q=80&w=1080", day: 7 },
    // Day 8
    { url: "https://images.unsplash.com/photo-1591828353335-197466da2a4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxWZXJzYWlsbGVzJTIwcGFsYWNlfGVufDF8fHx8MTc2NDAwNzc4M3ww&ixlib=rb-4.1.0&q=80&w=1080", day: 8 },
    { url: "https://images.unsplash.com/photo-1737852157045-91851c82a976?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxGcmVuY2glMjBBbHBzJTIwbW91bnRhaW5zfGVufDF8fHx8MTc2NDAwNjI1MXww&ixlib=rb-4.1.0&q=80&w=1080", day: 8 },
    { url: "https://images.unsplash.com/photo-1685299102134-d054445b0215?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxOb3JtYW5keSUyMEZyYW5jZSUyMGNvYXN0fGVufDF8fHx8MTY0MDA4NTU1fDA&ixlib=rb-4.1.0&q=80&w=1080", day: 8 },
    // Day 9
    { url: "https://images.unsplash.com/photo-1638437591997-ec57dcbcd70f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxGcmFuY2UlMjBzdHJlZXQlMjBzY2VuZXxlbnwxfHx8fDE3NjQwMDc3ODR8MA&ixlib=rb-4.1.0&q=80&w=1080", day: 9 },
    { url: "https://images.unsplash.com/photo-1667049476093-f1ff5555789c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxMb2lyZSUyMFZhbGxleSUyMGNhc3RsZXxlbnwxfHx8fDE3NjQwMDYyNTF8MA&ixlib=rb-4.1.0&q=80&w=1080", day: 9 },
    // Day 10
    { url: "https://images.unsplash.com/photo-1703152792682-a1fe5f3dedb4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxGcmVuY2glMjBSaXZpZXJhfGVufDF8fHx8MTc2NDAwNzc4NHww&ixlib=rb-4.1.0&q=80&w=1080", day: 10 },
    { url: "https://images.unsplash.com/photo-1659642081573-ac1a040d2e50?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxDYW5uZXMlMjBGcmFuY2V8ZW58MXx8fHwxNzY0MDA4NTU2fDA&ixlib=rb-4.1.0&q=80&w=1080", day: 10 },
    // Day 11
    { url: "https://images.unsplash.com/photo-1671010496251-22eab06e3292?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxNb250JTIwU2FpbnQlMjBNaWNoZWx8ZW58MXx8fHwxNzY0MDA3Nzg0fDA&ixlib=rb-4.1.0&q=80&w=1080", day: 11 },
    { url: "https://images.unsplash.com/photo-1538138240005-e28c34c18f41?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxGcmVuY2glMjBjb3VudHJ5c2lkZSUyMHZpbGxhZ2V8ZW58MXx8fHwxNzY0MDA4NTU3fDA&ixlib=rb-4.1.0&q=80&w=1080", day: 11 },
    // Day 12
    { url: "https://images.unsplash.com/photo-1431274172761-fca41d930114?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxQYXJpcyUyMEVpZmZlbCUyMFRvd2VyfGVufDF8fHx8MTc2Mzg4NzMxNHww&ixlib=rb-4.1.0&q=80&w=1080", day: 12 },
    { url: "https://images.unsplash.com/photo-1603378995290-8d4ce0495ddd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBcmMlMjBkZSUyMFRyaW9tcGhlfGVufDF8fHx8MTc2NDAwNzc4M3ww&ixlib=rb-4.1.0&q=80&w=1080", day: 12 },
  ];

  // Filter images based on selected day
  const filteredImages = selectedFilter === 'all' 
    ? allImages 
    : allImages.filter(img => img.day === selectedFilter);

  // Get current hero image (either hovered or current index)
  const heroImage = filteredImages[currentImageIndex] || filteredImages[0];

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        setCurrentImageIndex((prev) => 
          prev > 0 ? prev - 1 : filteredImages.length - 1
        );
      } else if (e.key === 'ArrowRight') {
        setCurrentImageIndex((prev) => 
          prev < filteredImages.length - 1 ? prev + 1 : 0
        );
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [filteredImages.length]);

  // Reset image index when filter changes
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [selectedFilter]);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit',
      hour12: false 
    });
  };

  // Calculate image counts per day
  const getImageCountForDay = (day: number) => {
    return allImages.filter(img => img.day === day).length;
  };

  const filters = [
    { id: 'all', label: 'all', count: allImages.length },
    { id: 1, label: 'Day 1', count: getImageCountForDay(1) },
    { id: 2, label: 'Day 2', count: getImageCountForDay(2) },
    { id: 3, label: 'Day 3', count: getImageCountForDay(3) },
    { id: 4, label: 'Day 4', count: getImageCountForDay(4) },
    { id: 5, label: 'Day 5', count: getImageCountForDay(5) },
    { id: 6, label: 'Day 6', count: getImageCountForDay(6) },
    { id: 7, label: 'Day 7', count: getImageCountForDay(7) },
    { id: 8, label: 'Day 8', count: getImageCountForDay(8) },
    { id: 9, label: 'Day 9', count: getImageCountForDay(9) },
    { id: 10, label: 'Day 10', count: getImageCountForDay(10) },
    { id: 11, label: 'Day 11', count: getImageCountForDay(11) },
    { id: 12, label: 'Day 12', count: getImageCountForDay(12) },
  ];

  const handleImageClick = (imageData: ImageData, index: number) => {
    if (poppedOutImage === index) {
      setPoppedOutImage(null);
    } else {
      setPoppedOutImage(index);
      setCurrentImageIndex(index);
    }
  };

  const handleImageHover = (index: number) => {
    setHoveredImage(`stack-${index}`);
    setCurrentImageIndex(index);
  };

  return (
    <div className="relative min-h-screen bg-soft-white overflow-hidden">
      {/* Timestamp - Top Left */}
      <div className="absolute top-8 left-8 z-10">
        <div className="opacity-90">
          <div>{formatDate(currentTime)}</div>
          <div>{formatTime(currentTime)}</div>
        </div>
      </div>

      {/* Title - Top Center */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-10">
        <h1 className="opacity-90">France 2024</h1>
      </div>

      {/* Keyword Filters - Right Side */}
      <div className="absolute top-8 right-8 z-10 max-md:top-4 max-md:right-4">
        <div className="flex flex-col items-end gap-1 max-md:gap-0.5">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setSelectedFilter(filter.id)}
              className={`
                transition-opacity hover:opacity-100 text-sm max-md:text-xs
                ${selectedFilter === filter.id ? 'opacity-100' : 'opacity-30'}
              `}
            >
              {filter.label}
              {filter.count > 0 && (
                <span className="ml-2 opacity-50 max-md:ml-1">
                  - {filter.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative w-full h-screen flex items-center justify-center max-md:block max-md:overflow-y-auto max-md:pt-24">
        {/* Diagonal Stack */}
        <div className="diagonal-stack-container">
          {filteredImages.map((imageData, index) => {
            const isHovered = hoveredImage === `stack-${index}`;
            const isCurrent = currentImageIndex === index;
            const isPoppedOut = poppedOutImage === index;

            return (
              <button
                key={index}
                className={`stack-card stack-card-${index} ${isHovered && !isPoppedOut ? 'hovered' : ''} ${isCurrent ? 'current' : ''} ${isPoppedOut ? 'popped-out' : ''}`}
                onClick={() => handleImageClick(imageData, index)}
                onMouseEnter={() => !isPoppedOut && handleImageHover(index)}
                onMouseLeave={() => setHoveredImage(null)}
                onTouchStart={() => handleImageHover(index)}
              >
                <ImageWithFallback
                  src={imageData.url}
                  alt={`France 2024 - Image ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            );
          })}
        </div>
      </div>

      <style>{`
        .diagonal-stack-container {
          position: relative;
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
          perspective: 1500px;
          overflow: hidden;
        }

        .stack-card {
          position: absolute;
          width: 280px;
          height: 200px;
          background: white;
          border-radius: 3px;
          box-shadow:
            0 2px 8px rgba(0, 0, 0, 0.08),
            0 4px 16px rgba(0, 0, 0, 0.06);
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
          border: none;
          padding: 0;
          transform-style: preserve-3d;
          will-change: transform;
        }

        .diagonal-stack-container .stack-card {
          top: 50%;
          left: 50%;
          transform-origin: center;
        }

        .diagonal-stack-container .stack-card:nth-child(1) { transform: translate(calc(-50% + 330px), calc(-50% - 220px)) translateZ(0px) rotateX(5deg) rotateY(8deg) rotateZ(-2deg); }
        .diagonal-stack-container .stack-card:nth-child(2) { transform: translate(calc(-50% + 275px), calc(-50% - 183px)) translateZ(5px) rotateX(5deg) rotateY(8deg) rotateZ(-2deg); }
        .diagonal-stack-container .stack-card:nth-child(3) { transform: translate(calc(-50% + 220px), calc(-50% - 146px)) translateZ(10px) rotateX(5deg) rotateY(8deg) rotateZ(-2deg); }
        .diagonal-stack-container .stack-card:nth-child(4) { transform: translate(calc(-50% + 165px), calc(-50% - 110px)) translateZ(15px) rotateX(5deg) rotateY(8deg) rotateZ(-2deg); }
        .diagonal-stack-container .stack-card:nth-child(5) { transform: translate(calc(-50% + 110px), calc(-50% - 73px)) translateZ(20px) rotateX(5deg) rotateY(8deg) rotateZ(-2deg); }
        .diagonal-stack-container .stack-card:nth-child(6) { transform: translate(calc(-50% + 55px), calc(-50% - 36px)) translateZ(25px) rotateX(5deg) rotateY(8deg) rotateZ(-2deg); }
        .diagonal-stack-container .stack-card:nth-child(7) { transform: translate(calc(-50% + 0px), calc(-50% + 0px)) translateZ(30px) rotateX(5deg) rotateY(8deg) rotateZ(-2deg); }
        .diagonal-stack-container .stack-card:nth-child(8) { transform: translate(calc(-50% - 55px), calc(-50% + 36px)) translateZ(35px) rotateX(5deg) rotateY(8deg) rotateZ(-2deg); }
        .diagonal-stack-container .stack-card:nth-child(9) { transform: translate(calc(-50% - 110px), calc(-50% + 73px)) translateZ(40px) rotateX(5deg) rotateY(8deg) rotateZ(-2deg); }
        .diagonal-stack-container .stack-card:nth-child(10) { transform: translate(calc(-50% - 165px), calc(-50% + 110px)) translateZ(45px) rotateX(5deg) rotateY(8deg) rotateZ(-2deg); }
        .diagonal-stack-container .stack-card:nth-child(11) { transform: translate(calc(-50% - 220px), calc(-50% + 146px)) translateZ(50px) rotateX(5deg) rotateY(8deg) rotateZ(-2deg); }

        .diagonal-stack-container .stack-card:nth-child(n+12) {
          display: none;
        }

        .stack-card.hovered {
          box-shadow:
            0 8px 24px rgba(0, 0, 0, 0.15),
            0 16px 48px rgba(0, 0, 0, 0.12);
          z-index: 9999 !important;
          transform: scale(1.15) !important;
        }

        .stack-card.current {
          opacity: 1;
        }

        .stack-card.popped-out {
          z-index: 10000 !important;
          transform: translate(-50%, -50%) translateZ(200px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale(1.6) !important;
          box-shadow:
            0 20px 60px rgba(0, 0, 0, 0.25),
            0 30px 90px rgba(0, 0, 0, 0.2),
            0 0 0 2px rgba(255, 255, 255, 0.8);
          animation: popOutPulse 2s ease-in-out infinite;
        }

        @keyframes popOutPulse {
          0%, 100% {
            box-shadow:
              0 20px 60px rgba(0, 0, 0, 0.25),
              0 30px 90px rgba(0, 0, 0, 0.2),
              0 0 0 2px rgba(255, 255, 255, 0.8);
          }
          50% {
            box-shadow:
              0 22px 65px rgba(0, 0, 0, 0.28),
              0 32px 95px rgba(0, 0, 0, 0.22),
              0 0 0 3px rgba(255, 255, 255, 0.9);
          }
        }

        @media (hover: hover) {
          .stack-card:hover:not(.popped-out) {
            box-shadow:
              0 8px 24px rgba(0, 0, 0, 0.15),
              0 16px 48px rgba(0, 0, 0, 0.12);
            z-index: 9999 !important;
            transform: scale(1.15) !important;
          }
        }

        @media (max-width: 1400px) {
          .diagonal-stack-container .stack-card:nth-child(1) { transform: translate(calc(-50% + 280px), calc(-50% - 186px)) translateZ(0px) rotateX(5deg) rotateY(8deg) rotateZ(-2deg); }
          .diagonal-stack-container .stack-card:nth-child(2) { transform: translate(calc(-50% + 233px), calc(-50% - 155px)) translateZ(5px) rotateX(5deg) rotateY(8deg) rotateZ(-2deg); }
          .diagonal-stack-container .stack-card:nth-child(3) { transform: translate(calc(-50% + 186px), calc(-50% - 124px)) translateZ(10px) rotateX(5deg) rotateY(8deg) rotateZ(-2deg); }
          .diagonal-stack-container .stack-card:nth-child(4) { transform: translate(calc(-50% + 140px), calc(-50% - 93px)) translateZ(15px) rotateX(5deg) rotateY(8deg) rotateZ(-2deg); }
          .diagonal-stack-container .stack-card:nth-child(5) { transform: translate(calc(-50% + 93px), calc(-50% - 62px)) translateZ(20px) rotateX(5deg) rotateY(8deg) rotateZ(-2deg); }
          .diagonal-stack-container .stack-card:nth-child(6) { transform: translate(calc(-50% + 46px), calc(-50% - 31px)) translateZ(25px) rotateX(5deg) rotateY(8deg) rotateZ(-2deg); }
          .diagonal-stack-container .stack-card:nth-child(7) { transform: translate(calc(-50% + 0px), calc(-50% + 0px)) translateZ(30px) rotateX(5deg) rotateY(8deg) rotateZ(-2deg); }
          .diagonal-stack-container .stack-card:nth-child(8) { transform: translate(calc(-50% - 46px), calc(-50% + 31px)) translateZ(35px) rotateX(5deg) rotateY(8deg) rotateZ(-2deg); }
          .diagonal-stack-container .stack-card:nth-child(9) { transform: translate(calc(-50% - 93px), calc(-50% + 62px)) translateZ(40px) rotateX(5deg) rotateY(8deg) rotateZ(-2deg); }
          .diagonal-stack-container .stack-card:nth-child(10) { transform: translate(calc(-50% - 140px), calc(-50% + 93px)) translateZ(45px) rotateX(5deg) rotateY(8deg) rotateZ(-2deg); }
          .diagonal-stack-container .stack-card:nth-child(11) { transform: translate(calc(-50% - 186px), calc(-50% + 124px)) translateZ(50px) rotateX(5deg) rotateY(8deg) rotateZ(-2deg); }
        }

        @media (max-width: 1024px) {
          .stack-card {
            width: 220px;
            height: 160px;
          }

          .diagonal-stack-container .stack-card:nth-child(1) { transform: translate(calc(-50% + 220px), calc(-50% - 146px)) translateZ(0px) rotateX(5deg) rotateY(8deg) rotateZ(-2deg); }
          .diagonal-stack-container .stack-card:nth-child(2) { transform: translate(calc(-50% + 183px), calc(-50% - 122px)) translateZ(5px) rotateX(5deg) rotateY(8deg) rotateZ(-2deg); }
          .diagonal-stack-container .stack-card:nth-child(3) { transform: translate(calc(-50% + 146px), calc(-50% - 97px)) translateZ(10px) rotateX(5deg) rotateY(8deg) rotateZ(-2deg); }
          .diagonal-stack-container .stack-card:nth-child(4) { transform: translate(calc(-50% + 110px), calc(-50% - 73px)) translateZ(15px) rotateX(5deg) rotateY(8deg) rotateZ(-2deg); }
          .diagonal-stack-container .stack-card:nth-child(5) { transform: translate(calc(-50% + 73px), calc(-50% - 48px)) translateZ(20px) rotateX(5deg) rotateY(8deg) rotateZ(-2deg); }
          .diagonal-stack-container .stack-card:nth-child(6) { transform: translate(calc(-50% + 36px), calc(-50% - 24px)) translateZ(25px) rotateX(5deg) rotateY(8deg) rotateZ(-2deg); }
          .diagonal-stack-container .stack-card:nth-child(7) { transform: translate(calc(-50% + 0px), calc(-50% + 0px)) translateZ(30px) rotateX(5deg) rotateY(8deg) rotateZ(-2deg); }
          .diagonal-stack-container .stack-card:nth-child(8) { transform: translate(calc(-50% - 36px), calc(-50% + 24px)) translateZ(35px) rotateX(5deg) rotateY(8deg) rotateZ(-2deg); }
          .diagonal-stack-container .stack-card:nth-child(9) { transform: translate(calc(-50% - 73px), calc(-50% + 48px)) translateZ(40px) rotateX(5deg) rotateY(8deg) rotateZ(-2deg); }
          .diagonal-stack-container .stack-card:nth-child(10) { transform: translate(calc(-50% - 110px), calc(-50% + 73px)) translateZ(45px) rotateX(5deg) rotateY(8deg) rotateZ(-2deg); }
          .diagonal-stack-container .stack-card:nth-child(11) { transform: translate(calc(-50% - 146px), calc(-50% + 97px)) translateZ(50px) rotateX(5deg) rotateY(8deg) rotateZ(-2deg); }

          .stack-card.popped-out {
            transform: translate(-50%, -50%) translateZ(200px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale(1.4) !important;
          }
        }

        @media (max-width: 768px) {
          .hero-container {
            position: relative;
            top: auto;
            left: auto;
            transform: none;
            margin: 0 auto 2rem;
            width: 90%;
          }

          .hero-image {
            width: 100%;
            height: 280px;
            animation: none;
          }

          .diagonal-stack-container {
            position: relative;
            perspective: none;
            display: flex;
            flex-direction: column;
            gap: 1rem;
            padding: 0 1rem 2rem;
          }

          .stack-card {
            position: relative !important;
            width: 100% !important;
            height: 220px !important;
            transform: none !important;
            top: auto !important;
            left: auto !important;
          }

          .stack-card.hovered {
            transform: scale(1.02) !important;
          }
        }
      `}</style>
    </div>
  );
}