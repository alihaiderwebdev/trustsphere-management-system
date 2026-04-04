import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Donations from "./pages/Donations";
import Beneficiaries from "./pages/Beneficiaries";
import Events from "./pages/Events";
import Search from "./pages/Search";
import Settings from "./pages/Settings";
import Layout from "./components/Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route
          path="/dashboard"
          element={
            <Layout>
              <Dashboard />
            </Layout>
          }
        />
        <Route
          path="/donations"
          element={
            <Layout>
              <Donations />
            </Layout>
          }
        />
        <Route
          path="/beneficiaries"
          element={
            <Layout>
              <Beneficiaries />
            </Layout>
          }
        />
        <Route
          path="/events"
          element={
            <Layout>
              <Events />
            </Layout>
          }
        />
        <Route
          path="/search"
          element={
            <Layout>
              <Search />
            </Layout>
          }
        />
        <Route
          path="/settings"
          element={
            <Layout>
              <Settings />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;