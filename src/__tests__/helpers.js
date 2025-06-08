import DmnModdle from "dmn-moddle";

import DmnDiffer from "../dmn-differ";

export const computeDiff = async (oldXML, newXML) => {
  const oldDefinitions = await parseXML(oldXML);
  const newDefinitions = await parseXML(newXML);

  const dmnDiffer = new DmnDiffer();
  return await dmnDiffer.compute(oldDefinitions, newDefinitions);
};

const parseXML = async (xml) => {
  const moddle = new DmnModdle();
  const { rootElement } = await moddle.fromXML(xml, "dmn:Definitions");
  return rootElement;
}
