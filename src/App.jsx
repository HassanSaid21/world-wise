import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
//import { useEffect, useState } from "react";

import Product from "./pages/Product";
import Pricing from "./pages/Pricing";

import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/Login";
import AppLayout from "./pages/AppLayout";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";
import { CitiesProvider } from "../contexts/CitiesContext";
import HomePage from "./pages/Homepage";
import { AuthProvider } from "../contexts/FakeAuthContext";
import ProtectedRoutes from "./pages/ProtectedRoutes";


function App() {
  return (
    <AuthProvider>
    <CitiesProvider>
      <BrowserRouter
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
        >
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="product" element={<Product />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="login" element={<Login />} />
          
          <Route path="app" element={<ProtectedRoutes><AppLayout /></ProtectedRoutes>}>
            <Route index element={<Navigate replace to="cities" />} />
            <Route path="cities" element={<CityList />} />
            <Route path="cities/:id" element={<City />} />

            <Route path="countries" element={<CountryList />} />

            <Route path="form" element={<Form />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </CitiesProvider></AuthProvider>

  );
}

export default App;
