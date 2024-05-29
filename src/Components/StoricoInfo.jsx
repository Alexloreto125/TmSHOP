import { Button, Container, Form, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import CustomNavBar from "./CustomNavBar";
import ReturnButton from "./ReturnButton";
import HeaderStorico from "./HeaderStorico";
import BodyStorico from "./BodyStorico";
import { useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const StoricoInfo = () => {
  const { storicoId } = useParams();
  const [loader, setLoader] = useState(false);
  const captureRef = useRef(null);
  const downloadPDF = (fatturaId) => {
    const capture = captureRef.current;
    const captureWidth = capture.offsetWidth;
    const captureHeight = capture.offsetHeight;

    const downloadButton = capture.querySelector(".download-button");
    if (downloadButton) {
      downloadButton.style.display = "none"; // Nascondi temporaneamente il pulsante
    }
    setLoader(true);

    html2canvas(capture, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", [captureWidth, captureHeight]);

      pdf.addImage(imgData, "PNG", 0, 0, captureWidth, captureHeight);
      pdf.save(`FATTURA ${fatturaId}`);
      setLoader(false);
      if (downloadButton) {
        downloadButton.style.display = "inline-block";
      }
    });
  };
  return (
    <>
      <CustomNavBar />
      <ReturnButton />

      <Form
        ref={captureRef}
        className="StoricoForm "
        style={{ overflow: "auto" }}
      >
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
