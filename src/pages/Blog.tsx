
import { useState, useEffect } from 'react';
import Dashboard from '@/components/Dashboard';
import BlogCard from '@/components/BlogCard';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import BlogPostModal from '@/components/modals/BlogPostModal';

// Blog post data
const blogPosts = [
  {
    id: '1',
    title: 'Top 10 Product Management Interview Questions',
    description: 'Prepare for your next PM interview with these top 10 questions and expert-backed sample answers.',
    content: `Product management interviews are known for being among the toughest in tech. They test your analytical skills, strategic thinking, communication, and stakeholder management — all in one sitting. To help you stand out, we've compiled the top 10 most frequently asked PM interview questions, complete with sample answers and strategies you can use right now with PM-Pathfinder.

Top 10 Questions:
1. Tell me about a product you admire. Why?
2. How do you prioritize product features?
3. Describe a time you disagreed with a stakeholder.
4. Walk me through how you'd launch a new product.
5. How do you measure product success?
6. How do you handle feature requests from sales?
7. What would you improve about our product?
8. Explain a technical concept to a non-technical audience.
9. Tell me about a failed product you worked on.
10. How do you gather user feedback?

Sample Answer Using PM-Pathfinder:
Prompt: "How do I answer the question: How do you prioritize features in a marketplace app?"
Response from PM-Pathfinder: A prioritized framework like RICE with real-life context.

Practice these questions with PM-Pathfinder to improve your responses and gain confidence for your next interview.`,
    category: 'Interviews',
    icon: 'interview',
    publishDate: 'April 5, 2025',
    readingTime: '4 min',
    slug: 'top-10-product-management-interview-questions',
    featured: true
  },
  {
    id: '2',
    title: 'The Ultimate Framework Guide for Product Managers',
    description: 'Discover the most effective product management frameworks and when to use them.',
    content: `Product management is part art, part science — and frameworks help bridge the two. Whether you're building a roadmap, prioritizing features, or aligning teams, the right framework can make your job faster and easier. This guide breaks down the most useful PM frameworks by category.

Prioritization Frameworks:
- RICE: Reach, Impact, Confidence, Effort
- ICE: Impact, Confidence, Ease
- MoSCoW: Must Have, Should Have, Could Have, Won't Have

Strategy Frameworks:
- North Star Metric
- Kano Model
- Product-Market Fit Pyramid

Discovery Frameworks:
- Jobs To Be Done (JTBD)
- Opportunity Solution Tree
- Lean Canvas

When to Use What:
Use RICE when comparing multiple initiatives. Use JTBD for user research. Use Kano when planning delight vs. expected features.

PM-Pathfinder helps you choose and apply the right framework for any product challenge.`,
    category: 'Strategic',
    icon: 'strategic',
    publishDate: 'March 28, 2025',
    readingTime: '5 min',
    slug: 'ultimate-framework-guide-product-managers',
    featured: false
  },
  {
    id: '3',
    title: 'How to Prep for a PM Interview in 7 Days',
    description: 'Short on time before your PM interview? Follow this 7-day crash course to prepare for success.',
    content: `Got a product management interview coming up in less than a week? Don't panic — here's a proven 7-day plan to get you ready, fast. This plan combines focused prep with targeted AI-powered practice using PM-Pathfinder.

Day-by-Day Plan:
- Day 1: Research the company, its product, and its roadmap.
- Day 2: Review your resume and align your stories with PM responsibilities.
- Day 3: Practice behavioral questions using the STAR method.
- Day 4: Dive into product design and strategy questions.
- Day 5: Use PM-Pathfinder to simulate real interviews.
- Day 6: Mock interview with a friend or coach.
- Day 7: Rest, review, and prep your closing questions.

PM-Pathfinder is your on-demand interview coach to accelerate your prep.`,
    category: 'Planning',
    icon: 'planning',
    publishDate: 'March 20, 2025',
    readingTime: '3 min',
    slug: 'prep-pm-interview-7-days',
    featured: false
  },
  {
    id: '4',
    title: 'AI for Product Managers: 5 Ways to Use It in Your Workflow',
    description: 'Explore how AI tools like PM-Pathfinder are transforming the way product managers research, plan, and execute in 2024.',
    content: `AI isn't replacing product managers — it's empowering them. The smartest PMs are now using AI to save time, boost creativity, and improve decision-making. Here are five ways you can start using AI today in your PM workflow.

5 Ways to Use AI as a PM:
1. Summarize Customer Feedback: Extract themes from survey results and app reviews.
2. Prioritize Ideas with Context: Use frameworks instantly with PM-Pathfinder.
3. Write Strategy Docs Faster: Use AI to outline PRDs or OKRs.
4. Prep for Stakeholder Presentations: Get talking points and visuals ideas.
5. Interview Practice On-Demand: Roleplay tough questions using PM-Pathfinder.

Ready to level up your workflow? Use PM-Pathfinder to work smarter, not harder.`,
    category: 'Strategic',
    icon: 'strategic',
    publishDate: 'March 15, 2025',
    readingTime: '4 min',
    slug: 'ai-product-managers-workflow',
    featured: false
  },
  {
    id: '5',
    title: 'What Most PMs Get Wrong in Interviews — And How to Fix It',
    description: 'Avoid common PM interview mistakes and learn how to fix them with real-time coaching from PM-Pathfinder.',
    content: `Even experienced product managers stumble in interviews. Why? Because they underprepare for behavioral questions, overexplain frameworks, or fail to communicate trade-offs clearly. Here's how to avoid those pitfalls — and how PM-Pathfinder can help.

Common Mistakes:
- Rambling instead of using a structured story (fix with STAR method)
- Talking about features instead of outcomes
- Missing the "why" behind prioritization decisions
- Lack of stakeholder or cross-functional awareness

How to Fix It:
- Get instant feedback on your answers
- Practice tough questions before your next real interview
- Learn to reframe answers around impact and collaboration

Don't make the same mistakes twice. Practice with PM-Pathfinder and get interview-ready today.`,
    category: 'Interviews',
    icon: 'interview',
    publishDate: 'March 10, 2025',
    readingTime: '3 min',
    slug: 'what-pms-get-wrong-interviews',
    featured: false
  },
  {
    id: '6',
    title: 'Roadmap Builder for Product Teams',
    description: 'Create beautiful roadmaps aligned with your product strategy.',
    content: `Building effective product roadmaps is essential for aligning teams and stakeholders around your vision and strategy. A good roadmap communicates not just what you're building, but why, when, and how it connects to larger business goals.

Key Elements of Successful Roadmaps:
- Clear objectives tied to business goals
- Timeframes that are flexible yet actionable
- Focus on outcomes rather than features
- Visual clarity that makes priorities obvious

PM-Pathfinder's roadmap builder helps you create strategic, visually compelling roadmaps that keep everyone aligned. The tool helps you:
- Define themes tied to company objectives
- Prioritize initiatives based on impact
- Visualize dependencies between workstreams
- Create shareable, professional roadmap documents

Whether you're managing a new product launch or planning the next quarter's initiatives, having a well-structured roadmap makes all the difference in execution and stakeholder management.`,
    category: 'Planning',
    icon: 'planning',
    publishDate: 'March 5, 2025',
    readingTime: '5 min',
    slug: 'roadmap-builder-product-teams',
    featured: false
  }
];

