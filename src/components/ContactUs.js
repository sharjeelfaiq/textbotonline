import React from "react";

const ContactUs = (props) => {
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
          minute to email us{" "}
          <a
            href="mailto:mrmalik610@gmail.com"
            target="_blank"
            style={{ fontFamily:"monospace", textDecoration: "none", color: "#0fa7c5" }}
          >
            here
          </a>{" "}
          and be a sincere user of this website. Thanks!
        </b>
      </h6>
    </>
  );
};

export default ContactUs;
