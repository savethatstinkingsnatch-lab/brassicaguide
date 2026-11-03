import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/print")({ component: PrintRedirect });

function PrintRedirect() {
  useEffect(() => {
    window.location.replace("/download");
  }, []);
  return (
    <p className="bg-cloth px-6 py-10 text-paper">
      <a className="underline" href="/download">
        Continue to the download
      </a>
    </p>
  );
}
