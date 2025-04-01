import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { RegisterForm } from "./RegisterForm";
import { Spinner } from "../../utils/Spinner.Util";
import { useStore } from "../../Store";

const baseUrl =
  process.env.VITE_NODE_ENV === "development"
    ? `http://localhost:3000/api/v1/`
    : "https://chat-buddy-bsto.onrender.com/api/v1/";

export function Register() {
  const navigate = useNavigate();

  // set store
  const { setIsUserLogin, connectSocket, onRefresh } = useStore(
    (state) => state
  );

  // Register
  const registerUser = async (data) => {
    try {
      const response = await fetch(`${baseUrl}auth/signup`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          ` Status:${response.status}, Message: ${errorData.message}`
        );
      }

      return response.json();
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const { mutate, data, isPending, error, isError, isSuccess } = useMutation({
    mutationKey: ["registerUser"],
    mutationFn: (data) => registerUser(data),
    onSuccess: (data) => {
      toast(data.message, { type: "success" });
      setIsUserLogin(true);
      onRefresh();
      connectSocket();
      navigate("/home");
    },
    onError: (error) => {
      toast(error.message, { type: "error" });
    },
  });

  // form handle
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    mutate(data);
    reset();
  };

  // useEffect(() => {
  //   if (isSuccess) {
  //     connectSocket();
  //   }
  // }, [isSuccess]);

  return (
    <>
      <Spinner isLoading={isPending} />

      <RegisterForm
        formHandler={handleSubmit(onSubmit)}
        register={register}
        errors={errors}
      />
    </>
  );
}
