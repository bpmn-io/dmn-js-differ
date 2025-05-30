import { describe, expect, test } from "vitest";

import decisionNameChangeOld from "./fixtures/decision-table/decision-name-change-old.dmn";
import decisionNameChangeNew from "./fixtures/decision-table/decision-name-change-new.dmn";
import hitPolicyChangeOld from "./fixtures/decision-table/hit-policy-change-old.dmn";
import hitPolicyChangeNew from "./fixtures/decision-table/hit-policy-change-new.dmn";
import inputLabelAddOld from "./fixtures/decision-table/input-label-add-old.dmn";
import inputLabelAddNew from "./fixtures/decision-table/input-label-add-new.dmn";
import inputLabelModificationOld from "./fixtures/decision-table/input-label-modification-old.dmn";
import inputLabelModificationNew from "./fixtures/decision-table/input-label-modification-new.dmn";
import inputExpressionOld from "./fixtures/decision-table/input-expression-old.dmn";
import inputExpressionNew from "./fixtures/decision-table/input-expression-new.dmn";
import inputExpressionTypeOld from "./fixtures/decision-table/input-expression-type-old.dmn";
import inputExpressionTypeNew from "./fixtures/decision-table/input-expression-type-new.dmn";
import outputLabelAddOld from "./fixtures/decision-table/output-label-add-old.dmn";
import outputLabelAddNew from "./fixtures/decision-table/output-label-add-new.dmn";
import outputLabelModificationOld from "./fixtures/decision-table/output-label-modification-old.dmn";
import outputLabelModificationNew from "./fixtures/decision-table/output-label-modification-new.dmn";
import outputNameAddOld from "./fixtures/decision-table/output-name-add-old.dmn";
import outputNameAddNew from "./fixtures/decision-table/output-name-add-new.dmn";
import outputNameModificationOld from "./fixtures/decision-table/output-name-modification-old.dmn";
import outputNameModificationNew from "./fixtures/decision-table/output-name-modification-new.dmn";
import outputTypeOld from "./fixtures/decision-table/output-type-old.dmn";
import outputTypeNew from "./fixtures/decision-table/output-type-new.dmn";
import inputColumnAdditionOld from "./fixtures/decision-table/input-column-addition-old.dmn";
import inputColumnAdditionNew from "./fixtures/decision-table/input-column-addition-new.dmn";
import inputPredefinedValuesAddOld from "./fixtures/decision-table/input-predefined-values-add-old.dmn";
import inputPredefinedValuesAddNew from "./fixtures/decision-table/input-predefined-values-add-new.dmn";
import inputPredefinedValuesModificationOld from "./fixtures/decision-table/input-predefined-values-modification-old.dmn";
import inputPredefinedValuesModificationNew from "./fixtures/decision-table/input-predefined-values-modification-new.dmn";
import outputPredefinedValuesAddOld from "./fixtures/decision-table/output-predefined-values-add-old.dmn";
import outputPredefinedValuesAddNew from "./fixtures/decision-table/output-predefined-values-add-new.dmn";
import outputPredefinedValuesModificationOld from "./fixtures/decision-table/output-predefined-values-modification-old.dmn";
import outputPredefinedValuesModificationNew from "./fixtures/decision-table/output-predefined-values-modification-new.dmn";
import outputColumnAdditionOld from "./fixtures/decision-table/output-column-addition-old.dmn";
import outputColumnAdditionNew from "./fixtures/decision-table/output-column-addition-new.dmn";
import ruleAdditionOld from "./fixtures/decision-table/rule-addition-old.dmn";
import ruleAdditionNew from "./fixtures/decision-table/rule-addition-new.dmn";
import ruleModificationOld from "./fixtures/decision-table/rule-modification-old.dmn";
import ruleModificationNew from "./fixtures/decision-table/rule-modification-new.dmn";

import { computeDiff } from "./helpers";

