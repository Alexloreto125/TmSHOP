import logo from "/assets/logo.png";

const HeaderStorico = () => {
  return (
    <header className="text-dark">
      <h1> INVOICE </h1>
      <address>
        <p> ALEX TM SHOP </p>
        <p> #429, First Floor </p>
        <p> Piacenza </p>
        <p> +918660876889 </p>
      </address>

      <span>
        <img
          alt="MAHESH"
          src={logo}
          className="rounded float-right align-top"
        />
      </span>
    </header>
  );
};

export default HeaderStorico;
