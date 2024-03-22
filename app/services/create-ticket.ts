import { environment } from "../enviroment/dev";

export const createTicket = (ticketData: any) => {
  const accessToken = localStorage.getItem("accessToken");
  return fetch(`${environment.base_url}/tickets.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${accessToken}`,
    },
    body: JSON.stringify({ ticket: ticketData }),
  })
    .then((response) => {
      if (!response.ok) {
        return response.text().then((errorMessage) => {
          throw new Error(`Failed to create ticket: ${errorMessage}`);
        });
      }
      return response.json();
    })
    .then((responseData) => responseData.ticket)
    .catch((error) => {
      console.error("Error creating ticket:", error.message);
      throw new Error("Failed to create ticket");
    });
};
