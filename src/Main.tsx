import React, { useEffect, useState } from "react";
import "./Main.css";
import MultiSelectElement from "./components/Multiselect";
import { GiShipWheel } from "react-icons/gi";

const Main = () => {
  const [companies, setCompanies] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [uniqueCountries, setUniqueCountries] = useState([]);
  const [areas, setAreas] = useState([]);
  const [selectedAreas, setSelectedAreas] = useState([]);
  const [results, setResults] = useState<any>([]);

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
        const unique: any = [
          //@ts-ignore
          ...new Map(data.map((m: any) => [m.country, m])).values(),
        ];
        setUniqueCountries(unique);
        setCompanies(data);
      });
  }, []);

  const shipmentsData = async (company_areas: any) => {
    await fetch(
      "https://shipment-521cf-default-rtdb.firebaseio.com/shipments.json"
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        company_areas.map((company_area: any, numberOfIndex: number) => {
          let counter: number = 0;

          data.map((shipment: any, index: number) => {
            if (
              company_area.companyId === shipment.companyId &&
              company_area.areaId === shipment.areaId
            ) {
              counter++;
            }
            if (data.length - 1 === index) {
              company_areas[numberOfIndex].counter = counter;
            }
          });
        });
      });

    const sortArray = company_areas.sort(
      (a: any, b: any) => b.counter - a.counter
    );

    setResults(sortArray);
  };

  const onButtonClicked = (): void => {
    let selectedCompanies: any = [];

    companies.map((company: any) => {
      selectedCountries.map((selectedCountry: any) => {
        if (company.country === selectedCountry.label) {
          selectedCompanies.push({
            id: company.companyId,
            companyName: company.name,
          });
        }
      });
    });

    let company_areas: any = [];

    fetch(
      "https://shipment-521cf-default-rtdb.firebaseio.com/company_areas.json"
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        data.map((company_area: any) => {
          selectedCompanies.forEach((selectedCompany: any) => {
            selectedAreas.forEach((selectedArea: any) => {
              if (
                company_area.areaId === selectedArea.value &&
                company_area.companyId === selectedCompany.id
              ) {
                company_areas.push({
                  companyName: selectedCompany.companyName,
                  companyId: selectedCompany.id,
                  areaId: company_area.areaId,
                  state: selectedArea.label,
                });
              }
            });
          });
        });
      });

    shipmentsData(company_areas);
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
                options={uniqueCountries}
                text="Country"
                selectedCountries={selectedCountries}
                setSelectedCountries={(item: any) => setSelectedCountries(item)}
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
                className="btn btn-outline-primary searchbutton"
                onClick={onButtonClicked}
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </section>
      <div>
        {results.map((el: any) => {
          console.log(el);
          return (
            <div className="shipment_results">
              {el.companyName} has {el.counter} shipments on {el.state}{" "}
            </div>
          );
        })}
      </div>
    </>
  );
};
export default Main;
