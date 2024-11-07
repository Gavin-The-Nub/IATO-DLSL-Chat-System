import "./faqsMain.scss";
import { faqs } from "./faqsMainData";
import { useState, useRef, useEffect } from "react";

export const FaqsMain = () => {
  const [hiddenIds, setHiddenIds] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const getFaqId = (id) => {
    if (hiddenIds.includes(id)) {
      setHiddenIds(hiddenIds.filter((hiddenId) => hiddenId !== id));
      console.log(hiddenIds.includes(id));
    } else {
      setHiddenIds([...hiddenIds, id]);
      console.log(hiddenIds.includes(id));
    }
  };

  return (
    <div className="faqsContainer2">
      <div className="header" ref={messagesEndRef}>
        <img src="/2024-05-03 13_59_32-Banner.png"></img>
        <div className="details">
          <h1>The Institutional Admission and Testing Office</h1>
          <h2>Frequently Asked Questions (FAQs)</h2>
        </div>
      </div>
      <div className="container">
        <h1 className="title">FAQs</h1>

        {faqs.map((faq) => {
          return (
            <div className="faqsTitle">
              <p>{faq.faqTitle}</p>
              {faq.details.map((detail) => {
                return (
                  <div
                    className={
                      hiddenIds.includes(detail.id)
                        ? "accordion expanded"
                        : "accordion"
                    }
                  >
                    <div className="list">
                      <button
                        onClick={() => {
                          console.log(detail.id);
                          getFaqId(detail.id);
                        }}
                      >
                        {hiddenIds.includes(detail.id) ? (
                          <img src="/ic-minus.svg"></img>
                        ) : (
                          <img src="/ic-add.svg"></img>
                        )}
                      </button>
                      <h1 className="question">{detail.question}</h1>
                    </div>
                    {hiddenIds.includes(detail.id) && (
                      <h1 className="answer">{detail.answer}</h1>
                    )}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};
