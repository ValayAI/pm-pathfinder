
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Clock, Users, Star, Award } from "lucide-react";

const Coaching = () => {
  const coaches = [
    {
      name: "Alex Morgan",
      role: "Senior PM at TechCorp",
      expertise: ["Product Strategy", "User Research", "Roadmapping"],
      image: "/placeholder.svg",
      rating: 4.9,
      reviews: 128
    },
    {
      name: "Sarah Williams",
      role: "Director of Product at StartupX",
      expertise: ["Leadership", "Market Validation", "Growth"],
      image: "/placeholder.svg",
      rating: 4.8,
      reviews: 94
    },
    {
      name: "Michael Chen",
      role: "Former PM at BigTech",
      expertise: ["Technical Products", "Product Analytics", "Team Management"],
      image: "/placeholder.svg",
      rating: 4.7,
      reviews: 76
    }
  ];

  const coachingOptions = [
    {
      title: "One-time Consultation",
      description: "60-minute session to address specific product challenges",
      price: "$149",
      features: [
        "Personalized advice",
        "Action items document",
        "2 weeks of email follow-up"
      ],
      icon: <Clock className="h-6 w-6 text-primary" />
    },
    {
      title: "Career Growth Package",
      description: "4-week program designed to accelerate your PM career",
      price: "$499",
      features: [
        "4 coaching sessions",
        "Resume & portfolio review",
        "Interview preparation",
        "Personalized growth plan"
      ],
      icon: <Award className="h-6 w-6 text-primary" />,
      popular: true
    },
    {
      title: "Team Coaching",
      description: "Coaching for product teams to improve processes and collaboration",
      price: "Custom",
      features: [
        "Team assessment",
        "Process optimization",
        "Collaborative workshops",
        "Follow-up implementation support"
      ],
      icon: <Users className="h-6 w-6 text-primary" />
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-24">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">1-on-1 Product Management Coaching</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get personalized guidance from experienced product leaders to accelerate your career.
            </p>
          </div>
          
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Meet Our Coaches</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {coaches.map((coach, index) => (
                <Card key={index} className="h-full flex flex-col">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={coach.image} />
                        <AvatarFallback>{coach.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                        <span className="text-sm font-medium">{coach.rating}</span>
                        <span className="text-xs text-muted-foreground ml-1">({coach.reviews})</span>
                      </div>
                    </div>
                    <CardTitle className="mt-4">{coach.name}</CardTitle>
                    <CardDescription>{coach.role}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-4 flex-grow">
                    <div className="flex flex-wrap gap-2 mt-2">
                      {coach.expertise.map((skill, i) => (
                        <span key={i} className="text-xs bg-muted px-2 py-1 rounded-full">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <Button variant="outline" className="w-full">View Profile</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </section>
          
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Coaching Options</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {coachingOptions.map((option, index) => (
                <Card key={index} className={`h-full flex flex-col ${option.popular ? 'border-primary shadow-md' : ''}`}>
                  {option.popular && (
                    <div className="bg-primary text-primary-foreground text-xs font-medium text-center py-1 rounded-t-lg">
                      Most Popular
                    </div>
                  )}
                  <CardHeader className="pb-2">
                    <div className="flex items-center mb-2">
                      {option.icon}
                    </div>
                    <CardTitle>{option.title}</CardTitle>
                    <CardDescription>{option.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-4 flex-grow">
                    <div className="text-2xl font-bold mb-4">{option.price}</div>
                    <ul className="space-y-2">
                      {option.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <span className="text-green-500 mr-2">✓</span>
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <Button className="w-full" variant={option.popular ? "default" : "outline"}>
                      {option.price === "Custom" ? "Contact Us" : "Book Session"}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </section>
          
          <section>
            <div className="bg-muted/50 rounded-lg p-8 flex flex-col md:flex-row items-center justify-between">
              <div className="mb-6 md:mb-0 md:mr-6">
                <h2 className="text-2xl font-bold mb-2">Ready to accelerate your PM career?</h2>
                <p className="text-muted-foreground">
                  Schedule a free 15-minute consultation to discuss your goals.
                </p>
              </div>
              <Button size="lg" className="whitespace-nowrap">
                <Calendar className="mr-2 h-4 w-4" />
                Schedule Call
              </Button>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Coaching;
