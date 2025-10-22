import { useState } from "react";
import "../index.css";

function Form() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [errorEmail, setErroremail] = useState("");
  const [errorPassword, setErrorpassword] = useState("");
  const [errorName, setErrorname] = useState("");

  const formatPhone = (value) => {
    const digits = value.replace(/[\D]/g, "");

    let formatted = "";
    if (digits.length > 0) formatted += "(" + digits.slice(0, 3);
    if (digits.length >= 4) formatted += ") " + digits.slice(3, 6);
    if (digits.length >= 7) formatted += "-" + digits.slice(6, 10);

    return formatted;
  };

  const handleEmailChange = (e) => {
    const val = e.target.value;
    setEmail(val);
    validateEmail(val);
  };

  const validateEmail = (val) => {
    if (!val.includes("@") || !val.includes(".")) {
      setErroremail("Email is invalid");
    } else {
      setErroremail("✅");
    }
  };

  const handleName = (e) => {
    const val = e.target.value;
    setName(val);
    validateName(val);
  };

  const validateName = (val) => {
    if (val.length >= 3 && val.includes(" ")) {
      setErrorname("✅");
    } else {
      setErrorname("First and last name please.");
    }
  };

  const handlePassword = (e) => {
    const val = e.target.value;
    setPassword(val);
    validatePassword(val);
  };

  const validatePassword = (val) => {
    const errors = [];
    if (val.length < 8) errors.push("8+ chars");
    if (!/[a-z]/.test(val)) errors.push("1 lowercase");
    if (!/[A-Z]/.test(val)) errors.push("1 uppercase");
    if (!/\d/.test(val)) errors.push("1 digit");
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(val)) errors.push("1 special char");

    if (errors.length > 0) {
      setErrorpassword("❌ Missing: " + errors.join(", "));
    } else {
      setErrorpassword("✅");
    }
  };

  return (
    <div className="container">
      <p className="spin-emoji" style={{ fontSize: 100 }}>
        🌍
      </p>
      <p>{name}</p>
      <input placeholder="Name" value={name} onChange={(e) => handleName(e)} />
      <p style={{ color: "red", fontSize: 12 }}>{errorName}</p>
      <p>{email}</p>
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => handleEmailChange(e)}
      />

      <p style={{ color: "red", fontSize: 12 }}>{errorEmail}</p>
      <p>{password}</p>
      <input
        placeholder="Password"
        value={password}
        onChange={(e) => handlePassword(e)}
      />
      <p style={{ color: "red", fontSize: 12 }}>{errorPassword}</p>
      <p>{phone}</p>
      <input
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(formatPhone(e.target.value))}
        maxLength={14}
      />
      <br />
      <br />
      <div>
        <button
          disabled={
            !(
              errorEmail === "✅" &&
              errorName === "✅" &&
              errorPassword === "✅"
            )
          }
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default Form;
