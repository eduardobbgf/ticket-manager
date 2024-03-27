"use client";
import React, { DetailedHTMLProps, RefObject, useRef, useState } from "react";
import ConfirmationModal from "../components/confirmation-modal";
import { createTicket } from "../services/create-ticket";
import Button from "../components/button";
import { Ticket } from "@/app/entities/Ticket";
import { uploadImage } from "../services/upload-image";

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
  const formRef = useRef() as RefObject<HTMLFormElement>;
  const [selectedSubject, setSelectedSubject] = useState("Orders");
  const [showModal, setShowModal] = useState(false);
  const [ticketId, setTicketId] = useState("");

  async function formAction(formData: FormData) {
    const selectedSubject = formData.get("subject");
    const ticketForm = {
      name: formData.get("name"),
      email: formData.get("email"),
      subject: selectedSubject,
      description: "",
      comment: { body: "", uploads: [] as Array<string> },
      custom_fields: [{} as Object],
    };

    if (selectedSubject === "Orders") {
      const orderNumber = formData.get("order_number");
      const affectAll = formData.get("affect_all") ? true : false;

      ticketForm.custom_fields = [
        {
          id: 24204825475355,
          value: orderNumber,
        },
        {
          id: 24204867136283,
          value: affectAll,
        },
      ];
    } else if (selectedSubject === "Payments") {
      const transactionNumber = formData.get("transaction_number");
      const transactionStatus = formData.get("transaction_status");
      const paymentAcquirer = formData.get("payment_acquirer");

      ticketForm.custom_fields = [
        {
          id: 24204888362267,
          value: transactionNumber,
        },
        {
          id: 24204944240155,
          value: transactionStatus,
        },
        {
          id: 24204947484315,
          value: paymentAcquirer,
        },
      ];
    } else if (selectedSubject === "Catalog") {
      const skuId = formData.get("sku_id");
      ticketForm.custom_fields = [
        {
          id: 24204981722395,
          value: skuId,
        },
      ];

      const printPage = formData.get("print_page") as File;
      const response = await uploadImage(printPage);
      ticketForm.comment.uploads.push(response.upload.token);
    }

    ticketForm.comment.body = formData.get("description") as string;
    ticketForm.description = formData.get("description") as string;

    setShowModal(false);
    createTicket(ticketForm)
      .then((ticket: Ticket) => {
        console.log("Ticket created:", ticket);
        setTicketId(ticket.id || "");
        setShowModal(true);
      })
      .catch((error) => {
        console.error("Failed to create ticket:", error.message);
      });
  }

  const handleChangeSubject = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    setSelectedSubject(e.target.value);
  };

  return (
    <div className="bg-white px-8 py-8 pt-8 min-h-full w-full min-h-auto">
      <h2 className="text-2xl font-extralight mb-8">Create Ticket</h2>
      <form
        action={formAction}
        ref={formRef || undefined}
        className="flex flex-row flex-wrap"
      >
        <div className="mb-2 p-1 w-full sm:w-1/2">
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
            placeholder="John Doe"
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-2 p-1 w-full sm:w-1/2">
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
            placeholder="john.doe@company.com"
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-2 p-1 w-full">
          <label
            htmlFor="subject"
            className="block text-gray-700 text-sm font-Light mb-2 w-full"
          >
            Subject:
          </label>
          <select
            id="subject"
            name="subject"
            onChange={(e) => handleChangeSubject(e)}
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
        {selectedSubject === "Orders" && (
          <>
            <div className="mb-2 p-1 w-full sm:w-1/2">
              <label
                htmlFor="order_number"
                className="block text-gray-700 text-sm font-Light mb-2"
              >
                Order Number:
              </label>
              <input
                type="number"
                id="order_number"
                name="order_number"
                placeholder="# 1234"
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-2 p-1 w-full sm:w-1/2">
              <label
                htmlFor="affect_all"
                className="block text-gray-700 text-sm font-Light mb-2"
              >
                Affecting all users:
              </label>
              <input
                type="checkbox"
                id="affect_all"
                name="affect_all"
                className="mt-[0.75rem] mr-2 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-neutral-300 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-100 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primaryColor checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-neutral-600 dark:after:bg-neutral-400 dark:checked:bg-primary dark:checked:after:bg-primary dark:focus:before:shadow-[3px_-1px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca]"
              />
            </div>
          </>
        )}
        {selectedSubject === "Payments" && (
          <>
            <div className="mb-2 p-1 w-full sm:w-1/2">
              <label
                htmlFor="transaction_number"
                className="block text-gray-700 text-sm font-Light mb-2"
              >
                Transaction number:
              </label>
              <input
                type="number"
                id="transaction_number"
                placeholder="# 1234"
                name="transaction_number"
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-2 p-1 w-full sm:w-1/2">
              <label
                htmlFor="transaction_status"
                className="block text-gray-700 text-sm font-Light mb-2"
              >
                Transaction status:
              </label>
              <input
                type="text"
                id="transaction_status"
                name="transaction_status"
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-2 p-1 w-full sm:w-1/2">
              <label
                htmlFor="payment_acquirer"
                className="block text-gray-700 text-sm font-Light mb-2"
              >
                Payment Acquirer:
              </label>
              <input
                id="payment_acquirer"
                name="payment_acquirer"
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          </>
        )}
        {selectedSubject === "Catalog" && (
          <>
            <div className="mb-2 p-1 w-full sm:w-1/2">
              <label
                htmlFor="sku_id"
                className="block text-gray-700 text-sm font-Light mb-2"
              >
                SkuId:
              </label>
              <input
                type="number"
                placeholder="# 1234"
                id="sku_id"
                name="sku_id"
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-2 p-1 w-full sm:w-1/2">
              <label
                htmlFor="print_page"
                className="block text-gray-700 text-sm font-Light mb-2"
              >
                Print of the page:
              </label>
              <input
                id="print_page"
                name="print_page"
                type="file"
                required
                className="shadow rounded relative m-0 block w-full min-w-0 flex-auto cursor-pointer rounded border border-solid border-secondary-500 bg-transparent bg-clip-padding px-3 py-[0.43rem] text-base font-normal leading-tight text-surface transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:me-3 file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-e file:border-solid file:border-inherit file:bg-transparent file:px-3  file:py-[0.32rem] file:text-surface focus:border-primary focus:text-gray-700 focus:shadow-inset focus:outline-none dark:border-white/70 dark:text-white  file:dark:text-white text-sm file:text-sm font-light file:font-light"
              />
            </div>
          </>
        )}
        <div className="mb-4 p-1 w-full">
          <label
            htmlFor="description"
            className="block text-gray-700 text-sm font-Light mb-2"
          >
            Detailing:
          </label>
          <textarea
            id="description"
            name="description"
            placeholder="Write the description of the issue you are facing"
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          ></textarea>
        </div>
        <div className="flex items-center justify-center sm:justify-end ml-1 w-full">
          <Button type="submit" buttonTitle="Create Ticket" />
        </div>
      </form>
      {showModal ? <ConfirmationModal message={ticketId} /> : null}
    </div>
  );
}
