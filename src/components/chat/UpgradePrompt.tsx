
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface UpgradePromptProps {
  planId?: string;
  setShowPaywall: (show: boolean) => void;
}

const UpgradePrompt = ({ planId, setShowPaywall }: UpgradePromptProps) => {
  const navigate = useNavigate();

  if (planId === 'free' || planId === 'starter') {
    return (
      <div className="text-center mt-8">
        <h2 className="text-lg font-semibold mb-3">Upgrade to Premium Coaching</h2>
        <p className="text-muted-foreground text-sm mb-5 max-w-xs mx-auto">
          Get unlimited coaching sessions and exclusive PM resources
        </p>
        <Button
          size="lg"
          onClick={() => setShowPaywall(true)}
          className="bg-purple-600 hover:bg-purple-700"
        >
          Unlock Premium Coaching
        </Button>
      </div>
    );
  }

  if (planId === 'popular') {
    return (
      <div className="text-center mt-8">
        <h2 className="text-lg font-semibold mb-3">Upgrade to Pro Coaching</h2>
        <p className="text-muted-foreground text-sm mb-5 max-w-xs mx-auto">
          Get 1-on-1 PM coaching calls and personalized resume reviews
        </p>
        <Button
          size="lg"
          onClick={() => navigate('/pricing')}
          className="bg-amber-600 hover:bg-amber-700"
        >
          Upgrade to Pro
        </Button>
      </div>
    );
  }

  return null;
};

export default UpgradePrompt;
