// App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Navigation from "./pages/Navigation";
import Order from "./pages/Order";
import Menu from "./pages/Menu";
import Admin from "./pages/Admin";
import Contact from "./pages/Contact";
import TrackOrder from "./pages/TrackOrder";
import AdminOrders from "./pages/AdminOrders";
import AdminMenu from "./pages/AdminMenu";
function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/about" element={<About />} />
        <Route path="/order" element={<Order />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/trackOrder" element={<TrackOrder />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/orders" element={<AdminOrders />} />
        <Route path="/admin/menu" element={<AdminMenu />} />
      </Routes>
    </Router>
  );
}

export default App;
