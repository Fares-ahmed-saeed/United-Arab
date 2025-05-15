
import React, { useState, useRef, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Camera, Upload, X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from '@/components/ui/use-toast';

interface ARViewerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  productImage: string;
  productName: string;
}

const ARViewer = ({ open, onOpenChange, productImage, productName }: ARViewerProps) => {
  const { t, language } = useLanguage();
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  const [productPosition, setProductPosition] = useState({ x: 50, y: 50 });
  const [productSize, setProductSize] = useState(30);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Translations
  const translations = {
    title: {
      en: "Augmented Reality Viewer",
      ar: "عارض الواقع المعزز"
    },
    description: {
      en: "See how this air conditioner would look on your wall",
      ar: "شاهد كيف سيبدو هذا المكيف على حائط منزلك"
    },
    uploadPhoto: {
      en: "Upload a photo of your room",
      ar: "قم بتحميل صورة لغرفتك"
    },
    takePicture: {
      en: "Take a picture",
      ar: "التقط صورة"
    },
    resetPosition: {
      en: "Reset Position",
      ar: "إعادة ضبط الموضع"
    },
    sizeUp: {
      en: "Size +",
      ar: "حجم +"
    },
    sizeDown: {
      en: "Size -",
      ar: "حجم -"
    },
    dragMessage: {
      en: "Drag the AC to position it on your wall",
      ar: "اسحب المكيف لوضعه على الحائط"
    },
    noSupport: {
      en: "Your browser doesn't support camera access",
      ar: "متصفحك لا يدعم الوصول إلى الكاميرا"
    },
    photoUploaded: {
      en: "Photo uploaded successfully!",
      ar: "تم تحميل الصورة بنجاح!"
    }
  };

  // Handle file upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setBackgroundImage(e.target.result as string);
          toast({
            title: language === 'ar' ? translations.photoUploaded.ar : translations.photoUploaded.en,
            duration: 2000
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle camera capture
  const handleCameraCapture = async () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      toast({
        title: language === 'ar' ? translations.noSupport.ar : translations.noSupport.en,
        variant: "destructive",
        duration: 2000
      });
      return;
    }

    try {
      // Create a temporary video and canvas element
      const video = document.createElement('video');
      const canvas = document.createElement('canvas');
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      
      video.srcObject = stream;
      video.play();

      // Wait for the video to start playing
      setTimeout(() => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        
        // Draw the current video frame to the canvas
        canvas.getContext('2d')?.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        // Convert the canvas to a data URL
        const dataUrl = canvas.toDataURL('image/png');
        setBackgroundImage(dataUrl);
        
        // Stop the video stream
        stream.getTracks().forEach(track => track.stop());
        
        toast({
          title: language === 'ar' ? translations.photoUploaded.ar : translations.photoUploaded.en,
          duration: 2000
        });
      }, 500);
    } catch (error) {
      console.error("Error accessing camera:", error);
      toast({
        title: language === 'ar' ? "حدث خطأ أثناء الوصول إلى الكاميرا" : "Error accessing camera",
        variant: "destructive",
        duration: 2000
      });
    }
  };

  // Handle drag start
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
  };

  // Handle drag move
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setProductPosition({ 
        x: Math.min(Math.max(x, 0), 100), 
        y: Math.min(Math.max(y, 0), 100) 
      });
    }
  };

  // Handle drag end
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Handle touch events for mobile devices
  const handleTouchStart = () => {
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging && containerRef.current) {
      const touch = e.touches[0];
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((touch.clientX - rect.left) / rect.width) * 100;
      const y = ((touch.clientY - rect.top) / rect.height) * 100;
      setProductPosition({ 
        x: Math.min(Math.max(x, 0), 100), 
        y: Math.min(Math.max(y, 0), 100) 
      });
      e.preventDefault();
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Handle size adjustments
  const increaseSize = () => {
    setProductSize(prev => Math.min(prev + 5, 70));
  };

  const decreaseSize = () => {
    setProductSize(prev => Math.max(prev - 5, 10));
  };

  // Reset position and size
  const resetPosition = () => {
    setProductPosition({ x: 50, y: 50 });
    setProductSize(30);
  };

  // Clean up on dialog close
  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      // Reset state when dialog is closed
      setBackgroundImage(null);
      setProductPosition({ x: 50, y: 50 });
      setProductSize(30);
    }
    onOpenChange(newOpen);
  };

  // Set up event listeners
  useEffect(() => {
    if (open) {
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchend', handleTouchEnd);
      
      return () => {
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [open, isDragging]);

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[800px] h-[90vh] max-h-[700px] flex flex-col">
        <DialogHeader>
          <DialogTitle>{language === 'ar' ? translations.title.ar : translations.title.en}</DialogTitle>
          <DialogDescription>
            {language === 'ar' ? translations.description.ar : translations.description.en}
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col space-y-4 flex-1 overflow-hidden">
          {!backgroundImage ? (
            <div className="flex flex-col items-center justify-center space-y-4 border-2 border-dashed border-gray-300 rounded-lg p-8 h-full">
              <label htmlFor="room-photo" className="cursor-pointer">
                <div className="flex flex-col items-center space-y-2">
                  <Upload size={48} className="text-gray-400" />
                  <span className="text-gray-500">
                    {language === 'ar' ? translations.uploadPhoto.ar : translations.uploadPhoto.en}
                  </span>
                </div>
                <input
                  type="file"
                  id="room-photo"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileUpload}
                />
              </label>
              <div className="text-gray-400">- {t('common.or')} -</div>
              <Button variant="outline" onClick={handleCameraCapture}>
                <Camera className="mr-2 h-4 w-4" />
                {language === 'ar' ? translations.takePicture.ar : translations.takePicture.en}
              </Button>
            </div>
          ) : (
            <div 
              ref={containerRef}
              className="relative flex-1 overflow-hidden rounded-lg cursor-move"
              style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
              onMouseMove={handleMouseMove}
              onTouchMove={handleTouchMove}
            >
              <div 
                className="absolute transform -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: `${productPosition.x}%`,
                  top: `${productPosition.y}%`,
                  width: `${productSize}%`,
                  cursor: isDragging ? 'grabbing' : 'grab'
                }}
                onMouseDown={handleMouseDown}
                onTouchStart={handleTouchStart}
              >
                <img 
                  src={productImage} 
                  alt={productName}
                  className="w-full h-auto"
                  draggable="false"
                />
              </div>
              
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                {language === 'ar' ? translations.dragMessage.ar : translations.dragMessage.en}
              </div>
            </div>
          )}
          
          {backgroundImage && (
            <div className="flex flex-wrap justify-center space-x-2 rtl:space-x-reverse">
              <Button variant="outline" onClick={resetPosition}>
                <X className="mr-2 h-4 w-4" />
                {language === 'ar' ? translations.resetPosition.ar : translations.resetPosition.en}
              </Button>
              <Button variant="outline" onClick={increaseSize}>
                {language === 'ar' ? translations.sizeUp.ar : translations.sizeUp.en}
              </Button>
              <Button variant="outline" onClick={decreaseSize}>
                {language === 'ar' ? translations.sizeDown.ar : translations.sizeDown.en}
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ARViewer;
