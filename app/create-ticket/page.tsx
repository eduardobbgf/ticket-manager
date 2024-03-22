"use client";
import React, { useState } from "react";
import ConfirmationModal from "../components/confirmation-modal";
import { createTicket } from "../services/create-ticket";
import Button from "../components/button";

const subjects = [
  {
    name: "Orders",
    fields: ["Order number", "Affecting all users?"],
  },
  {
    name: "Payments",
    fields: ["Transaction number", "Transaction status", "Payment Acquirer"],
  },
  {
    name: "Catalog",
    fields: ["SkuId", "Print of the page"],
  },
  {
    name: "Others",
    fields: [],
  },
];

export default function CreateTicket() {
  const [showModal, setShowModal] = useState(false);
  const [ticketId, setTicketId] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    details: {},
    description: "",
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

  const handleSubjectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSubject = e.target.value;
    const selectedSubjectFields =
      subjects.find((subject) => subject.name === selectedSubject)?.fields ||
      [];
    const initialDetailsState = selectedSubjectFields.reduce((acc, field) => {
      acc[field] = "";
      return acc;
    }, {});
    setFormData({
      ...formData,
      subject: selectedSubject,
      details: initialDetailsState,
    });
  };

  const handleDetailsChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      details: {
        ...formData.details,
        [name]: value,
      },
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    createTicket(formData)
      .then((ticket) => {
        console.log("Ticket created:", ticket);
        setTicketId(ticket.id);
        setShowModal(true);
      })
      .catch((error) => {
        console.error("Failed to create ticket:", error.message);
      });
  };

  return (
    <div className="bg-white px-8 py-8 pt-8 h-full w-full">
      <h2 className="text-2xl font-extralight mb-8">Create Ticket</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-gray-700 text-sm font-Light mb-2"
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
            className="block text-gray-700 text-sm font-Light mb-2"
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
            className="block text-gray-700 text-sm font-Light mb-2"
          >
            Subject:
          </label>
          <select
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleSubjectChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="" disabled>
              Select a subject
            </option>
            {subjects.map((subject, index) => (
              <option key={index} value={subject.name}>
                {subject.name}
              </option>
            ))}
          </select>
        </div>
        {formData.subject &&
          subjects
            .find((subject) => subject.name === formData.subject)
            ?.fields.map((field, index) => (
              <div key={index} className="mb-4">
                <label
                  htmlFor={field}
                  className="block text-gray-700 text-sm font-Light mb-2"
                >
                  {field}:
                </label>
                <input
                  type="text"
                  id={field}
                  name={field}
                  value={formData.details[field] || ""}
                  onChange={handleDetailsChange}
                  required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
            ))}
        <div className="mb-6">
          <label
            htmlFor="description"
            className="block text-gray-700 text-sm font-Light mb-2"
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
        <div className="flex items-center justify-center sm:justify-end">
          <Button type="submit" buttonTitle="Create Ticket" />
        </div>
      </form>
      {showModal ? <ConfirmationModal message={ticketId} /> : null}
    </div>
  );
}
