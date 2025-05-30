import { describe, expect, test } from "vitest";

import nameOld from "./fixtures/literal-expression/name-old.dmn";
import nameNew from "./fixtures/literal-expression/name-new.dmn";
import variableNameAdditionOld from "./fixtures/literal-expression/variable-name-addition-old.dmn";
import variableNameAdditionNew from "./fixtures/literal-expression/variable-name-addition-new.dmn";
import variableNameModificationOld from "./fixtures/literal-expression/variable-name-modification-old.dmn";
import variableNameModificationNew from "./fixtures/literal-expression/variable-name-modification-new.dmn";
import variableTypeAdditionOld from "./fixtures/literal-expression/variable-type-addition-old.dmn";
import variableTypeAdditionNew from "./fixtures/literal-expression/variable-type-addition-new.dmn";
import variableTypeModificationOld from "./fixtures/literal-expression/variable-type-modification-old.dmn";
import variableTypeModificationNew from "./fixtures/literal-expression/variable-type-modification-new.dmn";
import expressionAdditionOld from "./fixtures/literal-expression/expression-addition-old.dmn";
import expressionAdditionNew from "./fixtures/literal-expression/expression-addition-new.dmn";
import expressionModificationOld from "./fixtures/literal-expression/expression-modification-old.dmn";
import expressionModificationNew from "./fixtures/literal-expression/expression-modification-new.dmn";

import { computeDiff } from "./helpers";

describe("Literal expression view", () => {
  test("should detect name change", async () => {
    const result = await computeDiff(nameOld, nameNew);

    expect(result).toMatchObject({
      Decision_1loqm2b: {
        changeType: "modified",
        changes: {
          modified: [
            {
              location: {
                path: "drgElement.2.name",
                id: "Decision_1loqm2b",
              },
              oldValue: "Decide",
              newValue: "Decide if under 18",
            },
          ],
        },
      },
    });
  });

  test("should detect variable name change", async () => {
    // Addition
    const result = await computeDiff(
      variableNameAdditionOld,
      variableNameAdditionNew
    );
    expect(result).toMatchObject({
      Decision_1loqm2b: {
        changeType: "modified",
        changes: {
          added: [
            {
              location: {
                path: "drgElement.2.variable.name",
                id: "InformationItem_1u2we5r",
              },
              value: "isUnder18",
            },
          ],
        },
      },
    });

    // Removal
    const result2 = await computeDiff(
      variableNameAdditionNew,
      variableNameAdditionOld
    );
    expect(result2).toMatchObject({
      Decision_1loqm2b: {
        changeType: "modified",
        changes: {
          removed: [
            {
              location: {
                path: "drgElement.2.variable.name",
                id: "InformationItem_1u2we5r",
              },
              value: "isUnder18",
            },
          ],
        },
      },
    });

    // Modification
    const result3 = await computeDiff(
      variableNameModificationOld,
      variableNameModificationNew
    );
    expect(result3).toMatchObject({
      Decision_1loqm2b: {
        changeType: "modified",
        changes: {
          modified: [
            {
              location: {
                path: "drgElement.2.variable.name",
                id: "InformationItem_1u2we5r",
              },
              newValue: "under18",
              oldValue: "isUnder18",
            },
          ],
        },
      },
    });
  });

  test("should detect variable type change", async () => {
    // Addition
    const result = await computeDiff(
      variableTypeAdditionOld,
      variableTypeAdditionNew
    );
    expect(result).toMatchObject({
      Decision_1loqm2b: {
        changeType: "modified",
        changes: {
          added: [
            {
              location: {
                path: "drgElement.2.variable.typeRef",
                id: "InformationItem_1u2we5r",
              },
              value: "boolean",
            },
          ],
        },
      },
    });

    // Removal
    const result2 = await computeDiff(
      variableTypeAdditionNew,
      variableTypeAdditionOld
    );
    expect(result2).toMatchObject({
      Decision_1loqm2b: {
        changeType: "modified",
        changes: {
          removed: [
            {
              location: {
                path: "drgElement.2.variable.typeRef",
                id: "InformationItem_1u2we5r",
              },
              value: "boolean",
            },
          ],
        },
      },
    });

    // Modification
    const result3 = await computeDiff(
      variableTypeModificationOld,
      variableTypeModificationNew
    );
    expect(result3).toMatchObject({
      Decision_1loqm2b: {
        changeType: "modified",
        changes: {
          modified: [
            {
              location: {
                path: "drgElement.2.variable.typeRef",
                id: "InformationItem_1u2we5r",
              },
              newValue: "string",
              oldValue: "boolean",
            },
          ],
        },
      },
    });
  });

  test("should detect expression change", async () => {
    // Addition
    const result = await computeDiff(
      expressionAdditionOld,
      expressionAdditionNew
    );
    expect(result).toMatchObject({
      Decision_1loqm2b: {
        changeType: "modified",
        changes: {
          added: [
            {
              location: {
                path: "drgElement.2.decisionLogic.text",
                id: "LiteralExpression_0h39fr6",
              },
              value:
                "years and months duration(date(user_dob), last day of month(date)())",
            },
          ],
        },
      },
    });

    // Removal
    const result2 = await computeDiff(
      expressionAdditionNew,
      expressionAdditionOld
    );
    expect(result2).toMatchObject({
      Decision_1loqm2b: {
        changeType: "modified",
        changes: {
          removed: [
            {
              location: {
                path: "drgElement.2.decisionLogic.text",
                id: "LiteralExpression_0h39fr6",
              },
              value:
                "years and months duration(date(user_dob), last day of month(date)())",
            },
          ],
        },
      },
    });

    // Modification
    const result3 = await computeDiff(
      expressionModificationOld,
      expressionModificationNew
    );
    expect(result3).toMatchObject({
      Decision_1loqm2b: {
        changeType: "modified",
        changes: {
          modified: [
            {
              location: {
                path: "drgElement.2.decisionLogic.text",
                id: "LiteralExpression_0h39fr6",
              },
              oldValue:
                "years and months duration(date(user_dob), last day of month(date)())",
              newValue: "years and months duration(date(user_dob), today())",
            },
          ],
        },
      },
    });
  });
});
