import React from "react";

function Footer() {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <footer>
      <p>copyright ⓒ {year} @ The University of Waterloo</p>
      <p>Created by:</p>
      <a className="footer-link" href="https://www.linkedin.com/in/brianwu33/">
        Brian
      </a>
      <a
        className="footer-link"
        href="https://www.linkedin.com/in/zefei-zef-ou-507784203/"
      >
        James
      </a>
      <a className="footer-link" href="https://www.linkedin.com/in/theoliu8/">
        Theo
      </a>
      <a
        className="footer-link"
        href="https://www.linkedin.com/in/justinwang8/"
      >
        Justin
      </a>
    </footer>
  );
}

export default Footer;
