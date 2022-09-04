import React, { useState } from "react";
import { MultiSelect } from "react-multi-select-component";
interface IMultiselectProps {
  options: any;
  text: string;
  setSelectedAreas?: (item: any) => void;
  setSelectedCompanies?: (item: any) => void;
  selectedAreas?: any;
  selectedCompanies?: any;
}
interface IRow {
  areaId?: number;
  state?: string;
  country?: string;
  companyId?: number;
}
const MultiSelectElement = ({
  options,
  text,
  setSelectedAreas,
  setSelectedCompanies,
  selectedAreas,
  selectedCompanies,
}: IMultiselectProps) => {
  const optionsTest = options.map((row: IRow) => {
    return {
      value: text === "Areas" ? row.areaId : row.companyId,
      label: text === "Areas" ? row.state : row.country,
    };
  });
  return (
    <div>
      <h1 className={"select_text"}>{text}</h1>
      <MultiSelect
        className={"test"}
        options={optionsTest}
        value={selectedCompanies ? selectedCompanies : selectedAreas}
        onChange={selectedCompanies ? setSelectedCompanies : setSelectedAreas}
        labelledBy="Select"
      />
    </div>
  );
};
export default MultiSelectElement;