describe("Decision table view", () => {
  test("should detect decision name change", async () => {
    const result = await computeDiff(
      decisionNameChangeOld,
      decisionNameChangeNew
    );

    expect(result).toMatchObject({
      Decision_1ukmnt4: {
        changeType: "modified",
        changes: {
          modified: [
            {
              location: {
                path: "drgElement.0.name",
                id: "Decision_1ukmnt4",
              },
              oldValue: "Decision 1",
              newValue: "Decide on upgrade",
            },
          ],
        },
      },
    });
  });

  test("should detect hit policy change", async () => {
    const result = await computeDiff(hitPolicyChangeOld, hitPolicyChangeNew);

    expect(result).toMatchObject({
      Decision_1ukmnt4: {
        changeType: "modified",
        changes: {
          modified: [
            {
              location: {
                path: "drgElement.0.decisionLogic.hitPolicy",
                id: "DecisionTable_18tk2si",
              },
              oldValue: "FIRST",
              newValue: "UNIQUE",
            },
          ],
        },
      },
    });
  });

  test("should detect input label change", async () => {
    // Label addition
    const result = await computeDiff(inputLabelAddOld, inputLabelAddNew);
    expect(result).toMatchObject({
      Decision_1ukmnt4: {
        changeType: "modified",
        changes: {
          added: [
            {
              location: {
                path: "drgElement.0.decisionLogic.input.0.label",
                id: "Input_1",
              },
              value: "Engagement",
            },
          ],
        },
      },
    });

    // Label modification
    const result2 = await computeDiff(
      inputLabelModificationOld,
      inputLabelModificationNew
    );
    expect(result2).toMatchObject({
      Decision_1ukmnt4: {
        changeType: "modified",
        changes: {
          modified: [
            {
              location: {
                path: "drgElement.0.decisionLogic.input.0.label",
                id: "Input_1",
              },
              oldValue: "Engagement",
              newValue: "Engagement score",
            },
          ],
        },
      },
    });

    // Label removal
    const result3 = await computeDiff(inputLabelAddNew, inputLabelAddOld);
    expect(result3).toMatchObject({
      Decision_1ukmnt4: {
        changeType: "modified",
        changes: {
          removed: [
            {
              location: {
                path: "drgElement.0.decisionLogic.input.0.label",
                id: "Input_1",
              },
              value: "Engagement",
            },
          ],
        },
      },
    });
  });

  test("should detect input expression change", async () => {
    const result = await computeDiff(inputExpressionOld, inputExpressionNew);

    expect(result).toMatchObject({
      Decision_1ukmnt4: {
        changeType: "modified",
        changes: {
          modified: [
            {
              location: {
                path: "drgElement.0.decisionLogic.input.0.inputExpression.text",
                id: "InputExpression_1",
              },
              oldValue: "",
              newValue: "CalculateEngagementScore",
            },
          ],
        },
      },
    });
  });

  test("should detect input expression type change", async () => {
    const result = await computeDiff(
      inputExpressionTypeOld,
      inputExpressionTypeNew
    );

    expect(result).toMatchObject({
      Decision_1ukmnt4: {
        changeType: "modified",
        changes: {
          modified: [
            {
              location: {
                path: "drgElement.0.decisionLogic.input.0.inputExpression.typeRef",
                id: "InputExpression_1",
              },
              oldValue: "string",
              newValue: "number",
            },
          ],
        },
      },
    });
  });

  test("should detect output label change", async () => {
    // Label addition
    const result = await computeDiff(outputLabelAddOld, outputLabelAddNew);
    expect(result).toMatchObject({
      Decision_1ukmnt4: {
        changeType: "modified",
        changes: {
          added: [
            {
              location: {
                path: "drgElement.0.decisionLogic.output.0.label",
                id: "Output_1",
              },
              value: "isEligible",
            },
          ],
        },
      },
    });

    // Label modification
    const result2 = await computeDiff(
      outputLabelModificationOld,
      outputLabelModificationNew
    );
    expect(result2).toMatchObject({
      Decision_1ukmnt4: {
        changeType: "modified",
        changes: {
          modified: [
            {
              location: {
                path: "drgElement.0.decisionLogic.output.0.label",
                id: "Output_1",
              },
              newValue: "isEligible",
              oldValue: "eligible",
            },
          ],
        },
      },
    });

    // Label removal
    const result3 = await computeDiff(outputLabelAddNew, outputLabelAddOld);
    expect(result3).toMatchObject({
      Decision_1ukmnt4: {
        changeType: "modified",
        changes: {
          removed: [
            {
              location: {
                path: "drgElement.0.decisionLogic.output.0.label",
                id: "Output_1",
              },
              value: "isEligible",
            },
          ],
        },
      },
    });
  });

  test("should detect output name change", async () => {
    // Name addition
    const result = await computeDiff(outputNameAddOld, outputNameAddNew);
    expect(result).toMatchObject({
      Decision_1ukmnt4: {
        changeType: "modified",
        changes: {
          added: [
            {
              location: {
                path: "drgElement.0.decisionLogic.output.0.name",
                id: "Output_1",
              },
              value: "eligibleForUpgrade",
            },
          ],
        },
      },
    });

    // Name modification
    const result2 = await computeDiff(
      outputNameModificationOld,
      outputNameModificationNew
    );
    expect(result2).toMatchObject({
      Decision_1ukmnt4: {
        changeType: "modified",
        changes: {
          modified: [
            {
              location: {
                path: "drgElement.0.decisionLogic.output.0.name",
                id: "Output_1",
              },
              newValue: "isEligibleForUpgrade",
              oldValue: "eligibleForUpgrade",
            },
          ],
        },
      },
    });

    // Name removal
    const result3 = await computeDiff(outputNameAddNew, outputNameAddOld);
    expect(result3).toMatchObject({
      Decision_1ukmnt4: {
        changeType: "modified",
        changes: {
          removed: [
            {
              location: {
                path: "drgElement.0.decisionLogic.output.0.name",
                id: "Output_1",
              },
              value: "eligibleForUpgrade",
            },
          ],
        },
      },
    });
  });

  test("should detect output type change", async () => {
    const result = await computeDiff(outputTypeOld, outputTypeNew);

    expect(result).toMatchObject({
      Decision_1ukmnt4: {
        changeType: "modified",
        changes: {
          modified: [
            {
              location: {
                path: "drgElement.0.decisionLogic.output.0.typeRef",
                id: "Output_1",
              },
              oldValue: "string",
              newValue: "boolean",
            },
          ],
        },
      },
    });
  });

  test("should detect input column addition", async () => {
    const result = await computeDiff(
      inputColumnAdditionOld,
      inputColumnAdditionNew
    );

    expect(result).toMatchObject({
      Decision_1ukmnt4: {
        changeType: "modified",
        changes: {
          added: [
            {
              location: {
                path: "drgElement.0.decisionLogic.input.1",
                id: "InputClause_0xim9r0",
              },
              value: {
                $type: "dmn:InputClause",
                id: "InputClause_0xim9r0",
                inputExpression: {
                  $type: "dmn:LiteralExpression",
                  id: "LiteralExpression_014c3d9",
                  typeRef: "string",
                  text: "",
                },
              },
            },
          ],
        },
      },
    });
  });

  test("should detect input column removal", async () => {
    const result = await computeDiff(
      inputColumnAdditionNew,
      inputColumnAdditionOld
    );

    expect(result).toMatchObject({
      Decision_1ukmnt4: {
        changeType: "modified",
        changes: {
          removed: [
            {
              location: {
                path: "drgElement.0.decisionLogic.input.1",
                id: "InputClause_0xim9r0",
              },
              value: {
                $type: "dmn:InputClause",
                id: "InputClause_0xim9r0",
                inputExpression: {
                  $type: "dmn:LiteralExpression",
                  id: "LiteralExpression_014c3d9",
                  typeRef: "string",
                  text: "",
                },
              },
            },
          ],
        },
      },
    });
  });

  test("should detect input predefined values change", async () => {
    // Addition
    const result = await computeDiff(
      inputPredefinedValuesAddOld,
      inputPredefinedValuesAddNew
    );
    expect(result).toMatchObject({
      Decision_1ukmnt4: {
        changeType: "modified",
        changes: {
          added: [
            {
              location: {
                path: "drgElement.0.decisionLogic.input.1.inputValues",
                id: "UnaryTests_0h6yupa",
              },
              value: {
                $type: "dmn:UnaryTests",
                id: "UnaryTests_0h6yupa",
                text: '"VIP","Regular"',
              },
            },
          ],
        },
      },
    });

    // Modification
    const result2 = await computeDiff(
      inputPredefinedValuesModificationOld,
      inputPredefinedValuesModificationNew
    );
    expect(result2).toMatchObject({
      Decision_1ukmnt4: {
        changeType: "modified",
        changes: {
          modified: [
            {
              location: {
                path: "drgElement.0.decisionLogic.input.1.inputValues.text",
                id: "UnaryTests_0h6yupa",
              },
              oldValue: '"VIP","Regular"',
              newValue: '"Regular"',
            },
          ],
        },
      },
    });

    // Removal
    const result3 = await computeDiff(
      inputPredefinedValuesAddNew,
      inputPredefinedValuesAddOld
    );
    expect(result3).toMatchObject({
      Decision_1ukmnt4: {
        changeType: "modified",
        changes: {
          removed: [
            {
              location: {
                path: "drgElement.0.decisionLogic.input.1.inputValues",
                id: "UnaryTests_0h6yupa",
              },
              value: {
                $type: "dmn:UnaryTests",
                id: "UnaryTests_0h6yupa",
                text: '"VIP","Regular"',
              },
            },
          ],
        },
      },
    });
  });

  test("should detect output predefined values change", async () => {
    // Addition
    const result = await computeDiff(
      outputPredefinedValuesAddOld,
      outputPredefinedValuesAddNew
    );
    expect(result).toMatchObject({
      Decision_1ukmnt4: {
        changeType: "modified",
        changes: {
          added: [
            {
              location: {
                path: "drgElement.0.decisionLogic.output.1.outputValues",
                id: "UnaryTests_06uszo4",
              },
              value: {
                $type: "dmn:UnaryTests",
                id: "UnaryTests_06uszo4",
                text: '"VIP"',
              },
            },
          ],
        },
      },
    });

    // Modification
    const result2 = await computeDiff(
      outputPredefinedValuesModificationOld,
      outputPredefinedValuesModificationNew
    );
    expect(result2).toMatchObject({
      Decision_1ukmnt4: {
        changeType: "modified",
        changes: {
          modified: [
            {
              location: {
                path: "drgElement.0.decisionLogic.output.1.outputValues.text",
                id: "UnaryTests_06uszo4",
              },
              oldValue: '"VIP"',
              newValue: '"VIP","Regular"',
            },
          ],
        },
      },
    });

    // Removal
    const result3 = await computeDiff(
      outputPredefinedValuesAddNew,
      outputPredefinedValuesAddOld
    );
    expect(result3).toMatchObject({
      Decision_1ukmnt4: {
        changeType: "modified",
        changes: {
          removed: [
            {
              location: {
                path: "drgElement.0.decisionLogic.output.1.outputValues",
                id: "UnaryTests_06uszo4",
              },
              value: {
                $type: "dmn:UnaryTests",
                id: "UnaryTests_06uszo4",
                text: '"VIP"',
              },
            },
          ],
        },
      },
    });
  });

  test("should detect output column addition", async () => {
    const result = await computeDiff(
      outputColumnAdditionOld,
      outputColumnAdditionNew
    );

    expect(result).toMatchObject({
      Decision_1ukmnt4: {
        changeType: "modified",
        changes: {
          added: [
            {
              location: {
                path: "drgElement.0.decisionLogic.output.1",
                id: "OutputClause_1lzif3g",
              },
              value: {
                $type: "dmn:OutputClause",
                id: "OutputClause_1lzif3g",
                typeRef: "string",
              },
            },
          ],
        },
      },
    });
  });

  test("should detect output column removal", async () => {
    const result = await computeDiff(
      outputColumnAdditionNew,
      outputColumnAdditionOld
    );

    expect(result).toMatchObject({
      Decision_1ukmnt4: {
        changeType: "modified",
        changes: {
          removed: [
            {
              location: {
                path: "drgElement.0.decisionLogic.output.1",
                id: "OutputClause_1lzif3g",
              },
              value: {
                $type: "dmn:OutputClause",
                id: "OutputClause_1lzif3g",
                typeRef: "string",
              },
            },
          ],
        },
      },
    });
  });

  test("should detect rule addition", async () => {
    const result = await computeDiff(ruleAdditionOld, ruleAdditionNew);

    expect(result).toMatchObject({
      Decision_1ukmnt4: {
        changeType: "modified",
        changes: {
          added: [
            {
              location: {
                path: "drgElement.0.decisionLogic.rule",
                id: "DecisionRule_0isgy03",
              },
              value: {
                $type: "dmn:DecisionRule",
                id: "DecisionRule_0isgy03",
                inputEntry: [
                  {
                    $type: "dmn:UnaryTests",
                    id: "UnaryTests_0d9szy0",
                    text: ">= 25",
                  },
                  {
                    $type: "dmn:UnaryTests",
                    id: "UnaryTests_0kqwra8",
                    text: '"VIP"',
                  },
                ],
                outputEntry: [
                  {
                    $type: "dmn:LiteralExpression",
                    id: "LiteralExpression_1toqt6o",
                    text: "true",
                  },
                ],
              },
            },
          ],
        },
      },
    });
  });

  test("should detect rule removal", async () => {
    const result = await computeDiff(ruleAdditionNew, ruleAdditionOld);

    expect(result).toMatchObject({
      Decision_1ukmnt4: {
        changeType: "modified",
        changes: {
          removed: [
            {
              location: {
                path: "drgElement.0.decisionLogic.rule",
                id: "DecisionRule_0isgy03",
              },
              value: {
                $type: "dmn:DecisionRule",
                id: "DecisionRule_0isgy03",
                inputEntry: [
                  {
                    $type: "dmn:UnaryTests",
                    id: "UnaryTests_0d9szy0",
                    text: ">= 25",
                  },
                  {
                    $type: "dmn:UnaryTests",
                    id: "UnaryTests_0kqwra8",
                    text: '"VIP"',
                  },
                ],
                outputEntry: [
                  {
                    $type: "dmn:LiteralExpression",
                    id: "LiteralExpression_1toqt6o",
                    text: "true",
                  },
                ],
              },
            },
          ],
        },
      },
    });
  });

  test("should detect rule modification", async () => {
    const result = await computeDiff(ruleModificationOld, ruleModificationNew);

    expect(result).toMatchObject({
      Decision_1ukmnt4: {
        changeType: "modified",
        changes: {
          modified: [
            {
              location: {
                path: "drgElement.0.decisionLogic.rule.0.inputEntry.0.text",
                id: "UnaryTests_0d9szy0",
              },
              oldValue: ">= 25",
              newValue: ">= 30",
            },
            {
              location: {
                path: "drgElement.0.decisionLogic.rule.0.outputEntry.0.text",
                id: "LiteralExpression_1toqt6o",
              },
              oldValue: "true",
              newValue: "false",
            },
          ],
        },
      },
    });
  });
});
