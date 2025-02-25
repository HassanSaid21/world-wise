import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
//import { useEffect, useState } from "react";

// import Product from "./pages/Product";
// import Pricing from "./pages/Pricing";
// import HomePage from "./pages/Homepage";
// import PageNotFound from "./pages/PageNotFound";
// import Login from "./pages/Login";
// import AppLayout from "./pages/AppLayout";

import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";
import { CitiesProvider } from "../contexts/CitiesContext";
import { AuthProvider } from "../contexts/FakeAuthContext";
import ProtectedRoutes from "./pages/ProtectedRoutes";
import { lazy, Suspense } from "react";
import SpinnerFullPage from "./components/SpinnerFullPage";


const HomePage  =  lazy(() => import('./pages/Homepage'))
const Login =  lazy(() => import('./pages/Login'))
const Product  =  lazy(() => import('./pages/Product'))
const Pricing  =  lazy(() => import('./pages/Pricing'))
const AppLayout  =  lazy(() => import('./pages/AppLayout'))
const PageNotFound  =  lazy(() => import('./pages/PAgeNotFound'))


// dist/index.html                   0.45 kB │ gzip:   0.29 kB
// dist/assets/index-2eded197.css   30.35 kB │ gzip:   5.11 kB
// dist/assets/index-8ab64414.js   510.72 kB │ gzip: 149.34 kB
function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter
          future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
        >
          <Suspense fallback={<SpinnerFullPage/>}>
          <Routes>
            <Route index element={<HomePage />} />
            <Route path="product" element={<Product />} />
            <Route path="pricing" element={<Pricing />} />
            <Route path="login" element={<Login />} />

            <Route
              path="app"
              element={
                <ProtectedRoutes>
                  <AppLayout />
                </ProtectedRoutes>
              }
            >
              <Route index element={<Navigate replace to="cities" />} />
              <Route path="cities" element={<CityList />} />
              <Route path="cities/:id" element={<City />} />

              <Route path="countries" element={<CountryList />} />

              <Route path="form" element={<Form />} />
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes></Suspense>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
}

export default App;
