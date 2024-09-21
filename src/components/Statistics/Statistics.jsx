// Statistics.jsx

import React from "react";

const Statistics = ({ mode, outputText }) => {
  return (
    <div className="d-flex justify-content-center">
      <button
        className={`btn btn-outline-${
          mode === "dark" ? "light" : "dark"
        } mx-1 btn-sm statistics-btn`}
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasBottom"
        aria-controls="offcanvasBottom"
      >
        <span className="text-uppercase">Statistics</span>
      </button>

      <div
        className="offcanvas offcanvas-bottom statistics-section"
        tabIndex="-1"
        id="offcanvasBottom"
        aria-labelledby="offcanvasBottomLabel"
        style={{
          backgroundColor: `${mode === "dark" ? "#212529" : "#F8F9FA"}`,
          color: `${mode === "dark" ? "white" : "black"}`,
        }}
      >
        <div
          className="offcanvas-header d-flex justify-content-center"
          style={{
            backgroundColor: `${mode === "dark" ? "#212529" : "#F8F9FA"}`,
            color: `${mode === "dark" ? "white" : "black"}`,
          }}
        >
          <table
            className={`table table-hover table-sm table-responsive statistics-text table-${mode}`}
          >
            <thead>
              <tr>
                <th scope="col" colSpan="3" className="text-center">
                  TEXT SUMMARY TABLE
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Average reading time</td>
                <td>
                  {(outputText.split(" ").length * 0.0033).toFixed(1)} minutes
                </td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>Paragraphs</td>
                <td>{outputText.split(/\r\n|\r|\n/).filter(Boolean).length}</td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td>Sentences</td>
                <td>{outputText.split(".").filter(Boolean).length}</td>
              </tr>
              <tr>
                <th scope="row">4</th>
                <td>Words</td>
                <td>{outputText.split(/\s+/).filter(Boolean).length}</td>
              </tr>
              <tr>
                <th scope="row">5</th>
                <td>Unique Words</td>
                <td>{new Set(outputText.split(" ").filter(Boolean)).size}</td>
              </tr>
              <tr>
                <th scope="row">6</th>
                <td>Spaces</td>
                <td>{outputText.split(" ").length - 1}</td>
              </tr>
              <tr>
                <th scope="row">7</th>
                <td>Characters with spaces and new lines</td>
                <td>{outputText.length}</td>
              </tr>
              <tr>
                <th scope="row">8</th>
                <td>Characters without spaces and new lines</td>
                <td>{outputText.replace(/\s/g, "").length}</td>
              </tr>
              <tr>
                <th scope="row">9</th>
                <td>Average characters per word</td>
                <td>
                  {outputText.replace(/ /g, "").length /
                    outputText.split(" ").length}
                </td>
              </tr>
            </tbody>
          </table>
          <button
            type="button"
            className={`close-btn btn-${mode}`}
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          >
            <i className="bi bi-x-lg"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
