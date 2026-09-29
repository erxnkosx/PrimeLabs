import type { MetadataRoute } from "next";
import { company } from "@/config/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: company.name,
    short_name: company.shortName,
    description: company.description,
    lang: company.language,
    start_url: "/",
    display: "browser",
    background_color: "#ffffff",
    theme_color: company.themeColor,
    icons: [
      { src: "/icon.png", sizes: "512x512", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
