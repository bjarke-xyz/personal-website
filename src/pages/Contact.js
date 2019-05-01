import React from "react";
export const Contact = props => {
  document.title = `Contact ${props.title}`;
  return (
    <section>
      <h2>Contact</h2>
      <ul>
        <li>
          <p>
            Email:{" "}
            <a href="mailto:bjarke.tobiesen@gmail.com">
              bjarke.tobiesen@gmail.com
            </a>
          </p>
        </li>
      </ul>
    </section>
  );
};
