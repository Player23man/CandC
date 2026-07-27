import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const siteUrl = "https://www.ccdetailingllc.com";
const socialImageUrl = `${siteUrl}/images/cc-detailing-social-preview.jpg`;

const routeMeta: Record<string, { title: string; description: string }> = {
  "/": {
    title: "C&C Detailing | Channahon, Illinois",
    description: "C&C Detailing provides shop and mobile auto detailing, paint correction, ceramic coating, and marine detailing in Channahon, Illinois."
  },
  "/portfolio": {
    title: "Auto Detailing Portfolio | C&C Detailing",
    description: "See C&C Detailing transformations, finished vehicles, interior detailing, paint correction, and ceramic coating work from Channahon, Illinois."
  },
  "/contact": {
    title: "Request an Auto Detailing Quote | C&C Detailing",
    description: "Request a quote for shop or mobile auto detailing, paint correction, ceramic coating, or marine detailing from C&C Detailing in Channahon, Illinois."
  }
};

function upsertMeta(name: string, content: string) {
  let element = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.name = name;
    document.head.appendChild(element);
  }
  element.content = content;
}

function upsertProperty(property: string, content: string) {
  let element = document.querySelector<HTMLMetaElement>(`meta[property="${property}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute("property", property);
    document.head.appendChild(element);
  }
  element.content = content;
}

export function RouteMeta() {
  const { pathname } = useLocation();

  useEffect(() => {
    const meta = routeMeta[pathname] ?? routeMeta["/"];
    const canonicalUrl = `${siteUrl}${pathname === "/" ? "" : pathname}`;

    document.title = meta.title;
    upsertMeta("description", meta.description);
    upsertProperty("og:title", meta.title);
    upsertProperty("og:description", meta.description);
    upsertProperty("og:url", canonicalUrl);
    upsertProperty("og:image", socialImageUrl);
    upsertMeta("twitter:title", meta.title);
    upsertMeta("twitter:description", meta.description);
    upsertMeta("twitter:image", socialImageUrl);

    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;
  }, [pathname]);

  return null;
}
