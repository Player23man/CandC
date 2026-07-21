import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const siteUrl = "https://www.ccdetailingllc.com";

const routeMeta: Record<string, { title: string; description: string }> = {
  "/": {
    title: "C&C Detailing | Channahon, Illinois",
    description: "Shop and mobile auto detailing, paint correction, and ceramic coating by appointment in Channahon, Illinois."
  },
  "/portfolio": {
    title: "Portfolio | C&C Detailing",
    description: "See vehicle detailing finishes, exterior work, paint correction, and ceramic coating from C&C Detailing."
  },
  "/contact": {
    title: "Request a Quote | C&C Detailing",
    description: "Request a vehicle detailing quote or contact C&C Detailing for shop and mobile service around Channahon, Illinois."
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
