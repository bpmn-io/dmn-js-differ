import { describe, expect, test } from "vitest";
import DmnModdle from "dmn-moddle";
import * as jsondiffpatch from "jsondiffpatch";

import dishDecisionV1 from "./fixtures/dish-decision-v1.dmn";
import dishDecisionV2 from "./fixtures/dish-decision-v2.dmn";
import dishDecisionV3 from "./fixtures/dish-decision-v3.dmn";
// import dishDecisionV4 from "./fixtures/dish-decision-v4.dmn";
// import dishDecisionV5 from "./fixtures/dish-decision-v5.dmn";
// import dishDecisionV6 from "./fixtures/dish-decision-v6.dmn";
// import dishDecisionV7 from "./fixtures/dish-decision-v7.dmn";

import {
  getAdded,
  getLocationId,
  getLocationPath,
  getModified,
  getNewValue,
  getOldValue,
  getRemoved,
  getValue,
} from "./helpers";

import classifyChanges from "../modules/classify-changes";

describe("classification", () => {
  test("1 and 2", async () => {
    const result = await classify(dishDecisionV1, dishDecisionV2);
    expect(getAdded(result)).toHaveLength(0);
    expect(getRemoved(result)).toHaveLength(0);
    expect(getModified(result)).toHaveLength(1);

    const change = getModified(result)[0];
    expect(getLocationId(change)).toBe("LiteralExpression_1k8g2eo");
    expect(getLocationPath(change)).toBe(
      "drgElement.0.decisionLogic.rule.1.outputEntry.0.text"
    );
    expect(getOldValue(change)).toBe('"Roastbeef"');
    expect(getNewValue(change)).toBe('"Schichtfleisch"');
  });

  test("2 and 3", async () => {
    const result = await classify(dishDecisionV2, dishDecisionV3);
    expect(getAdded(result)).toHaveLength(5);
    expect(getRemoved(result)).toHaveLength(0);
    expect(getModified(result)).toHaveLength(0);

    const change1 = getAdded(result)[0];
    expect(getLocationId(change1)).toBe("InputClause_0znn5y9");
    expect(getLocationPath(change1)).toBe("drgElement.0.decisionLogic.input.1");
    expect(getValue(change1).id).toBe("InputClause_0znn5y9");
  });
});

const parseXML = async (xml) => {
  const moddle = new DmnModdle();
  const { rootElement } = await moddle.fromXML(xml, "dmn:Definitions");
  return rootElement;
};

const removeDi = (definitions) => {
  if ("dmnDI" in definitions) {
    delete definitions["dmnDI"];
  }
};

const classify = async (oldXML, newXML) => {
  const diffpatcher = jsondiffpatch.create({
    objectHash: (obj) => obj.id || JSON.stringify(obj),
  });

  const oldDefinitions = await parseXML(oldXML);
  const newDefinitions = await parseXML(newXML);

  removeDi(oldDefinitions);
  removeDi(newDefinitions);

  const delta = diffpatcher.diff(oldDefinitions, newDefinitions);
  return classifyChanges(delta, oldDefinitions, newDefinitions);
};
