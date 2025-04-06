
import { 
  Rocket, 
  Flame, 
  Briefcase 
} from "lucide-react";
import { PlanType } from "@/components/subscription/PlanCard";

export const subscriptionPlans: PlanType[] = [
  {
    id: "starter",
    name: "Career Starter Pack",
    description: "Interview Prep",
    price: "$29",
    period: "/month",
    icon: Rocket,
    priceId: "prod_RxEyhiWdXOWnUk",
    features: [
      "🎁 2 Free Sessions",
      "50 PM Power Hours",
      "Interview preparation toolkit",
      "Basic career guidance"
    ],
    highlight: false,
    color: "bg-blue-50 dark:bg-blue-950",
    borderColor: "border-blue-200 dark:border-blue-800",
    buttonVariant: "outline"
  },
  {
    id: "popular",
    name: "Execution Pack",
    description: "Best Value",
    price: "$99",
    period: " one-time",
    icon: Flame,
    priceId: "prod_Rxhow56qBX4uRZ",
    features: [
      "🎁 5 Free Sessions",
      "Unlimited PM Power Hours",
      "Roadmaps & backlogs templates",
      "Strategy frameworks library",
      "Resume & interview coaching"
    ],
    highlight: true,
    color: "bg-purple-50 dark:bg-purple-950",
    borderColor: "border-purple-300 dark:border-purple-800",
    buttonVariant: "default"
  },
  {
    id: "pro",
    name: "PM360 Pack",
    description: "Everything Bundled",
    price: "$249",
    period: " one-time",
    icon: Briefcase,
    priceId: "prod_Rxhqlof4dblRZT",
    features: [
      "🎁 10 Free Sessions",
      "Everything in Execution Pack",
      "1-on-1 PM coaching call",
      "Personalized resume review",
      "Full product toolkit access"
    ],
    highlight: false,
    color: "bg-amber-50 dark:bg-amber-950",
    borderColor: "border-amber-200 dark:border-amber-800",
    buttonVariant: "outline"
  },
  {
    id: "single",
    name: "Single Session",
    description: "Low-risk Entry",
    price: "$10",
    period: " one-time",
    icon: Rocket,
    priceId: "prod_SingleSession",
    features: [
      "1 PM Power Hour",
      "Basic question assistance",
      "Try before you buy"
    ],
    highlight: false,
    color: "bg-green-50 dark:bg-green-950",
    borderColor: "border-green-200 dark:border-green-800",
    buttonVariant: "outline"
  }
];
