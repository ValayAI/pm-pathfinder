
import React from 'react';
import { Link } from 'react-router-dom';
import Dashboard from '@/components/Dashboard';
import { ArrowRight, FileSearch } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface SitemapSection {
  title: string;
  description: string;
  links: {
    name: string;
    href: string;
    description?: string;
  }[];
}

const Sitemap = () => {
  const sitemapData: SitemapSection[] = [
    {
      title: "Main Pages",
      description: "Essential pages for all users",
      links: [
        { name: "Home", href: "/", description: "Platform overview and getting started" },
        { name: "Pricing", href: "/pricing", description: "Subscription plans and features" },
        { name: "Blog", href: "/blog", description: "Articles, guides, and resources" },
        { name: "Sign In", href: "/signin", description: "Existing user login" },
        { name: "Sign Up", href: "/sign-up", description: "Create a new account" },
      ]
    },
    {
      title: "Member Resources",
      description: "Available after signing in",
      links: [
        { name: "Explore", href: "/explore", description: "Discover platform features" },
        { name: "Resources", href: "/resources", description: "Templates and frameworks" },
        { name: "Chat", href: "/chat", description: "AI assistant for product managers" },
        { name: "Coaching", href: "/coaching", description: "Personalized PM coaching" },
        { name: "Roadmap", href: "/roadmap", description: "Product roadmap generator" },
        { name: "Settings", href: "/settings", description: "Account and preference settings" },
      ]
    },
    {
      title: "Legal & Info",
      description: "Important information about our service",
      links: [
        { name: "Privacy Policy", href: "/privacy", description: "How we handle your data" },
        { name: "Terms of Service", href: "/terms", description: "Rules for using our platform" },
        { name: "Sitemap", href: "/sitemap", description: "This page - overview of site structure" },
      ]
    }
  ];

  return (
    <Dashboard>
      <div className="container max-w-7xl mx-auto px-4 py-12">
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Sitemap</h1>
          <p className="text-lg text-muted-foreground mb-6">
            A complete overview of all pages available on PM Pathfinder
          </p>
          
          <Alert className="mb-8">
            <FileSearch className="h-4 w-4 mr-2" />
            <AlertDescription>
              <span className="font-medium">For search engines:</span> An XML version of this sitemap is available at{' '}
              <a 
                href="/sitemap.xml" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                /sitemap.xml
              </a>
            </AlertDescription>
          </Alert>
        </div>

        <div className="space-y-10">
          {sitemapData.map((section, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{section.title}</CardTitle>
                <CardDescription>{section.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex} className="group">
                      <Link 
                        to={link.href}
                        className="flex items-center justify-between p-3 rounded-md hover:bg-muted transition-colors"
                      >
                        <div>
                          <p className="font-medium text-foreground">{link.name}</p>
                          {link.description && (
                            <p className="text-sm text-muted-foreground">{link.description}</p>
                          )}
                        </div>
                        <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Dashboard>
  );
};

export default Sitemap;
