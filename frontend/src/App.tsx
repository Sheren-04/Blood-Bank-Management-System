import { Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from './components/ProtectedRoute';

// Public Pages
import Home from './pages/Home';
import About from './pages/About';
import WhyDonate from './pages/WhyDonate';
import BecomeDonor from './pages/BecomeDonor';
import NeedBlood from './pages/NeedBlood';
import ContactUs from './pages/ContactUs';

// Admin Pages
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import DonorsManagement from './pages/DonorsManagement';
import BloodRequestManagement from './pages/BloodRequestsManagement';
import ContactQueriesManagement from './pages/ContactQueriesManagement';
import InventoryManagement from './pages/InventoryManagement';
import ChangePassword from './pages/ChangePassword';

//scroll to top on route change
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
      <>
      <ScrollToTop />
      <Routes>
        {/* HOME */}
        <Route path="/" element={<Home />} />

        {/* ========== PUBLIC ROUTES ========== */}
        <Route path="/about" element={<About />} />
        <Route path="/why-donate" element={<WhyDonate />} />
        <Route path="/become-donor" element={<BecomeDonor />} />
        <Route path="/need-blood" element={<NeedBlood />} />
        <Route path="/contact" element={<ContactUs />} />

        {/* ========== ADMIN LOGIN (PUBLIC) ========== */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* ========== ADMIN PROTECTED ROUTES ========== */}
        <Route 
          path="/admin/dashboard" 
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/admin/donors" 
          element={
            <ProtectedRoute>
              <DonorsManagement />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/admin/requests" 
          element={
            <ProtectedRoute>
              <BloodRequestManagement />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/admin/queries" 
          element={
            <ProtectedRoute>
              <ContactQueriesManagement />
            </ProtectedRoute>
          } 
        /> 
        
        <Route 
          path="/admin/inventory" 
          element={
            <ProtectedRoute>
              <InventoryManagement />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/admin/change-password" 
          element={
            <ProtectedRoute>
              <ChangePassword />
            </ProtectedRoute>
          } 
        />
      </Routes>
      </>
  );
}

export default App;