import Header from "../components/Header.jsx";
import Hero from "../components/Hero.jsx";
import Footer from "../components/Footer.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/requisition/edit/:id" element={<RequisitionEdit />} />
        <Route path="/requisition/:id" element={<RequisitionView />} />
        <Route path="/requisition/create" element={<RequisitionCreate />} />
        <Route path="/requisition/delete/:id" element={<RequisitionDelete />} />
        <Route path="/requisition/list" element={<RequisitionList />} />
        <Route path="/requisition/view/:id" element={<RequisitionView />} />
        <Route path="/requisition/create" element={<RequisitionCreate />} />
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/user/register" element={<UserRegister />} />
        <Route path="/user/logout" element={<UserLogout />} />/
        <Route path="/user/update/:id" element={<UserUpdate />} />
      </Routes>
      <Header />
      <main>
        <Hero />
      </main>
      <Footer />
    </>
  );
}

export default App;
