import React from "react";
import "./contact.scss";
import { MdCall, MdEmail, MdLocationPin, MdFacebook } from "react-icons/md";
import { BsTwitter, BsInstagram } from "react-icons/bs";
import { useForm } from "react-hook-form";

const Contact = () => {
  const { register, handleSubmit } = useForm({
    defaultValues: { username: "", email: "", message: "" },
  });

  const handleMessage = (value) => {
    console.log(value);
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
              placeholder="Nguyen Van A"
              id="username"
              {...register("username")}
            />
          </div>
          <div className="form__group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="anv@email.com"
              id="email"
              {...register("email")}
            />
          </div>
          <div className="form__group">
            <label htmlFor="message">Message</label>
            <textarea id="message" {...register("message")}></textarea>
          </div>
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
