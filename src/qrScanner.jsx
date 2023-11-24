import React from "react";
import QrScanner from "qr-scanner";
import "./App.css";

function Scanner() {
  //original
  // const fileRead = (e) => {
  //   const file = e.target.files[0];
  //   if (!file) {
  //     return;
  //   }
  //   QrScanner.scanImage(file, { returnDetailedScanResult: true })
  //     .then((result) => qrText(result.data))
  //     .catch((e) => console.log(e));
  // };

  const upload = () => {
    const wrapper = document.querySelector(".wrapper"),
      form = document.querySelector("form"),
      fileInp = form.querySelector("input"),
      infoText = form.querySelector("p"),
      closeBtn = document.querySelector(".close"),
      copyBtn = document.querySelector(".copy");

    // function fetchRequest(file, formData) {
    //   infoText.innerText = "Scanning QR Code...";
    //   fetch("http://api.qrserver.com/v1/read-qr-code/", {
    //     method: "POST",
    //     body: formData,
    //   })
    //     .then((res) => res.json())
    //     .then((result) => {
    //       result = result[0].symbol[0].data;
    //       infoText.innerText = result
    //         ? "Upload QR Code to Scan"
    //         : "Couldn't scan QR Code";
    //       if (!result) return;
    //       document.querySelector("textarea").innerText = result;
    //       form.querySelector("img").src = URL.createObjectURL(file);
    //       wrapper.classList.add("active");
    //     })
    //     .catch(() => {
    //       infoText.innerText = "Couldn't scan QR Code";
    //     });
    // }

    fileInp.addEventListener("change", async (e) => {
      infoText.innerText = "Scanning QR Code...";
      const file = e.target.files[0];
      console.log(file);
      if (!file) {
        infoText.innerText = "Upload QR Code to Scan...";
        return;
      }
      QrScanner.scanImage(file, { returnDetailedScanResult: true })
        .then((result) => {
          infoText.innerText = result.data
            ? "Upload QR Code to Scan"
            : "Couldn't scan QR Code";
          document.querySelector("textarea").innerText = result.data;
          form.querySelector("img").src = URL.createObjectURL(file);
          wrapper.classList.add("active");
          //qrText(result.data);
        })
        .catch((e) => {
          infoText.innerText = "Couldn't scan QR Code";
          console.log(e);
        });
    });

    copyBtn.addEventListener("click", () => {
      let text = document.querySelector("textarea").textContent;
      navigator.clipboard.writeText(text);
    });

    fileInp.click();

    closeBtn.addEventListener("click", () =>
      wrapper.classList.remove("active")
    );
  };

  return (
    <div className="wrapper">
      <h1>QR Code Scanner</h1>
      <form action="#" onClick={upload}>
        <input type="file" hidden />
        <img src="#" alt="qr-code" />
        <div className="content">
          <i className="fas fa-cloud-upload"></i>
          <p>Upload QR Code to Read</p>
        </div>
      </form>
      <div className="details">
        <textarea spellCheck="false" disabled></textarea>
        <div className="buttons">
          <button className="close">Close</button>
          <button className="copy">Copy Text</button>
        </div>
      </div>
    </div>
  );
}
export default Scanner;
