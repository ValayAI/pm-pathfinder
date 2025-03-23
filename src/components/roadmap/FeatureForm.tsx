
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { XIcon, PlusCircleIcon } from "lucide-react";
import { Label } from "@/components/ui/label";
import { FeatureInput } from './types';
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Define validation schema
const featureFormSchema = z.object({
  name: z.string().min(1, "Feature name is required"),
  description: z.string().min(10, "Description should be at least 10 characters"),
  effort: z.enum(["Low", "Medium", "High"]),
  impact: z.enum(["Low", "Medium", "High"]),
});

type FeatureFormValues = z.infer<typeof featureFormSchema>;

interface FeatureFormProps {
  features: FeatureInput[];
  onAddFeature: (feature: Omit<FeatureInput, "id">) => void;
}

const FeatureForm: React.FC<FeatureFormProps> = ({ 
  features,
  onAddFeature
}) => {
  // Initialize form with react-hook-form and zod validation
  const form = useForm<FeatureFormValues>({
    resolver: zodResolver(featureFormSchema),
    defaultValues: {
      name: "",
      description: "",
      effort: "Medium",
      impact: "Medium",
    },
  });
  
  const [dependencies, setDependencies] = useState<string[]>([]);
  
  // Available features for dependencies
  const availableFeatures = features.map(f => f.name);

  const handleAddFeature = (values: FeatureFormValues) => {
    // Here's the fix: explicitly creating an object with all required fields
    const newFeature: Omit<FeatureInput, "id"> = {
      name: values.name,
      description: values.description,
      effort: values.effort,
      impact: values.impact,
      dependencies: dependencies,
    };

    onAddFeature(newFeature);
    
    // Reset form and dependencies
    form.reset();
    setDependencies([]);
  };

  const addDependency = (value: string) => {
    if (value && !dependencies.includes(value)) {
      setDependencies([...dependencies, value]);
    }
  };

  const removeDependency = (dep: string) => {
    setDependencies(dependencies.filter(d => d !== dep));
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Add Features</CardTitle>
        <CardDescription>
          Enter the details of each feature you want to include in your roadmap
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleAddFeature)}>
          <CardContent className="space-y-4">
            <div className="grid gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Feature Name</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="e.g., User Authentication" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="What does this feature do?" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="effort"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Effort Level</FormLabel>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select effort level" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Low">Low</SelectItem>
                          <SelectItem value="Medium">Medium</SelectItem>
                          <SelectItem value="High">High</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="impact"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Impact Level</FormLabel>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select impact level" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Low">Low</SelectItem>
                          <SelectItem value="Medium">Medium</SelectItem>
                          <SelectItem value="High">High</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              {features.length > 0 && (
                <div>
                  <Label>Dependencies (Optional)</Label>
                  <Select
                    value=""
                    onValueChange={addDependency}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select dependencies" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableFeatures.map((feature, index) => (
                        <SelectItem key={index} value={feature}>
                          {feature}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  {dependencies.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {dependencies.map((dep, index) => (
                        <div key={index} className="bg-gray-100 px-2 py-1 rounded-md flex items-center text-sm">
                          {dep}
                          <button
                            type="button"
                            className="ml-1 text-gray-500 hover:text-gray-700"
                            onClick={() => removeDependency(dep)}
                          >
                            <XIcon className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              type="submit"
              className="w-full flex items-center gap-2"
            >
              <PlusCircleIcon className="h-4 w-4" />
              Add Feature to Roadmap
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default FeatureForm;
