import React, { useState } from "react";
import { motion } from "framer-motion";
import emailjs from "emailjs-com";

import "../css/TextForm.css"

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
      <h6
        className={`lh-lg text-justify text-${
          props.mode === "light" ? "dark" : "light"
        }`}
      >
        <b>
          To make us aware of your thoughts and suggestions. Please take a
          minute to email us and be a sincere user of this website. Thanks!
        </b>
      </h6>
      <section className="form-section">
        <div>
          <div className="row">
            <div className="col-sm-12">
              <div className="row">
                <div className="col-sm-8 col-sm-offset-2">
                  <form
                    method="post"
                    data-form-title="CONTACT US"
                    onSubmit={sendEmail}
                  >
                    <input type="hidden" data-form-email="true" />
                    <div className="form-group my-1">
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        required=""
                        placeholder="Name*"
                        data-form-field="Name"
                      />
                    </div>
                    <div className="form-group my-1">
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        required=""
                        placeholder="Email*"
                        data-form-field="Email"
                      />
                    </div>
                    <div className="form-group my-1">
                      <input
                        type="tel"
                        className="form-control"
                        name="phone"
                        placeholder="Phone"
                        data-form-field="Phone"
                      />
                    </div>
                    <div className="form-group my-1">
                      <textarea
                        className="form-control"
                        name="message"
                        placeholder="Message"
                        rows="7"
                        data-form-field="Message"
                        value={input}
                        onChange={onTextChange}
                      ></textarea>
                    </div>
                    <div className="my-3">
                      <motion.button
                        whileTap={{
                          scale: 0,
                        }}
                        type="submit"
                        className={`btn btn-${
                          input.length === 0 ? "secondary" : "primary"
                        } mx-1 btn-sm contact-btn rounded`}
                        disabled={input.length === 0 ? true : false}
                      >
                        Send
                      </motion.button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactUs;
