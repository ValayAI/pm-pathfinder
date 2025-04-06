
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Dashboard from '@/components/Dashboard';
import BlogCard from '@/components/BlogCard';
import { Button } from '@/components/ui/button';

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
  }
];

const Blog = () => {
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <BlogCard
              key={post.id}
              id={post.id}
              title={post.title}
              description={post.description}
              content={post.content}
              category={post.category}
              icon={post.icon as 'interview' | 'strategic' | 'planning'}
            />
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to take your PM career to the next level?</h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Access personalized coaching, frameworks, and tools to excel in your product management career.
          </p>
          <div className="flex justify-center gap-4">
            <Button variant="outline" asChild>
              <Link to="/resources">Browse Resources</Link>
            </Button>
            <Button asChild>
              <Link to="/signup">Get Started for Free</Link>
            </Button>
          </div>
        </div>
      </div>
    </Dashboard>
  );
};

export default Blog;
