import "./faqs.scss";
import { faqs } from "./faqsData";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Faqs = () => {
  const navigate = useNavigate();
  const [isHidden, setIsHidden] = useState(null);

  const getFaqId = (id) => {
    setIsHidden(isHidden === id ? false : id);
  };

  return (
    <div id="section2" className="faqsContainer">
      <div className="container">
        <h1 className="title">FAQs</h1>
        {faqs.map((faq) => {
          return (
            <div
              className={
                isHidden === faq.id ? "accordion expanded" : "accordion"
              }
            >
              <div className="list">
                <button
                  onClick={() => {
                    getFaqId(faq.id);
                  }}
                >
                  {isHidden === faq.id ? (
                    <img src="/ic-minus.svg"></img>
                  ) : (
                    <img src="/ic-add.svg"></img>
                  )}
                </button>
                <h1 className="question">{faq.question}</h1>
              </div>
              {isHidden === faq.id && <h1 className="answer">{faq.answer}</h1>}
            </div>
          );
        })}
        <button
          className="button"
          onClick={() => {
            navigate("/faqs");
          }}
        >
          View All
        </button>
      </div>
    </div>
  );
};
