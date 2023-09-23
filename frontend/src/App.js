import "./App.css";
// import LoyalityDash from "./screens/LoyalityDash";
// import CustomerRegisterForm from "./components/CustomerRegisterForm.js";
// import AddProduct from "./components/Concession Management/Product";
// import Addstock from "./components/Concession Management/Stock";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ConcessionManagement from "./components/ConcessionManagement/ConcessionManagement";
import ProductList from "./components/ConcessionManagement/components/ProductList/ProductList";
import StockList from "./components/ConcessionManagement/components/StockList/StockList";
import SupplierList from "./components/ConcessionManagement/components/SupplierList/SupplierList";
import Dashboard from "./components/Dashboard/Dashboard";
import MainLayout from "./components/MainLayout/MainLayout";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="concession" element={<ConcessionManagement />}>
            <Route path="supplier_list" element={<SupplierList />} />
            <Route path="product_list" element={<ProductList />} />
            <Route path="stock_list" element={<StockList />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );

  // return (
  //   <Router> {/* routeer */}
  //     <Routes> {/* stop redirect if path found */}
  //       <Route path="/loyality/dashboard" element={<LoyalityDash/>} exact/>
  //         {/* <LoyalityDash  />
  //       </Route> */}
  //       <Route path="/register" element={<CustomerRegisterForm/>} exact/>
  //         {/* <CustomerRegisterForm />
  //       </Route> */}
  //         <Route path="/product/addProduct" element={<AddProduct/>} exact/>

  //         <Route path="/stock/addStock" element={<Addstock/>} exact/>
  //       {/* <Redirect to="/" /> */}
  //     </Routes>
  //   </Router>
  // );
}

export default App;
