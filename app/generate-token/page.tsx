"use client";
import React, { useEffect } from "react";
import { environment } from "../enviroment/dev";
import { useParams, usePathname, useRouter } from "next/navigation";
import Button from "../components/button";

const ZendeskTokenGenerator = () => {
  const router = useRouter();
  const path = usePathname();

  const handleAuthorize = () => {
    const authorizationUrl = `https://${
      environment.subdomain
    }.zendesk.com/oauth/authorizations/new?response_type=token&client_id=${
      environment.client_id
    }&scope=read%20write&redirect_uri=${encodeURIComponent(
      environment.redirect_uri
    )}
    `;

    router.push(authorizationUrl);
  };

  const parseAccessToken = (e: Event) => {
    e.preventDefault();
    const url = new URL(`http://localhost:3000${path}`);
    console.log(url);

    const accessToken = url.hash.split("&")[0].split("=")[1];
    console.log(accessToken);
    if (accessToken) {
      localStorage.setItem("accessToken", accessToken);
      router.push("/");
    }
  };

  return (
    <div className="bg-white w-full p-16 min-h-full">
      <Button
        buttonTitle="Generate Access Token"
        onClick={(e) => handleAuthorize(e)}
      />
    </div>
  );
};

export default ZendeskTokenGenerator;
