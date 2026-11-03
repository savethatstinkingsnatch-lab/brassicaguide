import { createFileRoute } from "@tanstack/react-router";
import { BookView } from "@/components/book-view";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return <BookView />;
}
