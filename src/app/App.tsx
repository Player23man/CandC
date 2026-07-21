import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { RouteMeta } from "../components/RouteMeta";
import { ContactPage } from "../pages/ContactPage";
import { HomePage } from "../pages/HomePage";
import { PortfolioPage } from "../pages/PortfolioPage";

export function AppRoutes() {
  return (
    <>
      <RouteMeta />
      <SiteHeader />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
      <SiteFooter />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
