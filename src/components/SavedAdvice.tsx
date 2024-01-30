import { useContext } from "react";
import { SaveCondext } from "./Contexts";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import { Advice } from "../App";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function savedAdvice(props: any) {
  const advices = useContext(SaveCondext);

  return advices[0] !== undefined ? (
    advices.map((adv: Advice) => (
      <ListGroup.Item key={adv.id}>
        <Container>
          <Row>
            <Col className="col-1">
              <Button
                className="btn-sm save-button"
                variant="outline-danger"
                onClick={() => {
                  props.removeAdvice(adv);
                }}
              >
                ❌
              </Button>
            </Col>
            <Col>{adv.advice + "   --- " + adv.id}</Col>
          </Row>
        </Container>
      </ListGroup.Item>
    ))
  ) : (
    <ListGroup.Item>
      <Container>
        <Row>
          <Col>No Save Advice</Col>
        </Row>
      </Container>
    </ListGroup.Item>
  );
}
