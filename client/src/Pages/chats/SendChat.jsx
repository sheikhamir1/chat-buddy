import React, { useState, useEffect } from "react";
import { Spinner } from "../../utils/Spinner.Util";
import { AddFileSvg } from "../../Svg/AddFileSvg";
import { useStore } from "../../Store";
import { AddEmojiSvg } from "../../Svg/AddEmojiSvg";
import { SendSvg } from "../../Svg/SendSvg";
import { ButtonUtil } from "../../Components/ButtonUtil";
import { toast } from "react-toastify";

const baseUrl =
  process.env.VITE_NODE_ENV === "development"
    ? `http://localhost:3000/api/v1/`
    : "https://chat-buddy-bsto.onrender.com/api/v1/";

export function SendChat() {
  // use store
  const { selectedUser, getChatMessages } = useStore((state) => state);

  const [image, setImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // preView selected Image
  const handleChange = (e) => {
    const file = e.target.files[0];

    if (!file) {
      console.log("no file selected");
    } else {
      const imagePreview = URL.createObjectURL(file);
      setSelectedImage(file);
      setImage(imagePreview);
    }
  };

  //   sending massage
  const handleSendMessage = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    message.trim();
    try {
      const formData = new FormData();
      formData.append("image", selectedImage);
      formData.append("message", message);

      const data = await fetch(`${baseUrl}message/send/${selectedUser._id}`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      if (!data.ok) {
        const response = await data.json();
        throw new Error(`status: ${data.status}, Error: ${response.message}`);
      }

      const response1 = await data.json();
      // console.log("response :", response1);

      setMessage("");
      setIsLoading(false);
      // toast(response1.message, { type: "success" });
      setSelectedImage(null);
    } catch (error) {
      setIsLoading(false);
      toast(error.message, { type: "error" });
      console.log(error);
    }
  };

  useEffect(() => {
    if (image) {
      document.getElementById("my_modal_2").showModal();
    }
    // console.log("image value changed:", image);
  }, [image]);

  useEffect(() => {
    if (isLoading) {
      getChatMessages(selectedUser._id);
    }
  }, [isLoading]);

  return (
    <>
      <Spinner isLoading={isLoading} />

      {/* <!-- Message Input Area --> */}
      <div className=" border-t  p-4">
        {/* preView selected Image */}
        {image && (
          <>
            <dialog id="my_modal_2" className="modal">
              <div className="modal-box">
                <h3 className="font-bold text-lg pb-4">Your Selected Image</h3>
                <button
                  className="btn btn-lg btn-circle absolute right-2 top-5  w-10 h-10"
                  title="Cancel Selected Image"
                  onClick={() => setImage(null)}
                >
                  X
                </button>
                <img
                  src={image}
                  alt="your selected image"
                  className="w-screen"
                />
              </div>
              <form method="dialog" className="modal-backdrop">
                <button>close</button>
              </form>
            </dialog>{" "}
          </>
        )}
        <form className="flex items-center" onSubmit={handleSendMessage}>
          <button className="p-2 rounded-full  mr-2">
            <label htmlFor="image" className="cursor-pointer">
              <AddFileSvg />
              <input
                type="file"
                id="image"
                name="image"
                className="hidden"
                onChange={handleChange}
              />
            </label>
            <input type="file" className="hidden" />
          </button>
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Type a message..."
              className="w-full border rounded-full py-2 pl-4 pr-10 input"
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 rounded-full cursor-pointer">
              <AddEmojiSvg />
            </button>
          </div>

          <ButtonUtil
            buttonName={<SendSvg />}
            style={"p-2 rounded-full ml-3 "}
          />
        </form>
      </div>
    </>
  );
}
