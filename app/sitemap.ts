import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://redcrescentinstitute.com",
      lastModified: new Date(),
    },
    {
      url: "https://redcrescentinstitute.com/about",
      lastModified: new Date(),
    },
    {
      url: "https://redcrescentinstitute.com/courses",
      lastModified: new Date(),
    },
    {
      url: "https://redcrescentinstitute.com/contact",
      lastModified: new Date(),
    },
  ];
}