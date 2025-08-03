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
    <section id="contact" className="py-24 px-6 lg:px-8 bg-white section-fade">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-apple-text tracking-apple mb-6">Get in Touch</h2>
          <div className="w-12 h-0.5 bg-apple-text mx-auto mb-6"></div>
          <p className="text-apple-gray text-lg">
            Interested in collaboration, speaking opportunities, or simply want to connect? 
            I'd love to hear from you.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 mb-12">
          {/* Contact Information */}
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-apple-text mb-2">Email</h3>
              <p className="text-apple-gray">{profile?.email || "your.email@domain.com"}</p>
            </div>
            
            <div>
              <h3 className="font-semibold text-apple-text mb-2">LinkedIn</h3>
              <p className="text-apple-gray">{profile?.linkedin || "linkedin.com/in/yourprofile"}</p>
            </div>
            
            <div>
              <h3 className="font-semibold text-apple-text mb-2">Location</h3>
              <p className="text-apple-gray">{profile?.location || "Global • Available for Remote Collaboration"}</p>
            </div>
          </div>
          
          {/* Contact Form */}
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
                        rows={4}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button
                type="submit"
                className="w-full bg-apple-blue hover:bg-apple-blue/90 text-white"
                disabled={contactMutation.isPending}
              >
                {contactMutation.isPending ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
}
