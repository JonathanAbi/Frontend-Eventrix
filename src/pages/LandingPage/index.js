import React from "react";
import { useSelector } from "react-redux";

export default function LandingPage() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  return <div>Welcome {isAuthenticated && user.name}</div>;
}
