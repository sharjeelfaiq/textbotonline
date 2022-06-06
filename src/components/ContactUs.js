import React, { useState } from "react";
import { motion } from "framer-motion";
import emailjs from "emailjs-com";

import "../css/ContactUs.css";

const ContactUs = (props) => {
  const [input, setInput] = useState("");

  // onTextChange() function - STARTS
  const onTextChange = (e) => {
    setInput(e.target.value);
  };
  // onTextChange() function - ENDS

  // sendEmail() function - STARTS
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "Textbotonline",
        "Textbotonline_610",
        e.target,
        "owZfMTisTWeKnU_qp"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
    setInput("");
  };
  // sendEmail() function - ENDS

  // submit() function - STARTS
  const submit = () => {
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  };
  // submit() function - ENDS

  return (
    <>
      <h1
        className={`text-center mb-4 text-${
          props.mode === "light" ? "dark" : "light"
        }`}
      >
        <span className="text-uppercase font-monospace">Contact Us</span>
      </h1>
      <p
        className={`lh-lg text-justify text-${
          props.mode === "light" ? "dark" : "light"
        }`}
      >
        We are glad to have you here. We need to be aware of your thoughts and
        experience with us (this website). We are working during most of the
        active hours and are always willing to know the ways to improve this
        website to the best and increase its utility for you.
      </p>
      <div>
        <div className="container py-5">
          <div className="section-contact">
            <div className="row justify-content-center">
              <div className="col-12 col-lg-10 col-xl-8">
                <div className="header-section text-center">
                  <h2 className="title">
                    Get In Touch
                    <span className="dot"></span>
                    <span className="big-title">CONTACT</span>
                  </h2>
                  <p className="description">
                    To make us aware of your thoughts and suggestions. Please
                    take a minute to email us and be a sincere user of this
                    website. Thanks!{" "}
                  </p>
                </div>
              </div>
            </div>
            <div className="form-contact">
              <form onSubmit={sendEmail}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="single-input">
                      <i className="fas fa-user"></i>
                      <input
                        type="text"
                        name="name"
                        placeholder="ENTER YOUR NAME"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="single-input">
                      <i className="fas fa-envelope"></i>
                      <input
                        type="text"
                        name="email"
                        placeholder="ENTER YOUR EMAIL"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="single-input">
                      <i className="fas fa-phone"></i>
                      <input
                        type="text"
                        name="phone"
                        placeholder="ENTER YOUR PHONE NUMBER"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="single-input">
                      <i className="fas fa-check"></i>
                      <input
                        type="text"
                        name="subject"
                        placeholder="ENTER YOUR SUBJECT"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="single-input">
                      <i className="fas fa-comment-dots"></i>
                      <textarea
                        placeholder="ENTER YOUR MESSAGE"
                        name="message"
                        value={input}
                        onChange={onTextChange}
                        required
                      ></textarea>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="submit-input text-center">
                      <motion.button
                        type="submit"
                        name="submit"
                        value="SUBMIT NOW"
                        whileTap={{
                          scale: 0,
                        }}
                        className={`btn btn-${
                          input.length === 0 ? "secondary" : "primary"
                        } mx-1 btn-sm contact-btn rounded`}
                        disabled={input.length === 0 ? true : false}
                        onClick={submit}
                      >
                        Send
                      </motion.button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
