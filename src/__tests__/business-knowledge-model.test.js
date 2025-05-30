import { describe, expect, test } from "vitest";

import nameAddOld from "./fixtures/business-knowledge-model/name-add-old.dmn";
import nameAddNew from "./fixtures/business-knowledge-model/name-add-new.dmn";
import nameModificationOld from "./fixtures/business-knowledge-model/name-modification-old.dmn";
import nameModificationNew from "./fixtures/business-knowledge-model/name-modification-new.dmn";
import parameterAddOld from "./fixtures/business-knowledge-model/parameter-add-old.dmn";
import parameterAddNew from "./fixtures/business-knowledge-model/parameter-add-new.dmn";
import parameterModificationOld from "./fixtures/business-knowledge-model/parameter-modification-old.dmn";
import parameterModificationNew from "./fixtures/business-knowledge-model/parameter-modification-new.dmn";
import expressionAddOld from "./fixtures/business-knowledge-model/expression-add-old.dmn";
import expressionAddNew from "./fixtures/business-knowledge-model/expression-add-new.dmn";
import expressionModificationOld from "./fixtures/business-knowledge-model/expression-modification-old.dmn";
import expressionModificationNew from "./fixtures/business-knowledge-model/expression-modification-new.dmn";
import resultTypeAddOld from "./fixtures/business-knowledge-model/result-type-add-old.dmn";
import resultTypeAddNew from "./fixtures/business-knowledge-model/result-type-add-new.dmn";
import resultTypeModificationOld from "./fixtures/business-knowledge-model/result-type-modification-old.dmn";
import resultTypeModificationNew from "./fixtures/business-knowledge-model/result-type-modification-new.dmn";

import { computeDiff } from "./helpers";

