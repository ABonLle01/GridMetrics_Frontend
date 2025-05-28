import { getOption, getDriverIdByDriver, getTeamColorByTeamOption } from "../../../utils/selectOptions";
import GeneralData from "./GeneralData";

function Table({ season, dataType, selection }) {
  const getTitle = () => {
    switch (dataType) {
      case "races":
        return "Resultados de carrera";
      case "drivers":
        return "Clasificación de pilotos";
      case "teams":
        return "Clasificación de equipos";
      default:
        return "";
    }
  };

  const title = getTitle();

  let styles = {};
  if (dataType === "drivers" && selection !== "all") {
    const driverData = getDriverIdByDriver(selection);
    if (driverData?.color) {
      styles.color = driverData.color;
    }
  }
  
  if (dataType === "teams" && selection !== "all") {
  const teamColor = getTeamColorByTeamOption(selection);
    styles.color = teamColor;
  }


  return (
    <div className="container py-4">
      <div className="row">
        <div className="col-12">
          <h1 className="fs-3 fs-md-2 text-center text-md-start">
            {season} {title} <span className="fs-4" style={styles}>{selection !== "all" && ` ${getOption(selection)}`}</span>
          </h1>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <GeneralData dataType={dataType} option={selection} />
        </div>
      </div>
    </div>
  );
}


export default Table