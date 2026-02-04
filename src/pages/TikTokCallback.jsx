// step - 3 (OAuth Callback Handler)

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { exchangeCodeForTokenMock } from "../api/tiktokOAuth";
import { mapTikTokError } from "../utils/errorMapper";

export default function TikTokCallback({ setGlobalError }) {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    const state = params.get("state");
    const errorParam = params.get("error");

    const savedState = localStorage.getItem("tt_state");

    // TikTok returned an OAuth error (user denied, invalid scope, etc.)
    if (errorParam) {
      setGlobalError(mapTikTokError(errorParam));
      navigate("/");
      return;
    }

    // No authorization code = login failed
    if (!code) {
      setGlobalError("Login failed. Please try again.");
      navigate("/");
      return;
    }

    // State mismatch (ignored for static hosting demo)
    if (state !== savedState) {
      console.warn("OAuth state mismatch (ignored for demo)");
    }

    // Mock token exchange (assignment scope)
    const data = exchangeCodeForTokenMock(code);

    if (data.error) {
      setGlobalError(mapTikTokError(data.error));
      navigate("/");
      return;
    }

    // Success
    localStorage.setItem("tt_access_token", data.access_token);
    navigate("/create-ad");
  }, [navigate, setGlobalError]);

  return <p>Connecting your TikTok account…</p>;
}
