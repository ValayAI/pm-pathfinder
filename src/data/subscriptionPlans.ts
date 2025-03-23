
import { 
  Rocket, 
  Flame, 
  Briefcase 
} from "lucide-react";
import { PlanType } from "@/components/subscription/PlanCard";

export const subscriptionPlans: PlanType[] = [
  {
    id: "starter",
    name: "Starter",
    description: "Basic",
    price: "$29",
    period: "/month",
    icon: Rocket,
    priceId: "prod_RxEyhiWdXOWnUk",
    features: [
      "50 messages/month",
      "PM career & interview tips"
    ],
    highlight: false,
    color: "bg-blue-50 dark:bg-blue-950",
    borderColor: "border-blue-200 dark:border-blue-800",
    buttonVariant: "outline"
  },
  {
    id: "popular",
    name: "Most Popular",
    description: "Best Value",
    price: "$99",
    period: " one-time",
    icon: Flame,
    priceId: "prod_Rxhow56qBX4uRZ",
    features: [
      "Unlimited messages",
      "Resume & interview coaching",
      "Frameworks & strategy guides",
      "Exclusive PM resources"
    ],
    highlight: true,
    color: "bg-purple-50 dark:bg-purple-950",
    borderColor: "border-purple-300 dark:border-purple-800",
    buttonVariant: "default"
  },
  {
    id: "pro",
    name: "Pro Coaching",
    description: "Premium",
    price: "$249",
    period: " one-time",
    icon: Briefcase,
    priceId: "prod_Rxhqlof4dblRZT",
    features: [
      "Everything in Most Popular",
      "1-on-1 PM coaching call",
      "Personalized resume review"
    ],
    highlight: false,
    color: "bg-amber-50 dark:bg-amber-950",
    borderColor: "border-amber-200 dark:border-amber-800",
    buttonVariant: "outline"
  }
];