const Blog = () => {
  // Find featured blog post
  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);
  
  // State to control the featured post modal
  const [isFeaturedModalOpen, setIsFeaturedModalOpen] = useState(false);
  
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);

  return (
    <Dashboard>
      <div className="container max-w-7xl mx-auto px-4 py-8">
        <div className="mb-10">
          <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary mb-4">
            PM Insights
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-6">PM Pathfinder Blog</h1>
          <p className="text-lg text-muted-foreground">
            Expert insights to help you excel in your product management career
          </p>
        </div>

        {featuredPost && (
          <>
            <div className="mb-12 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-6 rounded-xl">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-2/3">
                  <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-600 dark:text-amber-400 mb-4">
                    Featured Article
                  </div>
                  <h2 className="text-2xl font-bold mb-2">{featuredPost.title}</h2>
                  <div className="text-sm text-muted-foreground mb-4">
                    {featuredPost.publishDate} · {featuredPost.readingTime} read
                  </div>
                  <p className="mb-6">{featuredPost.description}</p>
                  <Button onClick={() => setIsFeaturedModalOpen(true)}>
                    Read Featured Article <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
                <div className="md:w-1/3 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-800/30 dark:to-purple-800/30 rounded-lg flex items-center justify-center">
                  <div className="p-8 text-center">
                    <span className="text-3xl font-bold text-primary">PM Insights</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Modal for featured post */}
            <BlogPostModal 
              open={isFeaturedModalOpen}
              onOpenChange={setIsFeaturedModalOpen}
              title={featuredPost.title}
              content={featuredPost.content}
              category={featuredPost.category}
              icon={featuredPost.icon as 'interview' | 'strategic' | 'planning'}
              publishDate={featuredPost.publishDate}
              readingTime={featuredPost.readingTime}
            />
          </>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {regularPosts.map((post) => (
            <BlogCard
              key={post.id}
              id={post.id}
              title={post.title}
              description={post.description}
              content={post.content}
              category={post.category}
              icon={post.icon as 'interview' | 'strategic' | 'planning'}
              publishDate={post.publishDate}
              readingTime={post.readingTime}
              slug={post.slug}
            />
          ))}
        </div>
      </div>
    </Dashboard>
  );
};

export default Blog;
