import {
  Card as CardBase,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "siscorp-ui";
import { useNavigate } from "@tanstack/react-router";
import type { Page } from "types/page.type";

const Card = ({ page }: { page: Page }) => {
  const navigate = useNavigate();

  return (
    <CardBase
      className="w-full hover:bg-primary-light/5 transition-colors duration-100 ease-in-out cursor-pointer select-none"
      onClick={() =>
        page.path &&
        window.location.pathname !== page.path &&
        navigate({ to: page.path })
      }
    >
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <page.icon className="h-10 w-10 text-primary" />
        </CardTitle>
      </CardHeader>
      <CardContent className="pointer-events-none">
        <CardTitle className="text-foreground">{page.title}</CardTitle>
        <CardDescription className="pt-1">{page.description}</CardDescription>
      </CardContent>
    </CardBase>
  );
};

export { Card };
