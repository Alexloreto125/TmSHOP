import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
const BodyStorico = ({ downloadPDF, loader, setLoader }) => {
  // const storico = useSelector((state) => state.storico.storico);
  const { storicoId } = useParams();
  console.log(storicoId);
  const [ordine, setOrdine] = useState(null);
  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrdine = async () => {
      const token = sessionStorage.getItem("token");

      try {
        const response = await fetch(
          `http://localhost:3001/fatture/ordine/${storicoId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setOrdine(data);
          console.log(data.items[0].prezzo);
        } else {
          setError("Failed to fetch order details");
        }
      } catch (error) {
        setError("An error occurred: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrdine();
  }, [storicoId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const calcoloIva = (valore) => {
    return (valore * 22) / 100;
  };

  console.log(ordine.items);

  return (
    <body className="text-dark bg-light">
      {ordine ? (
        <>
          <article>
            <address>
              <p> Alex Tm Shop </p>
            </address>

            <table className="firstTable">
              <tr>
                <th>
                  <span>Fattura #</span>
                </th>
                <td>
                  <span>{ordine.numero}</span>
                </td>
              </tr>
              <tr>
                <th>
                  <span>Data</span>
                </th>
                <td>
                  <span>{ordine.data}</span>
                </td>
              </tr>
              <tr>
                <th>
                  <span>Importo</span>
                </th>
                <td>
                  <span id="prefix">$</span>
                  <span>{ordine.importo}</span>
                </td>
              </tr>
            </table>

            <table className="secondTable">
              <thead>
                <tr>
                  <th>
                    <span>Item</span>
                  </th>
                  <th>
                    <span>Descrizione</span>
                  </th>
                  <th>
                    <span>Rate</span>
                  </th>
                  <th>
                    <span>Quantity</span>
                  </th>
                  <th>
                    <span>Price</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {ordine.items.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        <a className="cut">-</a>
                        <img className="image-fattura" src={item.image}></img>
                        <span>{item.name}</span>
                      </td>
                      <td>
                        <span>{item.descrizione}</span>
                      </td>
                      <td>
                        <span data-prefix>$</span>
                        <span>{item.prezzo}</span>
                      </td>
                      <td>
                        <span>{item.quantity}</span>
                      </td>
                      <td>
                        <span data-prefix>€</span>
                        <span>{item.prezzo * item.quantity}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <table className="firstTable">
              <tr>
                <th>
                  <span>Sub-Totale</span>
                </th>
                <td>
                  <span data-prefix>€</span>
                  <span>{ordine.importo}</span>
                </td>
              </tr>
              <tr>
                <th>
                  <span>IVA 22%</span>
                </th>
                <td>
                  <span data-prefix>€</span>
                  <span>{calcoloIva(ordine.importo)}</span>
                </td>
              </tr>
              <tr>
                <th>
                  <span>Totale</span>
                </th>
                <td>
                  <span data-prefix>$</span>
                  <span>{ordine.importo + calcoloIva(ordine.importo)}</span>
                </td>
              </tr>
            </table>
          </article>

          <aside className="bg-light ">
            <h1 id="notes">Additional Notes</h1>
            <div className="d-flex ">
              <p className="m-0 pb-2">
                A finance charge of 1.5% will be made on unpaid balances after
                30 days.
              </p>
            </div>
            <Button
              className="mx-auto download-button"
              onClick={() => {
                downloadPDF(ordine.numero);
              }}
              disabled={!(loader === false)}
            >
              {loader ? "Downloading..." : "Download"}
            </Button>
          </aside>
        </>
      ) : (
        "ORDINE NON TROVATO"
      )}
    </body>
  );
};

export default BodyStorico;
