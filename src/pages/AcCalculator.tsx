
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Thermometer, Calculator, AirVent } from "lucide-react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel,
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";

// Form schema for the calculator
const formSchema = z.object({
  roomSize: z.coerce.number().min(1, "Room size must be at least 1 square meter"),
  ceilingHeight: z.coerce.number().min(1, "Ceiling height must be at least 1 meter"),
  windowsCount: z.coerce.number().min(0, "Cannot have negative windows"),
  occupants: z.coerce.number().min(1, "Must have at least 1 occupant"),
});

type CalculatorFormValues = z.infer<typeof formSchema>;

const AcCalculator = () => {
  const { t } = useLanguage();
  const [btuResult, setBtuResult] = useState<number | null>(null);
  const [acSize, setAcSize] = useState<string>("");

  const form = useForm<CalculatorFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      roomSize: 20,
      ceilingHeight: 2.5,
      windowsCount: 2,
      occupants: 2,
    },
  });

  const onSubmit = (data: CalculatorFormValues) => {
    // Basic BTU calculation formula (simplified)
    // Base: 20 BTU per square meter
    // Add ceiling height factor
    // Add 1000 BTU per window
    // Add 600 BTU per occupant after the first person
    
    const baseBtu = data.roomSize * 20;
    const heightFactor = data.ceilingHeight > 2.5 ? (data.ceilingHeight - 2.5) * 0.1 + 1 : 1;
    const windowsBtu = data.windowsCount * 1000;
    const occupantsBtu = (data.occupants - 1) * 600;
    
    const totalBtu = Math.round((baseBtu * heightFactor) + windowsBtu + occupantsBtu);
    setBtuResult(totalBtu);
    
    // Recommend AC tonnage
    if (totalBtu < 6000) {
      setAcSize("0.75 - 1 ton (up to 12,000 BTU)");
    } else if (totalBtu < 12000) {
      setAcSize("1 - 1.5 ton (12,000 - 18,000 BTU)");
    } else if (totalBtu < 18000) {
      setAcSize("1.5 - 2 ton (18,000 - 24,000 BTU)");
    } else if (totalBtu < 24000) {
      setAcSize("2 - 2.5 ton (24,000 - 30,000 BTU)");
    } else if (totalBtu < 30000) {
      setAcSize("2.5 - 3 ton (30,000 - 36,000 BTU)");
    } else {
      setAcSize("3+ ton (36,000+ BTU)");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow py-20 px-4 bg-gray-50">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-brand-blue mb-4">
              {t("acCalculator.title")}
            </h1>
            <p className="text-lg text-gray-600">
              {t("acCalculator.description")}
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="text-brand-blue" />
                    {t("acCalculator.formTitle")}
                  </CardTitle>
                  <CardDescription>
                    {t("acCalculator.formDescription")}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="roomSize"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>
                                {t("acCalculator.roomSize")}
                              </FormLabel>
                              <FormControl>
                                <Input type="number" {...field} />
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
                              <FormLabel>
                                {t("acCalculator.ceilingHeight")}
                              </FormLabel>
                              <FormControl>
                                <Input type="number" step="0.1" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="windowsCount"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>
                                {t("acCalculator.windowsCount")}
                              </FormLabel>
                              <FormControl>
                                <Input type="number" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="occupants"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>
                                {t("acCalculator.occupants")}
                              </FormLabel>
                              <FormControl>
                                <Input type="number" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <Button 
                        type="submit" 
                        className="w-full bg-brand-blue hover:bg-brand-blue-dark"
                      >
                        {t("acCalculator.calculate")}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Thermometer className="text-brand-blue" />
                    {t("acCalculator.resultTitle")}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center h-full">
                  {btuResult ? (
                    <div className="text-center">
                      <div className="flex justify-center">
                        <AirVent size={60} className="text-brand-blue mb-4" />
                      </div>
                      <div className="text-3xl font-bold text-brand-blue mb-2">
                        {btuResult.toLocaleString()} BTU
                      </div>
                      <div className="text-lg font-medium text-gray-700 mb-6">
                        {acSize}
                      </div>
                      <p className="text-sm text-gray-500">
                        {t("acCalculator.recommendation")}
                      </p>
                    </div>
                  ) : (
                    <div className="text-center text-gray-500">
                      <AirVent size={60} className="mx-auto mb-4 opacity-50" />
                      <p>
                        {t("acCalculator.noResult")}
                      </p>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="text-xs text-gray-500 text-center">
                  {t("acCalculator.disclaimer")}
                </CardFooter>
              </Card>
            </div>
          </div>
          
          <div className="mt-10">
            <Card>
              <CardHeader>
                <CardTitle>
                  {t("acCalculator.infoTitle")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  {t("acCalculator.infoParagraph1")}
                </p>
                <p className="mb-4">
                  {t("acCalculator.infoParagraph2")}
                </p>
                <p>
                  {t("acCalculator.infoParagraph3")}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AcCalculator;
