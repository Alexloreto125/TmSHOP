import { Container, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import CustomNavBar from "./CustomNavBar";
import ReturnButton from "./ReturnButton";
import HeaderStorico from "./HeaderStorico";
import BodyStorico from "./BodyStorico";

const StoricoInfo = () => {
  const { storicoId } = useParams();
  return (
    <>
      <CustomNavBar />
      <ReturnButton />
      <Form className="StoricoForm">
        <HeaderStorico />
        <BodyStorico />
      </Form>
    </>
  );
};
export default StoricoInfo;
