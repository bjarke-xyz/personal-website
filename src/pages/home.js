import React from "react";
const Home = () => (
  <section>
    <h1>Hi</h1>
    <p>
      My name is Bjarke Tobiesen. I am currently studying{" "}
      <a href="https://www.sdu.dk/en/softwareteknologi">Software Technology</a>{" "}
      at University of Southern Denmark.
    </p>
    <hr />
    <p>Find me on:</p>
    <ul>
      <li>
        <a href="mailto:bjarke.tobiesen@gmail.com">
          <span className="icon" />
          <span>bjarke.tobiesen@gmail.com</span>
        </a>
      </li>
      <li>
        <a href="https://github.com/bjarkt">
          <span className="icon" />
          <span>bjarkt</span>
        </a>
      </li>
      <li>
        <a href="https://www.linkedin.com/in/bjarke-tobiesen">
          <span className="icon" />
          <span>bjarke-tobiesen</span>
        </a>
      </li>
    </ul>
  </section>
);

export default Home;
