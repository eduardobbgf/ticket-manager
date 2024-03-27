import { environment } from "../enviroment/dev";

export const uploadImage = (file: File) => {
  const accessToken = localStorage.getItem("accessToken");
  return fetch(`${environment.base_url}/uploads?filename=${file.name}`, {
    method: "POST",
    headers: {
      "Content-Type": "image/png",
      Authorization: `bearer ${accessToken}`,
    },
    body: file,
  })
    .then((response) => {
      console.log(response);

      //   if (!response.ok) {
      //     return response.text().then((errorMessage) => {
      //       throw new Error(`Failed to create ticket: ${errorMessage}`);
      //     });
      //   }
      return response.json();
    })
    .then((responseData) => responseData)
    .catch((error) => {
      console.error("Error uploading image:", error.message);
      throw new Error("Failed to upload image");
    });
};
