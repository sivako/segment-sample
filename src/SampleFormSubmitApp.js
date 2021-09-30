import { useState } from "react";
import "./App.css";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";

const { Control, Label, Text, Group } = Form;

const states = [
  { label: "Process", value: "process" },
  { label: "Denied", value: "denied" },
  { label: "Pending", value: "pending" },
  { label: "Completed", value: "completed" },
];

function SampleFormSubmitApp() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [claim, setClaim] = useState("");
  const [comment, setComment] = useState("");
  const [status, setStatus] = useState("process");
  const [isSubmit, setSubmit] = useState(false);

  const onSubmit = () => {
    console.log({ email, phone, claim, comment, status });
    // Step 3. Sending the event to Segment
    window.analytics.track("Claim Submit - Ushur", {
      email,
      phone,
      claim,
      comment,
      status,
    });
    setSubmit(true);
    setEmail("");
    setPhone("");
    setClaim("");
    setComment("");
    setStatus("process");
  };

  if (isSubmit) {
    return (
      <div className="App">
        Successfully submitted the form.{" "}
        <Button variant="info" onClick={() => setSubmit(false)}>
          Try another form
        </Button>
      </div>
    );
  }

  return (
    <div className="App">
      <div style={{ textAlign: "center", fontSize: 24 }}>React - Segment</div>
      <div style={{ marginTop: 20 }} />

      <Form style={{ minWidth: 460 }}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPhone">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            type="phone"
            placeholder="Enter Phone number"
            value={phone}
            onChange={(ev) => setPhone(ev.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicClaim">
          <Form.Label>Claim</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Claim number"
            value={claim}
            onChange={(ev) => setClaim(ev.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicComment">
          <Form.Label>Comment(s)</Form.Label>
          <Form.Control
            type="text"
            as="textarea"
            rows={3}
            placeholder="Enter Comment(s)"
            value={comment}
            onChange={(ev) => setComment(ev.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicStatus">
          <Form.Label>Status</Form.Label>
          <Form.Select
            aria-label="Default select status"
            value={status}
            onChange={(ev) => setStatus(ev.target.value)}
          >
            {states.map((state) => (
              <option value={state.value} key={state.value}>
                {state.label}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Button variant="primary" type="submit" onClick={onSubmit}>
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default SampleFormSubmitApp;
