import { MultiSelect } from "react-multi-select-component";
interface IMultiselectProps {
  options: any;
  text: string;
  setSelectedAreas?: (item: any) => void;
  setSelectedCountries?: (item: any) => void;
  selectedAreas?: any;
  selectedCountries?: any;
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
  setSelectedCountries,
  selectedAreas,
  selectedCountries,
}: IMultiselectProps) => {
  const valuesOption = options.map((row: IRow) => {
    return {
      value: text === "Areas" ? row.areaId : row.companyId,
      label: text === "Areas" ? row.state : row.country,
    };
  });

  return (
    <div>
      <h1 className={"select_text"}>{text}</h1>
      <MultiSelect
        options={valuesOption}
        value={selectedCountries ? selectedCountries : selectedAreas}
        onChange={selectedCountries ? setSelectedCountries : setSelectedAreas}
        labelledBy="Select"
      />
    </div>
  );
};
export default MultiSelectElement;
