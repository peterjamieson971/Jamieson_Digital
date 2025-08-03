import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertContactSchema } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Mail, Linkedin, Twitter, Instagram } from "lucide-react";
import type { Profile, InsertContact } from "@shared/schema";

export default function ContactSection() {
  const { toast } = useToast();
  
  const { data: profile } = useQuery<Profile>({
    queryKey: ["/api/profile"],
  });

  const form = useForm<InsertContact>({
    resolver: zodResolver(insertContactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: InsertContact) => {
      const response = await apiRequest("POST", "/api/contact", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Message sent successfully!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["/api/contact"] });
    },
    onError: (error: any) => {
      toast({
        title: "Failed to send message",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertContact) => {
    contactMutation.mutate(data);
  };

  return (
    <section id="contact" className="py-20 px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50 section-fade">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-apple-text tracking-tight mb-4">Get in Touch</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-apple-blue to-blue-600 mx-auto mb-6 rounded-full"></div>
          
        </div>
        
        <div className="grid lg:grid-cols-2 gap-16 mb-16">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-apple-text mb-8">Let's Connect</h3>
            </div>
            
            <div className="space-y-6">
              
              
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-apple-blue rounded-full flex items-center justify-center">
                  <Linkedin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-apple-text">LinkedIn</h4>
                  <p className="text-apple-gray">{profile?.linkedin || "linkedin.com/in/pjamieson"}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center">
                  <Twitter className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-apple-text">X (Twitter)</h4>
                  <p className="text-apple-gray">@peterjamieson</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                  <Instagram className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-apple-text">Instagram</h4>
                  <p className="text-apple-gray">@jamieson.digital</p>
                </div>
              </div>
            </div>
            
            <div className="pt-6">
              <h4 className="font-semibold text-apple-text mb-2">Location</h4>
              <p className="text-apple-gray">{profile?.location || "Dubai, UAE • Available for Global Collaboration"}</p>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
            <h3 className="text-2xl font-bold text-apple-text mb-6">Send a Message</h3>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-apple-text">Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Your full name"
                          className="border-gray-200 focus:ring-apple-blue focus:border-apple-blue"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-apple-text">Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="your.email@domain.com"
                          className="border-gray-200 focus:ring-apple-blue focus:border-apple-blue"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-apple-text">Message</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell me about your project or inquiry..."
                          className="border-gray-200 focus:ring-apple-blue focus:border-apple-blue resize-none"
                          rows={5}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button
                  type="submit"
                  className="w-full bg-apple-blue hover:bg-apple-blue/90 text-white py-3"
                  disabled={contactMutation.isPending}
                >
                  {contactMutation.isPending ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
}