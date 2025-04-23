import {
  Card as CardBase,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Page } from "@/types/page";
import { useNavigate } from "react-router-dom";

export default function Card({ card }: { card: Page }) {
  const navigate = useNavigate();

  return (
    <CardBase
      className="w-full hover:bg-primary-light/5 transition-colors duration-100 ease-in-out cursor-pointer select-none"
      onClick={() =>
        card.path &&
        window.location.pathname !== card.path &&
        navigate(card.path)
      }
    >
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <card.icon className="h-10 w-10 text-primary" />
        </CardTitle>
      </CardHeader>
      <CardContent className="pointer-events-none">
        <CardTitle className="text-foreground">{card.title}</CardTitle>
        <CardDescription className="pt-1">{card.description}</CardDescription>
      </CardContent>
    </CardBase>
  );
}
