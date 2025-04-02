import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { CameraSvg } from "../../Svg/CameraSvg";
import { InputUtil } from "../../Components/InputUtil";
import { useForm } from "react-hook-form";
import { useStore } from "../../Store";
import { toast } from "react-toastify";
import { Spinner } from "../../utils/Spinner.Util";
import { ButtonUtil } from "../../Components/ButtonUtil";
import { BackArrowSvg } from "../../Svg/BackArrowSvg";
import { ShowOtherDetail } from "../login/ShowOtherDetail";

const baseUrl =
  import.meta.env.VITE_NODE_ENV === "development"
    ? `http://localhost:3000/api/v1/`
    : "https://chat-buddy-bsto.onrender.com/api/v1/";

export function UserProfile() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, errors, setValue } = useForm();

  const { authUser, onRefresh } = useStore((state) => state);

  // handle form
  useEffect(() => {
    if (authUser) {
      setValue("fullName", authUser?.fullName);
      setValue("email", authUser?.email);
      // console.log("authUser in user profile render once:", authUser);
    }
  }, []);

  const onSubmit = (data) => {
    // console.log(data);
  };

  const handleChange = (e) => {
    const file = e.target.files[0];

    if (!file) {
      console.log("no file selected");
    } else {
      const imagePreview = URL.createObjectURL(file);
      setSelectedImage(file);
      setImage(imagePreview);
      toast("Image selected 😀 please upload the image", {
        type: "info",
      });
    }
  };

  useEffect(() => {
    if (image) {
      document.getElementById("my_modal_2").showModal();
    }
    // console.log("image value changed:", image);
  }, [image]);
  // console.log("selectedImage:", selectedImage);

  // upload image to cloudinary
  const handleImageUpload = async () => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("profilePic", selectedImage);

      // Make the request to the backend
      const data = await fetch(baseUrl + "auth/update", {
        method: "POST",
        credentials: "include", // If you're using cookies
        body: formData, // The body should contain the FormData (no need to set Content-Type)
      });

      // Check if the response is OK
      if (!data.ok) {
        const response = await data.json();
        throw new Error(`status: ${data.status}, Error: ${response.message}`);
      }

      const response1 = await data.json();
      // console.log("response from cloudinary:", response1);
      setIsLoading(false);
      toast(response1.message, { type: "success" });
      setSelectedImage(null);
    } catch (error) {
      setIsLoading(false);
      toast(error.message, { type: "error" });
      console.log(error);
    }
  };

  useEffect(() => {
    onRefresh();
  }, [isLoading]);

  const handleCleanUp = () => {
    toast("cancelled please select another image", { type: "info" });
    setSelectedImage(null);
    setImage(null);
  };

  return (
    <>
      <Spinner isLoading={isLoading} />

      <div id="profilePage" className=" min-h-screen">
        {/* <!-- Profile Header --> */}

        <div className=" shadow">
          <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Link className="mr-4 p-2 rounded-md " to={"/home"}>
                  <BackArrowSvg />
                </Link>
                <h1 className="text-2xl font-semibold ">Profile</h1>
              </div>

              <ButtonUtil
                buttonName="upload Profile image"
                onClick={handleImageUpload}
              />
            </div>
          </div>
        </div>

        {/* <!-- Profile Content --> */}
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className=" shadow rounded-lg overflow-hidden">
            {/* show image preview */}
            {image && (
              <>
                <dialog id="my_modal_2" className="modal">
                  <div className="modal-box">
                    <h3 className="font-bold text-lg pb-4">
                      Click outside to Selected Image
                    </h3>
                    <button
                      className="btn btn-lg btn-circle absolute right-2 top-5  w-10 h-10"
                      title="Cancel Selected Image"
                      onClick={handleCleanUp}
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

            <div className="relative h-48 ">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTK1t1LCBqSBTxyrVY0xy_7fXXi9Sn1GdaSJQ&s"
                alt=""
                className="h-[200px] w-full object-cover"
              />
              <div className="absolute -bottom-12 left-8">
                <div className="relative">
                  <img
                    src={
                      authUser.profilePic ||
                      "https://avatar.iran.liara.run/public/boy?username=john"
                    }
                    alt="John Doe profile"
                    className="w-44 h-44 object-cover rounded-full border-4 "
                  />

                  <label
                    htmlFor="profilePic"
                    className="cursor-pointer absolute bottom-1 right-5  p-1 rounded-full border   scale-110 transform transition duration-300 ease-in-out"
                  >
                    <CameraSvg hoverText="hover:text-white" />
                    <input
                      type="file"
                      id="profilePic"
                      name="profilePic"
                      className="hidden"
                      onChange={handleChange}
                    />
                  </label>
                </div>
              </div>

              {/* <button className="absolute bottom-3 right-3  p-2 rounded-md shadow ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 "
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </button> */}
            </div>

            {/* <!-- Profile Details --> */}
            <div className="pt-16 pb-8 px-8">
              <h2 className="text-xl font-semibold ">{authUser.fullName}</h2>
              <p className="text-sm ">{authUser.email}</p>
              {/* <div className="flex items-center mt-2  text-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span>San Francisco, CA</span>
              </div> */}
            </div>

            {/* <!-- Tabs --> */}
            <div className="border-b ">
              <nav className="flex px-8 -mb-px">
                <div
                  href="#"
                  className="border-b-2 border-transparent py-4 px-1 text-sm font-medium  whitespace-nowrap mr-8"
                >
                  Personal Information
                </div>
              </nav>
            </div>

            {/* <!-- Form Sections --> */}
            <div className="p-8">
              {/* <!-- Basic Info Section --> */}

              <div className="mb-8">
                <h3 className="text-lg font-medium  mb-4">Basic Information</h3>

                <div className="grid grid-cols-2 gap-y-6 gap-x-4 ">
                  <form
                    className="space-y-6 contents"
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <InputUtil
                      label="fullName"
                      displayLabeLName={"Full Name"}
                      inputType="text"
                      inputName={"fullName"}
                      register={register}
                      errors={errors}
                      placeholder="John Doe"
                      disabled={true}
                    />
                    <InputUtil
                      label="email"
                      displayLabeLName={"email address"}
                      inputType="email"
                      inputName={"email"}
                      register={register}
                      errors={errors}
                      placeholder="john.doe@example.com"
                      disabled={true}
                    />
                  </form>
                </div>
              </div>
            </div>

            {/* <!-- Form Actions --> */}
            <div className="px-8 py-4  border-t  flex justify-end gap-4">
              <ButtonUtil buttonName={"Cancel"} />
              <ButtonUtil buttonName={"Save Changes"} />
            </div>
            <ShowOtherDetail />
          </div>
        </div>
      </div>
    </>
  );
}
