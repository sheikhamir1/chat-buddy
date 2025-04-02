import React, { useEffect } from "react";
import { useStore } from "../../Store.jsx";
import { useForm } from "react-hook-form";
import { LoginForm } from "./LoginForm.jsx";
import { Spinner } from "../../utils/Spinner.Util.jsx";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";

const baseUrl =
  import.meta.env.VITE_NODE_ENV === "development"
    ? `http://localhost:3000/api/v1/`
    : "https://chat-buddy-bsto.onrender.com/api/v1/";

export function Login() {
  const navigate = useNavigate();

  // set store
  const { setIsUserLogin, connectSocket, onRefresh } = useStore(
    (state) => state
  );

  // Login
  const LoginUser = async (data) => {
    try {
      const response = await fetch(`${baseUrl}auth/login`, {
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
    mutationKey: ["LoginUser"],
    mutationFn: (data) => LoginUser(data),
    onSuccess: (data) => {
      toast(data.message, { type: "success" });
      setIsUserLogin(true);
      onRefresh();
      navigate("/home");
      connectSocket();
    },
    onError: (error) => {
      toast(error.message, { type: "error" });
    },
  });

  // Form data for (Login)
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
  //     setIsUserLogin(true);
  //     navigate("/home");
  //     onRefresh();
  //     connectSocket();
  //   }
  // }, [isSuccess]);

  return (
    <>
      <Spinner isLoading={isPending} />
      <LoginForm
        formHandler={handleSubmit(onSubmit)}
        register={register}
        errors={errors}
      />
    </>
  );
}
