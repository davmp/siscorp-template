import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import type { Page } from "@/types/page";

export default function PageMapCard({ card }: { card: Page }) {
  const navigate = useNavigate();

  return (
    <Card
      className="min-w-max w-full hover:bg-primary-light/5 transition-colors duration-100 ease-in-out cursor-pointer select-none p-5"
      onClick={() =>
        card.path &&
        window.location.pathname !== card.path &&
        navigate(card.path)
      }
    >
      <CardHeader className="p-0 flex items-center">
        <CardTitle className="w-fit flex items-center gap-2">
          <card.icon className="h-7 w-7 text-primary" />
          <span>{card.title}</span>
        </CardTitle>
      </CardHeader>
    </Card>
  );
}
