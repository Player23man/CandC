import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { HomePage } from "../pages/HomePage";

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
        <Route path="/portfolio" element={<PlaceholderPage heading="The work." />} />
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
