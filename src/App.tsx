import { useEffect, useRef, useState } from "react";
import SearchText from "./components/SearchText";
import RandomAdviceText from "./components/RandomAdviceText";
import SavedAdvice from "./components/SavedAdvice";
import {
  SearchContext,
  RandomContext,
  SaveCondext,
} from "./components/Contexts";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import Spinner from "react-bootstrap/Spinner";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import "./styles.css";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Toast from "react-bootstrap/Toast";

export type Advice = {
  id: number;
  advice: string;
  date?: string;
};

function App() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [randomAdvice, setRandomAdvice] = useState<Advice>({
    id: 0,
    advice: "",
  });
  const [search, setSearch] = useState<string>();
  const [returnSearch, setReturnSearch] = useState<object[] | string[]>([]);
  const [savedAdvice, setSavedAdvice] = useState<Advice[]>([]);
  const [key, setKey] = useState("random");
  const [isDisable, setIsDisable] = useState<boolean>(true);
  const [show, setShow] = useState(false);
  const inputText = useRef<string>("");

  /**
   * Fetch a Random Advice form API server and save it to randomAdvice State
   */
  async function RandomAdvice() {
    setIsLoading(true);
    setRandomAdvice({ id: -1, advice: "" });
    await fetch("https://api.adviceslip.com/advice", { cache: "no-store" })
      .then((res) => res.json())
      .then((data: any) => setRandomAdvice(data.slip))
      .catch(() => {
        setRandomAdvice({ id: -2, advice: "ERROR! Please Try Again." });
      })
      .finally(() => setIsLoading(false));
  }

  // Get saved Advice from SearchText.tsx
  function getData(data: Advice) {
    if (savedAdvice[0] === undefined) {
      setSavedAdvice([data]);
      setShow(false);
    } else if (!savedAdvice.some((adv) => adv.id === data.id)) {
      let newAdvice = savedAdvice.slice();
      newAdvice.push(data);
      setSavedAdvice(newAdvice);
      setShow(true);
    }
  }

  // Remove saved Advice from SavedAdvice.tsx
  function removeData(data: Advice) {
    let removeSaved = savedAdvice.slice();
    removeSaved = removeSaved.filter((adv) => adv !== data);
    setSavedAdvice(removeSaved);
  }

  // Load localStorage to savedAdvice state
  useEffect(() => {
    const JSONadvice = localStorage.getItem("savedAdvice");
    setSavedAdvice(JSON.parse(JSONadvice || ""));
  }, []);

  // Overwrite localStorage when savedAdvice is modified
  useEffect(() => {
    localStorage.setItem("savedAdvice", JSON.stringify(savedAdvice));
  }, [savedAdvice]);

  // Fetch Advice(s) based on the inputText or id.
  useEffect(() => {
    if (inputText.current === "") {
      setReturnSearch([]);
      return;
    }

    const isNotANumber = isNaN(parseInt(inputText.current));

    const fetchAdvice = async () => {
      setIsSearching(true);
      try {
        let res = null;
        if (isNotANumber) {
          res = await fetch(
            `https://api.adviceslip.com/advice/search/${inputText.current}`,
            {
              cache: "no-store",
            }
          );
        } else {
          res = await fetch(
            `https://api.adviceslip.com/advice/${inputText.current}`,
            {
              cache: "no-store",
            }
          );
        }
        const advice = await res.json();

        if (advice.slips && isNotANumber) {
          setReturnSearch([advice.slips]); //keyword search uses .slips ** (with s)
        } else if (advice.slip && !isNotANumber) {
          setReturnSearch([[advice.slip]]); //id search uses .slip ** (no s)
        } else {
          setReturnSearch([advice.message.text, ": " + inputText.current]);
        }
      } catch {
        setReturnSearch(["Error! Please try again. ", ""]);
      } finally {
        setIsSearching(false);
      }
    };
    fetchAdvice();
  }, [search]);

  return (
    <>
      <Container>
        <Row className="save-notification d-flex justify-content-center fixed-top">
          <Col className="col-sm-1 mt-3">
            <Toast
              onClose={() => setShow(false)}
              show={show}
              delay={600}
              autohide
            >
              <Toast.Body className="text-center">Saved!</Toast.Body>
            </Toast>
          </Col>
        </Row>
      </Container>
      <Container>
        <Tabs className="mt-4" activeKey={key} onSelect={(k: any) => setKey(k)}>
          <Tab eventKey="random" title="Random Advice">
            <Row className="row-cols-1">
              <Col className="mt-5 text-center my-auto">
                <Card className="random-advice-card">
                  <RandomContext.Provider value={randomAdvice}>
                    <RandomAdviceText />
                  </RandomContext.Provider>
                </Card>
              </Col>
              <Col className="mt-3" align="center">
                <Button
                  size="lg"
                  onClick={() => {
                    RandomAdvice();
                    setIsDisable(false);
                  }}
                >
                  Get Random Advice{"   "}
                  {isLoading && <Spinner animation="border" size="sm" />}
                </Button>{" "}
                <Button
                  variant="outline-danger"
                  size="lg"
                  onClick={() => {
                    getData(randomAdvice);
                    setShow(true);
                  }}
                  disabled={isDisable}
                >
                  Save ♡
                </Button>
              </Col>
            </Row>
          </Tab>
          <Tab eventKey="search" title="Search  Advice">
            <Row className="row-cols-1">
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSearch(inputText.current);
                }}
              >
                <Col className="col-md-7 my-3 z-1">
                  <Form.Group>
                    <Form.Label>Search Advice</Form.Label>
                    <InputGroup>
                      <Form.Control
                        type="text"
                        placeholder="Search"
                        onChange={(e) => {
                          inputText.current = e.target.value;
                        }}
                      />
                      <Button className="px-3" type="submit">
                        🔍{" "}
                        {isSearching && (
                          <Spinner animation="border" size="sm" />
                        )}
                      </Button>
                    </InputGroup>
                  </Form.Group>
                </Col>
              </Form>
            </Row>
            <Row>
              <Col>
                <SearchContext.Provider value={returnSearch}>
                  <ListGroup as="ul">
                    <SearchText transferData={getData} />
                  </ListGroup>
                </SearchContext.Provider>
              </Col>
            </Row>
          </Tab>
          <Tab eventKey="saved" title="Saved  Advice">
            <SaveCondext.Provider value={savedAdvice}>
              <ListGroup as="ul">
                <SavedAdvice removeAdvice={removeData} />
              </ListGroup>
            </SaveCondext.Provider>
          </Tab>
        </Tabs>
      </Container>
    </>
  );
}

export default App;
