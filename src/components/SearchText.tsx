import { useContext, useEffect, useRef, useState } from "react";
import { SearchContext } from "./Contexts";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import { Advice } from "../App";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function SearchText(props: any) {
  const advice = useContext(SearchContext);
  const [savedAdvice, setSavedAdvice] = useState<Advice>();

  const savedButton = useRef(null);

  useEffect(() => {
    props.transferData(savedAdvice);
  }, [savedAdvice]);

  return advice[0] instanceof Array ? (
    advice[0].map((adv: Advice) => (
      <ListGroup.Item as="li" key={adv.id} className="advice">
        <Container>
          <Row>
            <Col className="col-1">
              <Button
                ref={savedButton}
                className="btn-sm save-button"
                variant="outline-danger"
                onClick={() => {
                  const adviceslip: Advice = { id: adv.id, advice: adv.advice };
                  setSavedAdvice(adviceslip);
                }}
              >
                ♡
              </Button>{" "}
            </Col>
            <Col className="offset-0">{adv.advice + "   --- " + adv.id}</Col>
          </Row>
        </Container>
      </ListGroup.Item>
    ))
  ) : advice[0] == "Searching ..." ? (
    <ListGroup.Item>{advice[0]}</ListGroup.Item>
  ) : typeof advice[0] == "string" && advice[0] != undefined ? (
    <ListGroup.Item>
      {advice[0].substring(0, advice[0].length - 1) + advice[1]}
    </ListGroup.Item>
  ) : (
    <ListGroup.Item>Please Enter Keyword(s) or an ID.</ListGroup.Item>
  );
}
