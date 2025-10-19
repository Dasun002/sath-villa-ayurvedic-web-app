import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";

// Pages / Components
import Home from "./Component/Home/Home";
import Ayurveda from "./Component/Ayurveda/Ayurveda";
import Products from "./Component/View Products/Products";
import ProductView from "./Component/View Products/productView";
import AddProduct from "./Component/Add Product/Add_Product";
import UpdateUser from "./Component/Update Product/Update_Product";
import Inquire from "./Component/Inquire/Inquire";
import Reviews from "./Component/Reviews/Reviews";
import InquireReviewsHome from "./Component/Inquries&ReviewsHome/HomeIR";
import About from "./Component/About Us/About";
import Bookings from "./Component/View Bookings/Bookings";
import AddBooking from "./Component/Add Booking/Add_Booking";
import BookingConfirmation from "./Component/BookingConfirmation/BookingConfirmation";
import UpdateBooking from "./Component/Admin/AdminUpdateProduct";
import PaymentSuccess from "./Component/PaymentSuccess/PaymentSuccess";
import PaymentHistory from "./Component/PaymentHistory/PaymentHistory";
import Signin from "./Component/Signin/Signin";
import Signup from "./Component/Signup/Signup";
import Cart from "./Component/Cart/Cart";
import Profile from "./Component/Profile/Profile";
import Notifications from "./Component/Notifications/Notifications";

// Admin Components
import AdminSignin from "./Component/Admin/AdminSignin";
import AdminDashboard from "./Component/Admin/AdminDashboard";
import AdminUpdateProduct from "./Component/Admin/AdminUpdateProduct";
import PaymentManagement from "./Component/Admin/PaymentManagement";
import RefundManagement from "./Component/Admin/RefundManagement";
import IncomeAnalysis from "./Component/Admin/IncomeAnalysis";

function App() {
  return (
    <div>
      <React.Fragment>
        <Routes>
          {/* Public Pages */}
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/ayurveda" element={<Ayurveda />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/bookings/:id" element={<UpdateBooking />} />
          <Route path="/add_booking" element={<AddBooking />} />
          <Route path="/add-booking" element={<AddBooking />} />
          <Route path="/booking-confirmation" element={<BookingConfirmation />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/payment-history" element={<PaymentHistory />} />
          <Route path="/payments" element={<PaymentHistory />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product-view/:id" element={<ProductView />} />
          <Route path="/products/:id" element={<UpdateUser />} />
          <Route path="/add_product" element={<AddProduct />} />
          <Route path="/inquire" element={<Inquire />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/inquire&reviewshome" element={<InquireReviewsHome />} />
          <Route path="/about" element={<About />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/notifications" element={<Notifications />} />

          {/* Admin Pages */}
          <Route path="/admin-signin" element={<AdminSignin />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/admin/products/update/:id" element={<AdminUpdateProduct />} />
          <Route path="/admin/payment-management" element={<PaymentManagement />} />
          <Route path="/admin/refund-management" element={<RefundManagement />} />
          <Route path="/admin/income-analysis" element={<IncomeAnalysis />} />
        </Routes>
      </React.Fragment>
    </div>
  );
}

export default App;
