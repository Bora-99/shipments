import React, { useEffect, useState } from "react";
import "./Main.css";
import MultiSelectElement from "./components/Multiselect";
import { GiShipWheel } from "react-icons/gi";
const Main = () => {
  const [companies, setCompanies] = useState([]);
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const [uniqueCompanies, setUniqueCompanies] = useState([]);
  const [areas, setAreas] = useState([]);
  const [selectedAreas, setSelectedAreas] = useState([]);
  const [prova, setProva] = useState<any>([]);
  useEffect(() => {
    fetch("https://shipment-521cf-default-rtdb.firebaseio.com/areas.json")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setAreas(data);
      });
    fetch("https://shipment-521cf-default-rtdb.firebaseio.com/companies.json")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        //@ts-ignore
        const unique: any = [...new Map(data.map((m: any) => [m.country, m])).values()];
        setUniqueCompanies(unique);
        setCompanies(data);
      });
  }, []);
  const dataFetch = async (test: any) => {
    await fetch(
      "https://shipment-521cf-default-rtdb.firebaseio.com/shipments.json"
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        test.map((el: any, index2: number) => {
          let counter: number = 0;
          data.map((item: any, index: number) => {
            if (el.companyId === item.companyId && el.areaId === item.areaId) {
              counter++;
            }
            if (data.length - 1 === index) {
              test[index2].counter = counter;
            }
          });
        });
      });
    const sortArray = test.sort((a: any, b: any) => b.counter - a.counter);
    setProva(sortArray);
  };
  const onButtonClicked = (): void => {
    let country: any = [];
    companies.map((el: any) => {
      selectedCompanies.map((item: any) => {
        if (el.country === item.label) {
          country.push({ id: el.companyId, companyName: el.name });
        }
      });
    });
    let test: any = [];
    fetch(
      "https://shipment-521cf-default-rtdb.firebaseio.com/company_areas.json"
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        data.map((el: any) => {
          country.forEach((item: any) => {
            selectedAreas.forEach((ele: any) => {
              console.log(ele);
              if (el.areaId === ele.value && el.companyId === item.id) {
                test.push({
                  companyName: item.companyName,
                  companyId: item.id,
                  areaId: el.areaId,
                  state: ele.label,
                });
              }
            });
          });
        });
      });
      dataFetch( test );
  };
  return (
    <>
      <p className="shipment_text">
        <GiShipWheel />
        Shipment Check
      </p>
          <section className="multiselect">
              <div className="container">
                  <div className="row">
                      <div className="col-6 col-md-4">
                       
        <MultiSelectElement
          options={uniqueCompanies}
          text="Country"
          selectedCompanies={selectedCompanies}
          setSelectedCompanies={(item: any) => setSelectedCompanies(item)}
                          />
                          </div>
              <div className="col-6 col-md-4">
              
                  <MultiSelectElement
                    
          options={areas}
          text="Areas"
          selectedAreas={selectedAreas}
          setSelectedAreas={(item: any) => setSelectedAreas(item)}
                  />
                  </div>
        <div className="col-6 col-md-4 search_button">
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={onButtonClicked}
          >
            Search
          </button>
        </div>
                  </div>
              </div>
              </section>
      <div>
        {prova.map((el: any) => {
          console.log(el);
          return (
            <div className="shipment_results">
                  { el.companyName } has { el.counter } shipments on { el.state }
                  { " " }
            </div>
          );
        })}
      </div>
    </>
  );
};
export default Main;
