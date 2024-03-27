"use client";
import React, { useEffect } from "react";
import { environment } from "../enviroment/dev";
import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";
import Button from "../components/button";

const ZendeskTokenGenerator = () => {
  const router = useRouter();
  const path = usePathname();
  const searchPath = Link;

  const handleAuthorize = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
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

  const parseAccessToken = () => {
    const url = new URL(window.location.href);
    console.log(window.location);

    const accessToken = url.hash.split("&")[0].split("=")[1];
    console.log(accessToken);
    if (accessToken) {
      localStorage.setItem("accessToken", accessToken);
      router.push("/");
    }
  };

  useEffect(() => {
    parseAccessToken();
  }, []);

  return (
    <div className="bg-white w-full p-16 min-h-full">
      <div onClick={(e) => handleAuthorize(e)}>
        <Button buttonTitle="Generate Access Token" />
      </div>
    </div>
  );
};

export default ZendeskTokenGenerator;
