import { createRoot } from "react-dom/client";
import { BookView } from "@/components/book-view";
import { registerArt } from "@/lib/art-src";
import { offlineArt } from "./art";
import "../styles.css";
import "./fonts.css";

registerArt(offlineArt);

const root = document.getElementById("root");
if (root) createRoot(root).render(<BookView offline />);
