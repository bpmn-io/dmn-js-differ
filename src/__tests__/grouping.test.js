import { describe, expect, test } from "vitest";

import dishDecisionV1 from "./fixtures/dish-decision-v1.dmn";
import dishDecisionV2 from "./fixtures/dish-decision-v2.dmn";
// import dishDecisionV3 from "./fixtures/dish-decision-v3.dmn";
// import dishDecisionV4 from "./fixtures/dish-decision-v4.dmn";
// import dishDecisionV5 from "./fixtures/dish-decision-v5.dmn";
// import dishDecisionV6 from "./fixtures/dish-decision-v6.dmn";
// import dishDecisionV7 from "./fixtures/dish-decision-v7.dmn";

import {
  getLocationId,
  getLocationPath,
  getNewValue,
  getOldValue,
} from "./helpers";

import defaultGroupingModule from "../modules/group-changes";
import DmnDiffer from "../dmn-differ";

describe("grouping", () => {
  test("1 and 2", async () => {
    const result = await computeDiff(dishDecisionV1, dishDecisionV2);

    expect(Object.keys(result)).toHaveLength(1);
    expect(result.Decision_0mg65e5.changes.added).toBeUndefined();
    expect(result.Decision_0mg65e5.changes.removed).toBeUndefined();

    const modifiedList = result.Decision_0mg65e5.changes.modified;
    expect(modifiedList).toHaveLength(1);

    const change = modifiedList[0];
    expect(getLocationId(change)).toBe("LiteralExpression_1k8g2eo");
    expect(getLocationPath(change)).toBe(
      "drgElement.0.decisionLogic.rule.1.outputEntry.0.text"
    );
    expect(getOldValue(change)).toBe('"Roastbeef"');
    expect(getNewValue(change)).toBe('"Schichtfleisch"');
  });
});

const computeDiff = async (oldXML, newXML) => {
  const dmnDiffer = new DmnDiffer({
    outputProcessors: [defaultGroupingModule],
  });

  try {
    const changes = await dmnDiffer.compute(oldXML, newXML);
    return changes;
  } catch (error) {
    return false;
  }
};
