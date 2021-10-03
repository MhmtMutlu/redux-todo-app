import React from "react";
import { Message } from "../../types/types";
import './error.css';

const Error = ({ message }: Message) => {
  return (
    <section className="page_404">
      <div className="container">
        <div className="row">
          <div className="col-sm-12 ">
            <div className="col-sm-10 col-sm-offset-1  text-center">
              <div className="four_zero_four_bg">
                <h1 className="h1">ERROR</h1>
              </div>

              <div className="contant_box_404">
                <h3 className="h2">Something went wrong!</h3>
                <p>{message}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Error;
