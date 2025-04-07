
import React from 'react';
import { useAuth } from '@/providers/AuthProvider';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContentTeaser from '@/components/ContentTeaser';
import { Calendar, Lock, MessageSquare, VideoIcon, Star, Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

// Define the coaches data array
const coaches = [
  {
    name: "Sarah Johnson",
    role: "Senior PM at Google",
    image: "/placeholder.svg",
    rating: 4.9,
    reviews: 124,
    expertise: ["B2B", "SaaS", "Product Strategy"]
  },
  {
    name: "Michael Chen",
    role: "PM Director at Amazon",
    image: "/placeholder.svg",
    rating: 4.8,
    reviews: 87,
    expertise: ["Consumer Tech", "AI Products", "Leadership"]
  },
  {
    name: "Priya Patel",
    role: "Product Lead at Stripe",
    image: "/placeholder.svg",
    rating: 4.7,
    reviews: 65,
    expertise: ["Fintech", "Growth", "User Onboarding"]
  }
];

// Define the coaching options data array
const coachingOptions = [
  {
    title: "Career Strategy Session",
    description: "30-minute focused coaching on your PM career path",
    price: "$89",
    popular: true,
    icon: <MessageSquare className="h-5 w-5 text-purple-600" />,
    features: [
      "Customized advice for your experience level",
      "Career progression planning",
      "Personalized skill development plan"
    ],
    comingSoon: false
  },
  {
    title: "Interview Preparation",
    description: "45-minute mock interview with detailed feedback",
    price: "$129",
    popular: false,
    icon: <VideoIcon className="h-5 w-5 text-blue-600" />,
    features: [
      "Real PM interview questions",
      "Detailed feedback on your answers",
      "Tailored improvement suggestions"
    ],
    comingSoon: true
  },
  {
    title: "Executive Coaching",
    description: "Premium coaching for senior product leaders",
    price: "Custom",
    popular: false,
    icon: <Calendar className="h-5 w-5 text-amber-600" />,
    features: [
      "Leadership strategy development",
      "Executive presence coaching",
      "Organizational design guidance"
    ],
    comingSoon: true
  }
];

const CoachingTeaser = () => {
  return (
    <ContentTeaser
      title="1-on-1 Coaching Sessions"
      description="Get personalized guidance from experienced Product Managers"
      cta="Access coaching sessions"
    >
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-2 border-primary/10">
          <CardHeader className="pb-3">
            <div className="flex justify-between items-start mb-2">
              <div className="bg-purple-50 dark:bg-purple-900/30 p-2 rounded">
                <MessageSquare className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <Badge variant="outline" className="bg-purple-50 text-purple-700 hover:bg-purple-50 dark:bg-purple-900/20 dark:text-purple-300">
                Most Popular
              </Badge>
            </div>
            <CardTitle className="text-lg">Career Strategy Session</CardTitle>
            <CardDescription>
              30-minute coaching on your PM career path
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <div className="h-5 w-5 flex items-center justify-center rounded-full bg-green-100 text-green-600 flex-shrink-0 mt-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                  </svg>
                </div>
                <span>Customized advice for your experience level</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="h-5 w-5 flex items-center justify-center rounded-full bg-green-100 text-green-600 flex-shrink-0 mt-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                  </svg>
                </div>
                <span>Career progression planning</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="h-5 w-5 flex items-center justify-center rounded-full bg-green-100 text-green-600 flex-shrink-0 mt-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                  </svg>
                </div>
                <span>Personalized skill development plan</span>
              </li>
            </ul>
            
            <div className="mt-5">
              <Button className="w-full" disabled>
                <Lock className="mr-2 h-4 w-4" /> Book Session
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-2 border-primary/10">
          <CardHeader className="pb-3">
            <div className="flex justify-between items-start mb-2">
              <div className="bg-blue-50 dark:bg-blue-900/30 p-2 rounded">
                <VideoIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-50 dark:bg-blue-900/20 dark:text-blue-300">
                Advanced
              </Badge>
            </div>
            <CardTitle className="text-lg">Interview Prep Session</CardTitle>
            <CardDescription>
              45-minute mock interview with feedback
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <div className="h-5 w-5 flex items-center justify-center rounded-full bg-green-100 text-green-600 flex-shrink-0 mt-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                  </svg>
                </div>
                <span>Real PM interview questions</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="h-5 w-5 flex items-center justify-center rounded-full bg-green-100 text-green-600 flex-shrink-0 mt-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                  </svg>
                </div>
                <span>Detailed feedback on your answers</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="h-5 w-5 flex items-center justify-center rounded-full bg-green-100 text-green-600 flex-shrink-0 mt-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                  </svg>
                </div>
                <span>Tailored improvement suggestions</span>
              </li>
            </ul>
            
            <div className="mt-5">
              <Button className="w-full" disabled>
                <Lock className="mr-2 h-4 w-4" /> Book Session
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="mt-8">
        <Card className="bg-muted/30">
          <CardContent className="pt-6">
            <p className="italic text-muted-foreground">
              "The coaching session completely changed how I approach PM interviews. I received an offer from my dream company just two weeks after our coaching call!"
            </p>
            <p className="mt-4 text-sm font-medium">Jessica K. — Product Manager at Airbnb</p>
          </CardContent>
        </Card>
      </div>
    </ContentTeaser>
  );
};

const Coaching = () => {
  const { user } = useAuth();
  
  if (!user) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8 max-w-4xl">
          <CoachingTeaser />
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
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
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Coaching Options</h2>
            <div className="bg-amber-50 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 py-1.5 px-4 rounded-full flex items-center text-sm">
              <Clock className="h-4 w-4 mr-1" />
              Some features coming soon
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {coachingOptions.map((option, index) => (
              <Card key={index} className={`h-full flex flex-col ${option.popular ? 'border-primary shadow-md' : ''}`}>
                {option.popular && (
                  <div className="bg-primary text-primary-foreground text-xs font-medium text-center py-1 rounded-t-lg">
                    Most Popular
                  </div>
                )}
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      {option.icon}
                    </div>
                    {option.comingSoon && (
                      <Badge variant="outline" className="bg-amber-50 text-amber-700 hover:bg-amber-50 dark:bg-amber-900/20 dark:text-amber-300">
                        <Clock className="h-3 w-3 mr-1" /> Coming Soon
                      </Badge>
                    )}
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
                  <Button 
                    className="w-full" 
                    variant={option.popular ? "default" : "outline"}
                    disabled={option.comingSoon}
                  >
                    {option.comingSoon 
                      ? "Coming Soon" 
                      : option.price === "Custom" 
                        ? "Contact Us" 
                        : "Book Session"
                    }
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
      </main>
      <Footer />
    </div>
  );
};

export default Coaching;
