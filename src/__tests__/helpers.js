import DmnDiffer from "../dmn-differ";

export const computeDiff = async (oldXML, newXML) => {
  const dmnDiffer = new DmnDiffer();
  return await dmnDiffer.compute(oldXML, newXML);
};
