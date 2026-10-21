import { Route, Routes } from "react-router-dom";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import Hero from "../components/Hero.jsx";
import LandingPage from "../pages/landingpage.jsx";
import FormLoginUser from "../pages/user/formLoginUser.jsx";
import FormPostUser from "../pages/user/formPostUser.jsx";
import FormPutUser from "../pages/user/formPutUser.jsx";
import FormPostRequisition from "../pages/requisition/formPostRequisition.jsx";
import FormPutRequisition from "../pages/requisition/formPutRequisition.jsx";
import RequisitionView from "../pages/requisition/requisitionView.jsx";

function App() {
  return (
    <div className="min-h-screen bg-orange-50 text-stone-900">
      <Header />
      <main className="mx-auto max-w-xl px-6 py-12">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/user/login" element={<FormLoginUser />} />
          <Route path="/user/register" element={<FormPostUser />} />
          <Route path="/user/update/:id" element={<FormPutUser />} />
          <Route path="/requisition" element={<Hero />} />
          <Route path="/requisition/create" element={<FormPostRequisition />} />
          <Route path="/requisition/edit/:id" element={<FormPutRequisition />} />
          <Route path="/requisition/:id" element={<RequisitionView />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
