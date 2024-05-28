import { Button, Container, Form, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import CustomNavBar from "./CustomNavBar";
import ReturnButton from "./ReturnButton";
import HeaderStorico from "./HeaderStorico";
import BodyStorico from "./BodyStorico";
import { useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const StoricoInfo = () => {
  const { storicoId } = useParams();
  const [loader, setLoader] = useState(false);
  const downloadPDF = (fatturaId) => {
    const capture = document.querySelector(".StoricoForm");
    const downloadButton = capture.querySelector(".download-button");
    if (downloadButton) {
      downloadButton.style.display = "none"; // Nascondi temporaneamente il pulsante
    }
    setLoader(true);

    html2canvas(capture).then((canvas) => {
      const imgData = canvas.toDataURL("image/png"); // Fix: "img/png" to "image/png"
      console.log("Image data:", imgData); // Log image data
      const doc = new jsPDF("p", "mm", "a4");

      console.log("PDF object:", doc); // Log PDF object
      const componentWidth = doc.internal.pageSize.getWidth();
      const componentHeight = doc.internal.pageSize.getHeight();
      doc.addImage(imgData, "PNG", 0, 0, componentWidth, componentHeight);
      setLoader(false);
      doc.save(`FATTURA ${fatturaId}`);
      if (downloadButton) {
        downloadButton.style.display = "inline-block";
      }
    });
  };
  return (
    <>
      <CustomNavBar />
      <ReturnButton />

      <Form className="StoricoForm ">
        <HeaderStorico />
        <BodyStorico
          downloadPDF={downloadPDF}
          loader={loader}
          setLoader={setLoader}
        />
        {/* <Button
          className="mx-auto download-button"
          onClick={downloadPDF}
          disabled={!(loader === false)}
        >
          {loader ? "Downloading..." : "Download"}
        </Button> */}
      </Form>
    </>
  );
};
export default StoricoInfo;
