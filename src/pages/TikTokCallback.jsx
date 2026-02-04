// step - 3 (OAuth Callback Handler)

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { exchangeCodeForTokenMock } from "../api/tiktokOAuth";
import { mapTikTokError } from "../utils/errorMapper";

export default function TikTokCallback({ setGlobalError }) {
  const navigate = useNavigate();

  useEffect(() => {
    // For HashRouter on GitHub Pages, query params are in the hash
    // Format: /#/auth/tiktok/callback/?code=xyz&state=abc
    
    let params;
    
    // First try window.location.search (traditional routing)
    if (window.location.search) {
      params = new URLSearchParams(window.location.search);
    } else {
      // Fall back to parsing from hash for HashRouter
      const hash = window.location.hash;
      const searchIndex = hash.indexOf("?");
      if (searchIndex !== -1) {
        params = new URLSearchParams(hash.substring(searchIndex));
      } else {
        params = new URLSearchParams();
      }
    }

    const code = params.get("code");
    const errorParam = params.get("error");

    // Only REAL TikTok error
    if (errorParam) {
      setGlobalError(mapTikTokError(errorParam));
      navigate("/");
      return;
    }

    // If code missing, STOP but don''t redirect immediately
    if (!code) {
      console.warn("OAuth callback loaded without code", {
        hash: window.location.hash,
        search: window.location.search,
        params: Object.fromEntries(params)
      });
      return;
    }

    // Mock exchange
    const data = exchangeCodeForTokenMock(code);

    if (data.error) {
      setGlobalError(mapTikTokError(data.error));
      navigate("/");
      return;
    }

    // SUCCESS
    localStorage.setItem("tt_access_token", data.access_token);
    navigate("/create-ad");
  }, [navigate, setGlobalError]);

  return <p>Connecting your TikTok account</p>;
}
