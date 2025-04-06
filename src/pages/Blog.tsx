
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Dashboard from '@/components/Dashboard';
import { Button } from '@/components/ui/button';

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
      <div className="container max-w-5xl mx-auto px-4 py-8">
        <div className="mb-10">
          <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary mb-4">
            PM Insights
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-6">PM Pathfinder Blog</h1>
          <p className="text-lg text-muted-foreground">
            Expert insights to help you excel in your product management career
          </p>
        </div>

        <div className="space-y-16">
          {/* Article 1 */}
          <article className="border-b pb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Top 10 Product Management Interview Questions (With Answers)</h2>
            <p className="text-muted-foreground mb-6">
              Prepare for your next PM interview with these top 10 questions and expert-backed sample answers.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">Intro</h3>
            <p className="mb-4">Product management interviews are known for being among the toughest in tech. They test your analytical skills, strategic thinking, communication, and stakeholder management — all in one sitting. To help you stand out, we've compiled the top 10 most frequently asked PM interview questions, complete with sample answers and strategies you can use right now with PM-Pathfinder.</p>

            <h3 className="text-xl font-semibold mt-6 mb-3">Top 10 Questions</h3>
            <ol className="list-decimal pl-5 space-y-2 mb-6">
              <li>Tell me about a product you admire. Why?</li>
              <li>How do you prioritize product features?</li>
              <li>Describe a time you disagreed with a stakeholder.</li>
              <li>Walk me through how you'd launch a new product.</li>
              <li>How do you measure product success?</li>
              <li>How do you handle feature requests from sales?</li>
              <li>What would you improve about our product?</li>
              <li>Explain a technical concept to a non-technical audience.</li>
              <li>Tell me about a failed product you worked on.</li>
              <li>How do you gather user feedback?</li>
            </ol>

            <h3 className="text-xl font-semibold mt-6 mb-3">Sample Answer Using PM-Pathfinder</h3>
            <div className="bg-muted p-6 rounded-lg mb-6">
              <p className="font-semibold mb-2">Prompt: "How do I answer the question: How do you prioritize features in a marketplace app?"</p>
              <p className="mb-4">Response from PM-Pathfinder: A prioritized framework like RICE with real-life context.</p>
            </div>

            <div className="mt-8">
              <Link to="/chat">
                <Button className="bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700">
                  Practice these questions with PM-Pathfinder
                </Button>
              </Link>
            </div>
          </article>

          {/* Article 2 */}
          <article className="border-b pb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">The Ultimate Framework Guide for Product Managers</h2>
            <p className="text-muted-foreground mb-6">
              Discover the most effective product management frameworks and when to use them. Boost your strategic decision-making with this PM guide.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">Intro</h3>
            <p className="mb-4">Product management is part art, part science — and frameworks help bridge the two. Whether you're building a roadmap, prioritizing features, or aligning teams, the right framework can make your job faster and easier. This guide breaks down the most useful PM frameworks by category.</p>

            <h3 className="text-xl font-semibold mt-6 mb-3">Prioritization Frameworks</h3>
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li>RICE: Reach, Impact, Confidence, Effort</li>
              <li>ICE: Impact, Confidence, Ease</li>
              <li>MoSCoW: Must Have, Should Have, Could Have, Won't Have</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3">Strategy Frameworks</h3>
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li>North Star Metric</li>
              <li>Kano Model</li>
              <li>Product-Market Fit Pyramid</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3">Discovery Frameworks</h3>
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li>Jobs To Be Done (JTBD)</li>
              <li>Opportunity Solution Tree</li>
              <li>Lean Canvas</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3">When to Use What</h3>
            <p className="mb-4">Use RICE when comparing multiple initiatives. Use JTBD for user research. Use Kano when planning delight vs. expected features.</p>

            <div className="mt-8">
              <Link to="/explore">
                <Button className="bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700">
                  Try PM-Pathfinder to apply frameworks
                </Button>
              </Link>
            </div>
          </article>

          {/* Article 3 */}
          <article className="border-b pb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">How to Prep for a PM Interview in 7 Days</h2>
            <p className="text-muted-foreground mb-6">
              Short on time before your PM interview? Follow this 7-day crash course to prepare for success with the help of PM-Pathfinder.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">Intro</h3>
            <p className="mb-4">Got a product management interview coming up in less than a week? Don't panic — here's a proven 7-day plan to get you ready, fast. This plan combines focused prep with targeted AI-powered practice using PM-Pathfinder.</p>

            <h3 className="text-xl font-semibold mt-6 mb-3">Day-by-Day Plan</h3>
            <ul className="space-y-4 mb-6">
              <li className="flex gap-3">
                <span className="font-bold">Day 1:</span> 
                <span>Research the company, its product, and its roadmap.</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold">Day 2:</span> 
                <span>Review your resume and align your stories with PM responsibilities.</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold">Day 3:</span> 
                <span>Practice behavioral questions using the STAR method.</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold">Day 4:</span> 
                <span>Dive into product design and strategy questions.</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold">Day 5:</span> 
                <span>Use PM-Pathfinder to simulate real interviews.</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold">Day 6:</span> 
                <span>Mock interview with a friend or coach.</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold">Day 7:</span> 
                <span>Rest, review, and prep your closing questions.</span>
              </li>
            </ul>

            <div className="mt-8">
              <Link to="/signup">
                <Button className="bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700">
                  Start your interview prep today
                </Button>
              </Link>
            </div>
          </article>

          {/* Article 4 */}
          <article className="border-b pb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">AI for Product Managers: 5 Ways to Use It in Your Workflow</h2>
            <p className="text-muted-foreground mb-6">
              Explore how AI tools like PM-Pathfinder are transforming the way product managers research, plan, and execute in 2024.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">Intro</h3>
            <p className="mb-4">AI isn't replacing product managers — it's empowering them. The smartest PMs are now using AI to save time, boost creativity, and improve decision-making. Here are five ways you can start using AI today in your PM workflow.</p>

            <h3 className="text-xl font-semibold mt-6 mb-3">5 Ways to Use AI as a PM</h3>
            <ol className="list-decimal pl-5 space-y-3 mb-6">
              <li>
                <span className="font-semibold">Summarize Customer Feedback:</span> Extract themes from survey results and app reviews.
              </li>
              <li>
                <span className="font-semibold">Prioritize Ideas with Context:</span> Use frameworks instantly with PM-Pathfinder.
              </li>
              <li>
                <span className="font-semibold">Write Strategy Docs Faster:</span> Use AI to outline PRDs or OKRs.
              </li>
              <li>
                <span className="font-semibold">Prep for Stakeholder Presentations:</span> Get talking points and visuals ideas.
              </li>
              <li>
                <span className="font-semibold">Interview Practice On-Demand:</span> Roleplay tough questions using PM-Pathfinder.
              </li>
            </ol>

            <div className="mt-8">
              <Link to="/resources">
                <Button className="bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700">
                  Explore PM resources
                </Button>
              </Link>
            </div>
          </article>

          {/* Article 5 */}
          <article className="pb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">What Most PMs Get Wrong in Interviews — And How to Fix It</h2>
            <p className="text-muted-foreground mb-6">
              Avoid common PM interview mistakes and learn how to fix them with real-time coaching from PM-Pathfinder.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">Intro</h3>
            <p className="mb-4">Even experienced product managers stumble in interviews. Why? Because they underprepare for behavioral questions, overexplain frameworks, or fail to communicate trade-offs clearly. Here's how to avoid those pitfalls — and how PM-Pathfinder can help.</p>

            <h3 className="text-xl font-semibold mt-6 mb-3">Common Mistakes</h3>
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li>Rambling instead of using a structured story (fix with STAR method)</li>
              <li>Talking about features instead of outcomes</li>
              <li>Missing the "why" behind prioritization decisions</li>
              <li>Lack of stakeholder or cross-functional awareness</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3">How to Fix It</h3>
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li>Get instant feedback on your answers</li>
              <li>Practice tough questions before your next real interview</li>
              <li>Learn to reframe answers around impact and collaboration</li>
            </ul>

            <div className="mt-8">
              <Link to="/chat">
                <Button className="bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700">
                  Practice with PM-Pathfinder
                </Button>
              </Link>
            </div>
          </article>
        </div>
      </div>
    </Dashboard>
  );
};

export default Blog;
