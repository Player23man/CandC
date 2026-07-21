import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { HomePage } from "../pages/HomePage";
import { PortfolioPage } from "../pages/PortfolioPage";

const PlaceholderPage = ({ heading }: { heading: string }) => (
  <main>
    <h1>{heading}</h1>
  </main>
);

export function AppRoutes() {
  return (
    <>
      <SiteHeader />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/contact" element={<PlaceholderPage heading="Let’s talk about your vehicle." />} />
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
