import { BrowserRouter, Route, Routes } from "react-router-dom";

const PlaceholderPage = ({ heading }: { heading: string }) => (
  <main>
    <h1>{heading}</h1>
  </main>
);

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<PlaceholderPage heading="Finished with intent." />} />
      <Route path="/portfolio" element={<PlaceholderPage heading="The work." />} />
      <Route path="/contact" element={<PlaceholderPage heading="Let’s talk about your vehicle." />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
