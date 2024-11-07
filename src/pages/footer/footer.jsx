import "./footer.scss";

export const Footer = () => {
  return (
    <div className="footer">
      <div className="left">
        <div className="logo">
          <img src="/dlslC.svg"></img>
        </div>
        <div className="name">
          <h1>De La Salle Lipa</h1>
        </div>
        <div className="border"></div>
        <div className="links">
          <a>
            <img src="/fb.svg"></img>
          </a>
          <a>
            <img src="/twitter.svg"></img>
          </a>
          <a>
            <img src="/ig.svg"></img>
          </a>
          <a>
            <img src="/yt.svg"></img>
          </a>
          <a>
            <img src="/tiktok.svg"></img>
          </a>
          <a>
            <img src="/linkedIn.svg"></img>
          </a>
        </div>
        <div className="loc">
          <a href="https://www.google.com/maps/place/De+La+Salle+Lipa/@13.9415698,121.147731,15z/data=!4m2!3m1!1s0x0:0x88017d2163de1e78?sa=X&ved=2ahUKEwjh3-Hr9ZeDAxUAcWwGHd-sBtUQ_BJ6BAgLEAA">
            1962 JP Laurel National Highway, Mataas Na Lupa, Lipa City 4217
          </a>
        </div>
      </div>
      <div className="right">
        <p className="affiliateTitle">International Affiliation</p>
        <div className="affiliate">
          <a href="https://ialu.org/ialu/" target="_blank">
            <img src="/aff1.png"></img>
          </a>
          <a href="https://www.iau-aiu.net/" target="_blank">
            <img src="/aff2.png"></img>
          </a>
          <a href="https://www.aashe.org/" target="_blank">
            <img src="/aff3.png"></img>
          </a>
          <a href="https://www1.ascd.org/" target="_blank">
            <img src="/aff4.png"></img>
          </a>
          <a href="https://aseaccu.asia/" target="_blank">
            <img src="/aff5.png"></img>
          </a>
          <a href="https://www.eauc.org.uk/" target="_blank">
            <img src="/aff6.png"></img>
          </a>
        </div>
        <div className="details">
          <div className="leftDetails">
            <h1>Others</h1>
            <h2>DLSL Statement of Inclusion</h2>
            <h2>Intellectual Property</h2>
            <h2>Central Procurement Department</h2>
          </div>
          <div className="rightDetails">
            <h1>Legal</h1>
            <h2>Cookie Policy</h2>
            <h2>Privacy Policy</h2>
            <h2>Site Map</h2>
          </div>
        </div>
      </div>
    </div>
  );
};
