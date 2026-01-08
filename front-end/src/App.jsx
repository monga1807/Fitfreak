// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Login from "./pages/login";
// import Dashboard from "./pages/dashboard";
// import ProtectedRoute from "./components/protectedRoute";

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/login" element={<Login />} />

//         <Route 
//           path="/" 
//           element={
//             <ProtectedRoute>
//               <Dashboard />
//             </ProtectedRoute>
//           } 
//         />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;

// src/App.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login.jsx";
import Register from "./pages/register.jsx";
import Dashboard from "./pages/dashboard.jsx";
import ProtectedRoute from "./components/protectedRoute.jsx";
import HabitsPage from "./pages/habits.jsx";
import JournalPage from "./pages/journal.jsx";
import FitnessPage from "./pages/fitness.jsx";
import Layout from "./components/layout.jsx";
import AnalyticsPage from "./pages/analytics.jsx";






function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout>
            <Dashboard />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
  path="/journal"
  element={
    <ProtectedRoute>
      <Layout>
      <JournalPage />
      </Layout>
    </ProtectedRoute>
  }
/>
<Route
  path="/fitness"
  element={
    <ProtectedRoute>
      <Layout>
      <FitnessPage />
      </Layout>
    </ProtectedRoute>
  }
/>

<Route
  path="/analytics"
  element={
    <ProtectedRoute>
      <Layout>
        <AnalyticsPage />
      </Layout>
    </ProtectedRoute>
  }
/>


// inside Routes alongside other routes:
      <Route
       path="/habits"
        element={
        <ProtectedRoute>
          <Layout>
        <HabitsPage />
        </Layout>
        </ProtectedRoute>} />

      {/* fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;

