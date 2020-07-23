import React, {useState} from "react";
import { Button } from "rsuite";
import { Input } from "rsuite";
import "rsuite/dist/styles/rsuite-default.css";

const styles = {
  width: "70%",
};
const buttonStyle = {
  backgroundColor: "#D775A3",
  fontFamily: "Roboto",
  fontWeight: 700,
};

export default function CatSearch({ searchText }) {
  const [text, setText] = useState("");
  const handleClick = (e) => {
    e.preventDefault();
    searchText(text);
  };

  return (
    <section className="hero__search search">
      <Input
        className="search__input"
        style={styles}
        placeholder="Try 'Toronto'"
        onChange={(value) => setText(value)}
      />
      <Button
        className="search__button"
        style={buttonStyle}
        appearance="primary"
        onClick={handleClick}
      >
        Get Started
      </Button>
    </section>
  );
}
