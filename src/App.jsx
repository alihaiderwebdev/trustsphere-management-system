import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Donations from "./pages/Donations";
import Beneficiaries from "./pages/Beneficiaries";
import Events from "./pages/Events";
import Search from "./pages/Search";
import Settings from "./pages/Settings";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/donations" element={<Donations />} />
        <Route path="/beneficiaries" element={<Beneficiaries />} />
        <Route path="/events" element={<Events />} />
        <Route path="/search" element={<Search />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;git add .