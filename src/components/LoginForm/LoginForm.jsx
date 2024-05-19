"use client";
import { userDB } from "@/DB/user";
import { LoadingOutlined } from "@ant-design/icons";
import { Button, Form, Input, Spin } from "antd";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [errMessage, setErrMessage] = useState("");
  const router = useRouter();

  // Register User Function
  const onFinishReg = (values) => {
    setIsLoading(true);
    setErrMessage("");
    console.log("Success:", values);
    if (values) {
      const userId = userDB.length + 1;
      const user = { ...values, id: userId };
      setTimeout(() => {
        userDB.push(user);
        console.log(userDB[userId - 1]);
        const createdUser = userDB[userId - 1];
        localStorage.setItem("user", JSON.stringify(createdUser));
        router.push("/dashboard");
        setIsLoading(false);
        setErrMessage("");
        return;
      }, 1000);
    }
  };

  // Login  A User
  const onFinishLogin = async (values) => {
    setErrMessage("");
    setIsLoading(true);
    console.log("Success:", values);
    if (values) {
      const existUser = userDB.filter((user) => user.email === values.email);
      console.log(existUser);
      if (existUser.length > 0) {
        if (existUser[0].password === values.password) {
          const LoggedUser = localStorage.getItem("user");
          if (!LoggedUser) {
            setIsLoading(false);
            localStorage.setItem("user", JSON.stringify(existUser[0]));
          } else {
            setIsLoading(false);
            router.push("/dashboard");
          }
        } else {
          setErrMessage("Password doesn't match! please Try again");
          setIsLoading(false);
        }
      } else {
        setErrMessage("user Not Exist Please Register");
        localStorage.removeItem("user");
        setIsLoading(false);
      }
      // axios
      //   .get(`https://6630ec7fc92f351c03db97ac.mockapi.io/user/${values.id}`)
      //   .then((res) =>{ console.log(res)
      //     setErrMessage("")
      //     setIsLoading(false);
      //   }).catch(err=>{setErrMessage(err.message)
      //   setIsLoading(false)
      //   })
    }
  };
  const onFinishFailedReg = (errorInfo) => {
    console.log("Failed:", errorInfo);
    setIsLoading(false);
  };
  const onFinishFailedLogin = (errorInfo) => {
    console.log("Failed:", errorInfo);
    setIsLoading(false);
  };
  return (
    <section className="w-full ">
      <h1 className="text-center  text-3xl font-bold mb-8">
        Please Login To Use Dashboard
      </h1>
      <section className="bg-[url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxRsVeQx032cSbIrylwtGFUD5os4nEuBx3RA&usqp=CAU')] bg-no-repeat bg-cover border border-slate-200 md:p-9 px-2 py-4 md:py-9 rounded-xl flex flex-col md:flex-row gap-4 gap-y-10 justify-center items-center md:w-3/6 w-11/12 mx-auto !opacity-0 !translate-y-40  duration-1000 login-anim  !shadow-md overflow-x-hidden">
        <section className="w-full">
          <Image
            width={300}
            height={300}
            className="w-full h-70 object-cover rounded-xl"
            src="https://img.freepik.com/free-vector/programmer-concept-illustration_114360-2417.jpg"
            alt="login Photo"
          />
        </section>

        {/* Login Form Section */}
        <section className="w-full ">
          <section className="w-[full]   overflow-hidden relative">
            {/* { isLogin?  */}
            <section
              className={`w-full min-h-auto overflow-y-hidden ${
                isLogin
                  ? "translate-x-0 col-span-12 "
                  : "-translate-x-[100rem] col-span-2 absolute"
              }  duration-700  `}
            >
              <Form
                name="basic"
                onFinish={onFinishLogin}
                onFinishFailed={onFinishFailedLogin}
                autoComplete="on"
                className="sm:mr-24 md:mr-0"
              >
                <Form.Item
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Please input your username!",
                    },
                  ]}
                >
                  <Input
                    placeholder="Your Email"
                    className="py-2 px-3 focus:shadow-md"
                  />
                </Form.Item>

                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                    },
                  ]}
                >
                  <Input.Password
                    placeholder="Password"
                    className="py-2 px-3 focus:shadow-md"
                  />
                </Form.Item>

                <Form.Item className="w-full mx-auto">
                  <Button
                    className="mx-auto"
                    style={{ display: "flex", gap: "5px", width: "100%" }}
                    type="primary"
                    htmlType="submit"
                  >
                    <div className="mx-auto flex gap-4">
                      <span className="font-bold "> Login</span>
                      {isLoading ? (
                        <Spin
                          indicator={
                            <LoadingOutlined
                              style={{
                                fontSize: 20,
                                color: "#fff",
                              }}
                              spin
                            />
                          }
                        />
                      ) : (
                        ""
                      )}
                    </div>
                  </Button>
                </Form.Item>
              </Form>
            </section>
            <section
              className={`w-full   ${
                isLogin
                  ? "translate-x-[100rem] col-span-2 absolute "
                  : "translate-x-0 col-span-12"
              } duration-700 `}
            >
              {/* Register Section */}
              <Form
                name="Regbasic"
                onFinish={onFinishReg}
                onFinishFailed={onFinishFailedReg}
                autoComplete="on"
                className="sm:mr-24 md:mr-0"
              >
                <Form.Item
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: "Please input your username!",
                    },
                  ]}
                >
                  <Input
                    placeholder="Your Name"
                    className="py-2 px-3 focus:shadow-md"
                  />
                </Form.Item>
                <Form.Item
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Please input your username!",
                    },
                  ]}
                >
                  <Input
                    placeholder="Your Email"
                    className="py-2 px-3 focus:shadow-md"
                  />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                    },
                  ]}
                >
                  <Input.Password
                    placeholder="Your Password"
                    className="py-2 px-3"
                  />
                </Form.Item>{" "}
                <Form.Item className="w-full mx-auto">
                  <Button
                    className="mx-auto"
                    style={{ display: "flex", gap: "5px", width: "100%" }}
                    type="primary"
                    htmlType="submit"
                  >
                    <div className="mx-auto flex gap-4">
                      <span className="font-bold "> Register</span>
                      {isLoading ? (
                        <Spin
                          indicator={
                            <LoadingOutlined
                              style={{
                                fontSize: 20,
                                color: "#fff",
                              }}
                              spin
                            />
                          }
                        />
                      ) : (
                        ""
                      )}
                    </div>
                  </Button>
                </Form.Item>
              </Form>
            </section>
            {/* } */}
          </section>
          <div className="mt-3">
            {!isLogin ? (
              <p className="cursor-pointer">
                Old Project Manager member?
                <span
                  className="font-bold text-blue-600"
                  onClick={() => setIsLogin(!isLogin)}
                >
                  {" "}
                  Login
                </span>
              </p>
            ) : (
              <p className="cursor-pointer">
                New to Project Manager?{" "}
                <span
                  className="font-bold text-blue-600"
                  onClick={() => setIsLogin(!isLogin)}
                >
                  {" "}
                  Register
                </span>
              </p>
            )}
            <p className="text-red-500">{errMessage}</p>
          </div>
        </section>
      </section>
    </section>
  );
};

export default LoginForm;
