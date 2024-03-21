"use client";

import React, { useState } from "react";
import ZendeskService from "../services/create-ticket";
import ConfirmationModal from "../components/confirmation-modal";
import zendeskService from "../services/create-ticket";
const baseUrl = "https://gen1331.zendesk.com/api/v2";
const subdomain = "gen1331";
const user = "eduardo.bbgf@gmail.com/token";
const pwd = "7fV9mKqqc0369Yll4OUKNISD9lPDWlA0DLaOxG5y";

export default function CreateTicket() {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "Teste",
    email: "yop@yopmail.com",
    subject: "Teste",
    description: "TEste",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    zendeskService(subdomain, user, pwd)
      .createTicket(formData)
      .then((ticket) => {
        console.log("Ticket created:", ticket);
        setShowModal(true);
      })
      .catch((error) => {
        console.error("Failed to create ticket:", error.message);
      });
  };

  return (
    <div className="bg-white px-8 py-8 pt-8 h-full w-full">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="subject"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Subject:
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="description"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Detailing:
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          ></textarea>
        </div>
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
        </div>
      </form>
      {showModal ? <ConfirmationModal message={formData.description} /> : <></>}
    </div>
  );
}
