import DmnModdle from "dmn-moddle";
import DmnModelerModdleExtension from "modeler-moddle/resources/dmn-modeler.json";
import DmnZeebeModdleExtension from "zeebe-dmn-moddle/resources/zeebe.json";

import DmnDiffer from "../dmn-differ";

export const computeDiff = async (oldXML, newXML) => {
  const oldDefinitions = await parseXML(oldXML);
  const newDefinitions = await parseXML(newXML);

  const dmnDiffer = new DmnDiffer();
  return dmnDiffer.compute(oldDefinitions, newDefinitions);
};

const parseXML = async (xml) => {
  const moddle = new DmnModdle({
    modeler: DmnModelerModdleExtension,
    zeebe: DmnZeebeModdleExtension,
  });
  const { rootElement } = await moddle.fromXML(xml, "dmn:Definitions");
  return rootElement;
};
