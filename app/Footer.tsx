/* eslint-disable */
import React from "react";
import { Container, Row, Col } from "reactstrap";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="footer footer-center bg-base-300 text-base-content p-4 row-start-3 col-span-3">
      <aside>
        <p>
          Copyright © {new Date().getFullYear()} - All right reserved by Jamia
          Mosque Committee
        </p>
      </aside>
    </footer>
  );
};
export default Footer;
