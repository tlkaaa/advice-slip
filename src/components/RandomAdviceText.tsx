import { useContext } from "react";
import { RandomContext } from "./Contexts";
import Card from "react-bootstrap/Card";
import { Spinner } from "react-bootstrap";

export default function RandomAdviceText() {
  const randomAdvice = useContext(RandomContext);
  return randomAdvice.id == 0 ? (
    <Card.Body className="align-items-center d-flex justify-content-center p-2">
      Press Button for a Random Advice
    </Card.Body>
  ) : randomAdvice.id == -1 ? (
    <Card.Body className="align-items-center d-flex justify-content-center">
      <Spinner className="m-2 random-spinner" animation="grow" size="sm" />
      <Spinner className="m-2 random-spinner" animation="grow" size="sm" />
      <Spinner className="m-2 random-spinner" animation="grow" size="sm" />
      <Spinner className="m-2 random-spinner" animation="grow" size="sm" />
      <Spinner className="m-2 random-spinner" animation="grow" size="sm" />
      <Spinner className="m-2 random-spinner" animation="grow" size="sm" />
    </Card.Body>
  ) : (
    <Card.Body className="align-items-center d-flex justify-content-center">
      <h1>
        <i>{randomAdvice.advice}</i>
      </h1>
    </Card.Body>
  );
}