describe("Business knowledge model view", () => {
  test("should detect name change", async () => {
    // Addition
    const result = await computeDiff(nameAddOld, nameAddNew);
    expect(result).toMatchObject({
      BusinessKnowledgeModel_1qibaz2: {
        changeType: "modified",
        changes: {
          added: [
            {
              location: {
                path: "drgElement.3.name",
                id: "BusinessKnowledgeModel_1qibaz2",
              },
              value: "isUnder18",
            },
          ],
        },
      },
    });

    // Removal
    const result2 = await computeDiff(nameAddNew, nameAddOld);
    expect(result2).toMatchObject({
      BusinessKnowledgeModel_1qibaz2: {
        changeType: "modified",
        changes: {
          removed: [
            {
              location: {
                path: "drgElement.3.name",
                id: "BusinessKnowledgeModel_1qibaz2",
              },
              value: "isUnder18",
            },
          ],
        },
      },
    });

    // Modification
    /**
     * Caveat:
     * When changing name from the drd view, only the name attribute is modified in the XML.
     * When changing name from the business knowledge model view, the name attribute is modified and the variable name attribute is added.
     */
    const result3 = await computeDiff(nameModificationOld, nameModificationNew);
    expect(result3).toMatchObject({
      BusinessKnowledgeModel_1qibaz2: {
        changeType: "modified",
        changes: {
          added: [
            {
              location: {
                path: "drgElement.3.variable.name",
                id: "InformationItem_1wh1efe",
              },
              value: "under18",
            },
          ],
          modified: [
            {
              location: {
                path: "drgElement.3.name",
                id: "BusinessKnowledgeModel_1qibaz2",
              },
              oldValue: "isUnder18",
              newValue: "under18",
            },
          ],
        },
      },
    });
  });

  test("should detect parameters change", async () => {
    // Addition
    const result = await computeDiff(parameterAddOld, parameterAddNew);
    expect(result).toMatchObject({
      BusinessKnowledgeModel_0m5x0lw: {
        changeType: "modified",
        changes: {
          added: [
            {
              location: {
                path: "drgElement.3.encapsulatedLogic.formalParameter",
                id: "FunctionDefinition_0ijniuj",
              },
              value: {
                $type: "dmn:InformationItem",
                name: "user_dob",
                typeRef: "",
              },
            },
          ],
        },
      },
    });

    // Removal
    const result2 = await computeDiff(parameterAddNew, parameterAddOld);
    expect(result2).toMatchObject({
      BusinessKnowledgeModel_0m5x0lw: {
        changeType: "modified",
        changes: {
          removed: [
            {
              location: {
                path: "drgElement.3.encapsulatedLogic.formalParameter",
                id: "FunctionDefinition_0ijniuj",
              },
              value: {
                $type: "dmn:InformationItem",
                name: "user_dob",
                typeRef: "",
              },
            },
          ],
        },
      },
    });

    // Modification
    const result3 = await computeDiff(
      parameterModificationOld,
      parameterModificationNew
    );
    expect(result3).toMatchObject({
      BusinessKnowledgeModel_0m5x0lw: {
        changeType: "modified",
        changes: {
          added: [
            {
              location: {
                path: "drgElement.3.encapsulatedLogic.formalParameter.0",
                id: "FunctionDefinition_0ijniuj",
              },
              value: {
                $type: "dmn:InformationItem",
                name: "user_dob",
                typeRef: "string",
              },
            },
          ],
          removed: [
            {
              location: {
                path: "drgElement.3.encapsulatedLogic.formalParameter.0",
                id: "FunctionDefinition_0ijniuj",
              },
              value: {
                $type: "dmn:InformationItem",
                name: "user_dob",
                typeRef: "",
              },
            },
          ],
        },
      },
    });
  });

  test("should detect expression change", async () => {
    // Addition
    const result = await computeDiff(expressionAddOld, expressionAddNew);
    expect(result).toMatchObject({
      BusinessKnowledgeModel_0m5x0lw: {
        changeType: "modified",
        changes: {
          added: [
            {
              location: {
                path: "drgElement.3.encapsulatedLogic.body.text",
                id: "LiteralExpression_1hgsud5",
              },
              value: "years and months duration(from, to)",
            },
          ],
        },
      },
    });

    // Removal
    const result2 = await computeDiff(expressionAddNew, expressionAddOld);
    expect(result2).toMatchObject({
      BusinessKnowledgeModel_0m5x0lw: {
        changeType: "modified",
        changes: {
          removed: [
            {
              location: {
                path: "drgElement.3.encapsulatedLogic.body.text",
                id: "LiteralExpression_1hgsud5",
              },
              value: "years and months duration(from, to)",
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
      BusinessKnowledgeModel_0m5x0lw: {
        changeType: "modified",
        changes: {
          modified: [
            {
              location: {
                path: "drgElement.3.encapsulatedLogic.body.text",
                id: "LiteralExpression_1hgsud5",
              },
              oldValue: "years and months duration(from, to)",
              newValue:
                'years and months duration(date(user_dob), today()) < duration("P18Y")',
            },
          ],
        },
      },
    });
  });

  test("should detect result type change", async () => {
    // Addition
    const result = await computeDiff(resultTypeAddOld, resultTypeAddNew);
    expect(result).toMatchObject({
      BusinessKnowledgeModel_0m5x0lw: {
        changeType: "modified",
        changes: {
          added: [
            {
              location: {
                path: "drgElement.3.variable.typeRef",
                id: "InformationItem_167kcu9",
              },
              value: "string",
            },
          ],
        },
      },
    });

    // Removal
    const result2 = await computeDiff(resultTypeAddNew, resultTypeAddOld);
    expect(result2).toMatchObject({
      BusinessKnowledgeModel_0m5x0lw: {
        changeType: "modified",
        changes: {
          removed: [
            {
              location: {
                path: "drgElement.3.variable.typeRef",
                id: "InformationItem_167kcu9",
              },
              value: "string",
            },
          ],
        },
      },
    });

    // Modification
    const result3 = await computeDiff(
      resultTypeModificationOld,
      resultTypeModificationNew
    );
    expect(result3).toMatchObject({
      BusinessKnowledgeModel_0m5x0lw: {
        changeType: "modified",
        changes: {
          modified: [
            {
              location: {
                path: "drgElement.3.variable.typeRef",
                id: "InformationItem_167kcu9",
              },
              oldValue: "string",
              newValue: "boolean",
            },
          ],
        },
      },
    });
  });
});
