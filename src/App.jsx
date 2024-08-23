import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

const Layout = lazy(() => import("./components/Layout.jsx"));
const Chat = lazy(() => import("./components/Chat.jsx"));

export const App = () => {
  return (
    <Suspense fallback={<>Loading...</>}>
      <Routes>
        <Route path="/chat" element={<Layout />}>
          <Route index element={<div>Select a chat from the list</div>} />
          <Route path=":id" element={<Chat />} />
        </Route>
        <Route path="*" element={<Navigate to="/chat" />} />
      </Routes>
    </Suspense>
  );
};
