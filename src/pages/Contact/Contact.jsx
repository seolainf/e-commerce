import React, { useState } from "react";
import "./contact.scss";
import { MdCall, MdEmail, MdLocationPin, MdFacebook } from "react-icons/md";
import { BsTwitter, BsInstagram } from "react-icons/bs";
import { useForm } from "react-hook-form";

const Contact = () => {
  const [err, setErr] = useState("");
  const [message, setMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { username: "", email: "", message: "" },
  });

  const handleMessage = (value) => {
    console.log(value);
    if (errors.username?.type === "required") {
      console.log("mm");
    }
  };
  return (
    <div className="contact">
      <div className="contact__info">
        <h4 className="contact__info_title">Contact US</h4>
        <div className="contact__info_detail">
          <div className="contact__info_item">
            <MdCall className="icon" /> +123456789
          </div>
          <div className="contact__info_item">
            <MdEmail className="icon" /> e-commerce@gmail.com
          </div>
          <div className="contact__info_item">
            <MdLocationPin className="icon" /> 102 Street 54 Ha Noi
          </div>
        </div>
        <div className="contact__info_social">
          <span>
            <MdFacebook />
          </span>
          <span>
            <BsTwitter />
          </span>
          <span>
            <BsInstagram />
          </span>
        </div>
      </div>
      <div className="contact__message">
        <form
          action=""
          className="contact__form"
          onSubmit={handleSubmit(handleMessage)}
        >
          <div className="form__group">
            <label htmlFor="username">Họ tên</label>
            <input
              type="text"
              placeholder="Họ tên"
              id="username"
              {...register("username", { required: true })}
            />
            {errors.username?.type === "required" && (
              <span className="err">Thông tin bắt buộc!</span>
            )}
          </div>
          <div className="form__group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Email"
              id="email"
              {...register("email", {
                required: true,
                pattern:
                  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
              })}
            />
            {errors.email?.type === "required" && (
              <span className="err">Thông tin bắt buộc!</span>
            )}
            {errors.email?.type === "pattern" && (
              <span className="err">Email không hợp lệ!</span>
            )}
          </div>
          <div className="form__group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              {...register("message")}
              placeholder="Message"
            />
          </div>
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
