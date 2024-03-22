"use client";
import React, { useEffect } from "react";
import { environment } from "../enviroment/dev";
import { useParams } from "next/navigation";

const ZendeskTokenGenerator = () => {
  const router = useParams();

  const handleAuthorize = () => {
    const authorizationUrl = `https://${
      environment.subdomain
    }.zendesk.com/oauth/authorizations/new?response_type=token&client_id=${
      environment.client_id
    }&scope=read%20write&redirect_uri=${encodeURIComponent(
      environment.redirect_uri
    )}
    `;

    window.open(authorizationUrl, "_blank");
  };

  const parseAccessToken = () => {
    const url = new URL(window.location.href);
    console.log(url);

    const accessToken = url.hash.split("&")[0].split("=")[1];
    console.log(accessToken);
    if (accessToken) {
      localStorage.setItem("accessToken", accessToken);
      window.location.href = "/";
    }
  };

  useEffect(() => {
    parseAccessToken();
  }, []);

  return (
    <div className="bg-white w-full text-primaryColor p-16">
      <button
        className="border border-primaryColor p-4 rounded shadow-md hover:bg-primaryColor hover:text-white"
        onClick={handleAuthorize}
      >
        Generate Access Token
      </button>
    </div>
  );
};

export default ZendeskTokenGenerator;
