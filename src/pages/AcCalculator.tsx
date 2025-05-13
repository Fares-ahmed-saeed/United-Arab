
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Navbar from "@/components/Navbar";
import { useLanguage } from "@/contexts/LanguageContext";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator } from "lucide-react";
import { toast } from "@/hooks/use-toast";

// Form schema
const formSchema = z.object({
  roomLength: z.string().min(1, { message: "Room length is required" }).transform(Number),
  roomWidth: z.string().min(1, { message: "Room width is required" }).transform(Number),
  ceilingHeight: z.string().min(1, { message: "Ceiling height is required" }).transform(Number),
  roomType: z.enum(["bedroom", "living", "kitchen", "office"]),
  sunExposure: z.enum(["low", "medium", "high"]),
  peopleCount: z.string().min(1, { message: "Number of people is required" }).transform(Number),
  insulation: z.enum(["poor", "average", "good"]),
});

type FormValues = z.infer<typeof formSchema>;

const AcCalculator = () => {
  const { language, t } = useLanguage();
  const [btuResult, setBtuResult] = useState<number | null>(null);
  const [acSizeRecommendation, setAcSizeRecommendation] = useState<string>("");
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      roomLength: "",
      roomWidth: "",
      ceilingHeight: "",
      roomType: "bedroom",
      sunExposure: "medium",
      peopleCount: "1",
      insulation: "average",
    },
  });

  // Calculate BTU based on form values
  const calculateBTU = (data: FormValues) => {
    // Basic calculation: area * 20 BTU per sq ft
    let btuBase = data.roomLength * data.roomWidth * data.ceilingHeight * 20;
    
    // Adjust based on room type
    const roomTypeMultiplier = {
      bedroom: 1,
      living: 1.2,
      kitchen: 1.4,
      office: 1.1,
    };
    btuBase *= roomTypeMultiplier[data.roomType];
    
    // Adjust based on sun exposure
    const sunMultiplier = {
      low: 0.9,
      medium: 1,
      high: 1.2,
    };
    btuBase *= sunMultiplier[data.sunExposure];
    
    // Adjust for people
    btuBase += (data.peopleCount - 1) * 600;
    
    // Adjust for insulation
    const insulationMultiplier = {
      poor: 1.2,
      average: 1,
      good: 0.9,
    };
    btuBase *= insulationMultiplier[data.insulation];
    
    // Round to nearest 1000
    const btuFinal = Math.round(btuBase / 1000) * 1000;
    
    // Determine AC size recommendation
    let recommendation = "";
    if (btuFinal <= 8000) {
      recommendation = t('ac_size_small');
    } else if (btuFinal <= 12000) {
      recommendation = t('ac_size_medium');
    } else if (btuFinal <= 18000) {
      recommendation = t('ac_size_large');
    } else if (btuFinal <= 24000) {
      recommendation = t('ac_size_xlarge');
    } else {
      recommendation = t('ac_size_multiple');
    }
    
    return { btuFinal, recommendation };
  };

  const onSubmit = (data: FormValues) => {
    try {
      const { btuFinal, recommendation } = calculateBTU(data);
      setBtuResult(btuFinal);
      setAcSizeRecommendation(recommendation);
      toast({
        title: t('calculation_complete'),
        description: t('btu_calculated'),
      });
    } catch (error) {
      console.error("Calculation error:", error);
      toast({
        variant: "destructive",
        title: t('calculation_error'),
        description: t('please_check_values'),
      });
    }
  };

  return (
    <div className={`min-h-screen ${language === 'ar' ? 'font-arabic' : ''}`}>
      <Navbar />
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-8">
            <Calculator className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold">{t('ac_calculator_title')}</h1>
          </div>
          
          <Card className="glass-card mb-8">
            <CardHeader>
              <CardTitle>{t('ac_calculator_subtitle')}</CardTitle>
              <CardDescription>
                {t('ac_calculator_description')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="roomLength"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('room_length')} (m)</FormLabel>
                          <FormControl>
                            <Input type="number" step="0.1" placeholder="3.5" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="roomWidth"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('room_width')} (m)</FormLabel>
                          <FormControl>
                            <Input type="number" step="0.1" placeholder="4.0" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="ceilingHeight"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('ceiling_height')} (m)</FormLabel>
                          <FormControl>
                            <Input type="number" step="0.1" placeholder="2.5" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="peopleCount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('people_count')}</FormLabel>
                          <FormControl>
                            <Input type="number" min="1" placeholder="2" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="roomType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('room_type')}</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder={t('select_room_type')} />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="bedroom">{t('bedroom')}</SelectItem>
                              <SelectItem value="living">{t('living_room')}</SelectItem>
                              <SelectItem value="kitchen">{t('kitchen')}</SelectItem>
                              <SelectItem value="office">{t('office')}</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="sunExposure"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('sun_exposure')}</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder={t('select_sun_exposure')} />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="low">{t('sun_low')}</SelectItem>
                              <SelectItem value="medium">{t('sun_medium')}</SelectItem>
                              <SelectItem value="high">{t('sun_high')}</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="insulation"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('insulation_quality')}</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder={t('select_insulation')} />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="poor">{t('insulation_poor')}</SelectItem>
                              <SelectItem value="average">{t('insulation_average')}</SelectItem>
                              <SelectItem value="good">{t('insulation_good')}</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            {t('insulation_description')}
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <Button type="submit" className="w-full md:w-auto bg-gradient-to-r from-brand-blue-dark to-brand-blue">
                    {t('calculate_btu')}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          {btuResult && (
            <Card className="glass-card border-primary/30">
              <CardHeader>
                <CardTitle className="text-center">{t('results')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center space-y-4">
                  <div className="text-5xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-vibrant-blue">
                    {btuResult.toLocaleString()} BTU
                  </div>
                  <p className="text-xl text-center mt-2">{acSizeRecommendation}</p>
                </div>
              </CardContent>
              <CardFooter>
                <p className="text-muted-foreground text-sm text-center w-full">
                  {t('btu_recommendation_note')}
                </p>
              </CardFooter>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default AcCalculator;
