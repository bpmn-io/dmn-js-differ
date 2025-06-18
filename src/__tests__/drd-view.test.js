import { describe, expect, test } from "vitest";

import inputDataAdditionOld from "./fixtures/drd/input-data-addition-old.dmn";
import inputDataAdditionNew from "./fixtures/drd/input-data-addition-new.dmn";
import inputDataModificationOld from "./fixtures/drd/input-data-modification-old.dmn";
import inputDataModificationNew from "./fixtures/drd/input-data-modification-new.dmn";
import inputDataPropertiesOld from "./fixtures/drd/input-data-properties-old.dmn";
import inputDataPropertiesNew from "./fixtures/drd/input-data-properties-new.dmn";
import decisionAdditionOld from "./fixtures/drd/decision-addition-old.dmn";
import decisionAdditionNew from "./fixtures/drd/decision-addition-new.dmn";
import decisionModificationOld from "./fixtures/drd/decision-modification-old.dmn";
import decisionModificationNew from "./fixtures/drd/decision-modification-new.dmn";
import decisionPropertiesOld from "./fixtures/drd/decision-properties-old.dmn";
import decisionPropertiesNew from "./fixtures/drd/decision-properties-new.dmn";
import decisionTypeChangeOld from "./fixtures/drd/decision-type-change-old.dmn";
import decisionTypeChangeNew from "./fixtures/drd/decision-type-change-new.dmn";
import businessKnowledgeModelAdditionOld from "./fixtures/drd/business-knowledge-model-addition-old.dmn";
import businessKnowledgeModelAdditionNew from "./fixtures/drd/business-knowledge-model-addition-new.dmn";
import businessKnowledgeModelModificationOld from "./fixtures/drd/business-knowledge-model-modification-old.dmn";
import businessKnowledgeModelModificationNew from "./fixtures/drd/business-knowledge-model-modification-new.dmn";
import businessKnowledgeModelTypeChangeOld from "./fixtures/drd/business-knowledge-model-type-change-old.dmn";
import businessKnowledgeModelTypeChangeNew from "./fixtures/drd/business-knowledge-model-type-change-new.dmn";
import knowledgeSourceAdditionOld from "./fixtures/drd/knowledge-source-addition-old.dmn";
import knowledgeSourceAdditionNew from "./fixtures/drd/knowledge-source-addition-new.dmn";
import knowledgeSourceModificationOld from "./fixtures/drd/knowledge-source-modification-old.dmn";
import knowledgeSourceModificationNew from "./fixtures/drd/knowledge-source-modification-new.dmn";
import executionPlatformVersionOld from "./fixtures/drd/execution-platform-version-old.dmn";
import executionPlatformVersionNew from "./fixtures/drd/execution-platform-version-new.dmn";
import nameAndDescriptionOld from "./fixtures/drd/name-and-description-old.dmn";
import nameAndDescriptionNew from "./fixtures/drd/name-and-description-new.dmn";

import { computeDiff } from "./helpers";

describe("DRD view", () => {
  describe("Input data element", () => {
    test("should detect addition", async () => {
      const result = await computeDiff(
        inputDataAdditionOld,
        inputDataAdditionNew
      );

      expect(result).toMatchObject({
        InformationRequirement_065xv2q: {
          changeType: "added",
          changes: {
            added: [
              {
                location: {
                  path: "drgElement.0.informationRequirement",
                  id: "InformationRequirement_065xv2q",
                },
                value: {
                  $type: "dmn:InformationRequirement",
                  id: "InformationRequirement_065xv2q",
                  requiredInput: {
                    $type: "dmn:DMNElementReference",
                    href: "#InputData_1lse6r4",
                  },
                },
              },
            ],
          },
        },
        InputData_1lse6r4: {
          changeType: "added",
          changes: {
            added: [
              {
                location: {
                  path: "drgElement.1",
                  id: "InputData_1lse6r4",
                },
                value: {
                  $type: "dmn:InputData",
                  id: "InputData_1lse6r4",
                },
              },
            ],
          },
        },
      });
    });

    test("should detect removal", async () => {
      const result = await computeDiff(
        inputDataAdditionNew,
        inputDataAdditionOld
      );

      expect(result).toMatchObject({
        InformationRequirement_065xv2q: {
          changeType: "removed",
          changes: {
            removed: [
              {
                location: {
                  path: "drgElement.0.informationRequirement",
                  id: "InformationRequirement_065xv2q",
                },
                value: {
                  $type: "dmn:InformationRequirement",
                  id: "InformationRequirement_065xv2q",
                  requiredInput: {
                    $type: "dmn:DMNElementReference",
                    href: "#InputData_1lse6r4",
                  },
                },
              },
            ],
          },
        },
        InputData_1lse6r4: {
          changeType: "removed",
          changes: {
            removed: [
              {
                location: {
                  path: "drgElement.1",
                  id: "InputData_1lse6r4",
                },
                value: {
                  $type: "dmn:InputData",
                  id: "InputData_1lse6r4",
                },
              },
            ],
          },
        },
      });
    });

    test("should detect modification", async () => {
      const result = await computeDiff(
        inputDataModificationOld,
        inputDataModificationNew
      );

      expect(result).toMatchObject({
        InputData_1lse6r4: {
          changeType: "modified",
          changes: {
            added: [
              {
                location: {
                  path: "drgElement.1.name",
                  id: "InputData_1lse6r4",
                },
                value: "Student",
              },
            ],
          },
        },
      });
    });

    test("should detect properties change", async () => {
      const result = await computeDiff(
        inputDataPropertiesOld,
        inputDataPropertiesNew
      );

      expect(result).toMatchObject({
        InputData_1lse6r4: {
          changeType: "modified",
          changes: {
            added: [
              {
                location: {
                  path: "drgElement.1.description",
                  id: "InputData_1lse6r4",
                },
                value: "Student description",
              },
            ],
            modified: [
              {
                location: {
                  path: "drgElement.1.name",
                  id: "InputData_1lse6r4",
                },
                oldValue: "Student",
                newValue: "Students",
              },
            ],
          },
        },
      });
    });
  });

  describe("Decision element", () => {
    test("should detect addition", async () => {
      const result = await computeDiff(
        decisionAdditionOld,
        decisionAdditionNew
      );

      expect(result).toMatchObject({
        InformationRequirement_14xm9v3: {
          changeType: "added",
          changes: {
            added: [
              {
                location: {
                  path: "drgElement.0.informationRequirement.1",
                  id: "InformationRequirement_14xm9v3",
                },
                value: {
                  $type: "dmn:InformationRequirement",
                  id: "InformationRequirement_14xm9v3",
                  requiredDecision: {
                    $type: "dmn:DMNElementReference",
                    href: "#Decision_1loqm2b",
                  },
                },
              },
            ],
          },
        },
        Decision_1loqm2b: {
          changeType: "added",
          changes: {
            added: [
              {
                location: {
                  path: "drgElement.2",
                  id: "Decision_1loqm2b",
                },
                value: {
                  $type: "dmn:Decision",
                  id: "Decision_1loqm2b",
                },
              },
            ],
          },
        },
      });
    });

    test("should detect removal", async () => {
      const result = await computeDiff(
        decisionAdditionNew,
        decisionAdditionOld
      );

      expect(result).toMatchObject({
        InformationRequirement_14xm9v3: {
          changeType: "removed",
          changes: {
            removed: [
              {
                location: {
                  path: "drgElement.0.informationRequirement.1",
                  id: "InformationRequirement_14xm9v3",
                },
                value: {
                  $type: "dmn:InformationRequirement",
                  id: "InformationRequirement_14xm9v3",
                  requiredDecision: {
                    $type: "dmn:DMNElementReference",
                    href: "#Decision_1loqm2b",
                  },
                },
              },
            ],
          },
        },
        Decision_1loqm2b: {
          changeType: "removed",
          changes: {
            removed: [
              {
                location: {
                  path: "drgElement.2",
                  id: "Decision_1loqm2b",
                },
                value: {
                  $type: "dmn:Decision",
                  id: "Decision_1loqm2b",
                },
              },
            ],
          },
        },
      });
    });

    test("should detect modification", async () => {
      const result = await computeDiff(
        decisionModificationOld,
        decisionModificationNew
      );

      expect(result).toMatchObject({
        Decision_1loqm2b: {
          changeType: "modified",
          changes: {
            added: [
              {
                location: {
                  path: "drgElement.2.name",
                  id: "Decision_1loqm2b",
                },
                value: "Decide if under 18",
              },
              {
                location: {
                  path: "drgElement.2.description",
                  id: "Decision_1loqm2b",
                },
                value: "Empty decision description",
              },
              {
                location: {
                  path: "drgElement.2.question",
                  id: "Decision_1loqm2b",
                },
                value: "Empty decision question",
              },
            ],
          },
        },
      });
    });

    test("should detect properties change", async () => {
      const result = await computeDiff(
        decisionPropertiesOld,
        decisionPropertiesNew
      );

      expect(result).toMatchObject({
        Decision_1loqm2b: {
          changeType: "modified",
          changes: {
            modified: [
              {
                location: {
                  path: "drgElement.2.description",
                  id: "Decision_1loqm2b",
                },
                oldValue: "Empty decision description",
                newValue: "Empty decision description changed",
              },
              {
                location: {
                  path: "drgElement.2.question",
                  id: "Decision_1loqm2b",
                },
                oldValue: "Empty decision question",
                newValue: "Empty decision question changed",
              },
            ],
          },
        },
      });
    });

    test("should detect change to literal expression", async () => {
      const result = await computeDiff(
        decisionTypeChangeOld,
        decisionTypeChangeNew
      );

      expect(result).toMatchObject({
        Decision_1loqm2b: {
          changeType: "modified",
          changes: {
            added: [
              {
                location: {
                  path: "drgElement.2.variable",
                  id: "InformationItem_1u2we5r",
                },
                value: {
                  $type: "dmn:InformationItem",
                  id: "InformationItem_1u2we5r",
                },
              },
              {
                location: {
                  path: "drgElement.2.decisionLogic",
                  id: "LiteralExpression_0h39fr6",
                },
                value: {
                  $type: "dmn:LiteralExpression",
                  id: "LiteralExpression_0h39fr6",
                },
              },
            ],
            removed: [
              {
                location: {
                  path: "drgElement.2.description",
                  id: "Decision_1loqm2b",
                },
                value: "Empty decision description changed",
              },
              {
                location: {
                  path: "drgElement.2.question",
                  id: "Decision_1loqm2b",
                },
                value: "Empty decision question changed",
              },
            ],
          },
        },
      });
    });
  });

  describe("Business knowledge model element", () => {
    test("should detect addition", async () => {
      const result = await computeDiff(
        businessKnowledgeModelAdditionOld,
        businessKnowledgeModelAdditionNew
      );

      expect(result).toMatchObject({
        Decision_1loqm2b: {
          changeType: "modified",
          changes: {
            added: [
              {
                location: {
                  path: "drgElement.2.knowledgeRequirement",
                  id: "KnowledgeRequirement_0aavqw4",
                },
                value: {
                  $type: "dmn:KnowledgeRequirement",
                  id: "KnowledgeRequirement_0aavqw4",
                  requiredKnowledge: {
                    $type: "dmn:DMNElementReference",
                    href: "#BusinessKnowledgeModel_0m5x0lw",
                  },
                },
              },
            ],
          },
        },
        BusinessKnowledgeModel_0m5x0lw: {
          changeType: "added",
          changes: {
            added: [
              {
                location: {
                  path: "drgElement.3",
                  id: "BusinessKnowledgeModel_0m5x0lw",
                },
                value: {
                  $type: "dmn:BusinessKnowledgeModel",
                  id: "BusinessKnowledgeModel_0m5x0lw",
                },
              },
            ],
          },
        },
      });
    });

    test("should detect removal", async () => {
      const result = await computeDiff(
        businessKnowledgeModelAdditionNew,
        businessKnowledgeModelAdditionOld
      );

      expect(result).toMatchObject({
        Decision_1loqm2b: {
          changeType: "modified",
          changes: {
            removed: [
              {
                location: {
                  path: "drgElement.2.knowledgeRequirement",
                  id: "KnowledgeRequirement_0aavqw4",
                },
                value: {
                  $type: "dmn:KnowledgeRequirement",
                  id: "KnowledgeRequirement_0aavqw4",
                  requiredKnowledge: {
                    $type: "dmn:DMNElementReference",
                    href: "#BusinessKnowledgeModel_0m5x0lw",
                  },
                },
              },
            ],
          },
        },
        BusinessKnowledgeModel_0m5x0lw: {
          changeType: "removed",
          changes: {
            removed: [
              {
                location: {
                  path: "drgElement.3",
                  id: "BusinessKnowledgeModel_0m5x0lw",
                },
                value: {
                  $type: "dmn:BusinessKnowledgeModel",
                  id: "BusinessKnowledgeModel_0m5x0lw",
                },
              },
            ],
          },
        },
      });
    });

    test("should detect modification", async () => {
      const result = await computeDiff(
        businessKnowledgeModelModificationOld,
        businessKnowledgeModelModificationNew
      );

      expect(result).toMatchObject({
        BusinessKnowledgeModel_0m5x0lw: {
          changeType: "modified",
          changes: {
            added: [
              {
                location: {
                  path: "drgElement.3.name",
                  id: "BusinessKnowledgeModel_0m5x0lw",
                },
                value: "isUnder18",
              },
            ],
          },
        },
      });
    });

    test("should detect change to literal expression", async () => {
      const result = await computeDiff(
        businessKnowledgeModelTypeChangeOld,
        businessKnowledgeModelTypeChangeNew
      );

      expect(result).toMatchObject({
        BusinessKnowledgeModel_0m5x0lw: {
          changeType: "modified",
          changes: {
            added: [
              {
                location: {
                  path: "drgElement.3.variable",
                  id: "InformationItem_0ep2qcs",
                },
                value: {
                  $type: "dmn:InformationItem",
                  id: "InformationItem_0ep2qcs",
                },
              },
              {
                location: {
                  path: "drgElement.3.encapsulatedLogic",
                  id: "FunctionDefinition_0e5nebi",
                },
                value: {
                  $type: "dmn:FunctionDefinition",
                  id: "FunctionDefinition_0e5nebi",
                  body: {
                    $type: "dmn:LiteralExpression",
                    id: "LiteralExpression_1xxkcvr",
                  },
                },
              },
            ],
          },
        },
      });
    });
  });

  describe("Knowledge source element", () => {
    test("should detect addition", async () => {
      const result = await computeDiff(
        knowledgeSourceAdditionOld,
        knowledgeSourceAdditionNew
      );

      expect(result).toMatchObject({
        Decision_1loqm2b: {
          changeType: "modified",
          changes: {
            added: [
              {
                location: {
                  path: "drgElement.2.authorityRequirement",
                  id: "AuthorityRequirement_1c0kaw2",
                },
                value: {
                  $type: "dmn:AuthorityRequirement",
                  id: "AuthorityRequirement_1c0kaw2",
                  requiredAuthority: {
                    $type: "dmn:DMNElementReference",
                    href: "#KnowledgeSource_1hmxfnc",
                  },
                },
              },
            ],
          },
        },
        KnowledgeSource_1hmxfnc: {
          changeType: "added",
          changes: {
            added: [
              {
                location: {
                  path: "drgElement.4",
                  id: "KnowledgeSource_1hmxfnc",
                },
                value: {
                  $type: "dmn:KnowledgeSource",
                  id: "KnowledgeSource_1hmxfnc",
                },
              },
            ],
          },
        },
      });
    });

    test("should detect removal", async () => {
      const result = await computeDiff(
        knowledgeSourceAdditionNew,
        knowledgeSourceAdditionOld
      );

      expect(result).toMatchObject({
        Decision_1loqm2b: {
          changeType: "modified",
          changes: {
            removed: [
              {
                location: {
                  path: "drgElement.2.authorityRequirement",
                  id: "AuthorityRequirement_1c0kaw2",
                },
                value: {
                  $type: "dmn:AuthorityRequirement",
                  id: "AuthorityRequirement_1c0kaw2",
                  requiredAuthority: {
                    $type: "dmn:DMNElementReference",
                    href: "#KnowledgeSource_1hmxfnc",
                  },
                },
              },
            ],
          },
        },
        KnowledgeSource_1hmxfnc: {
          changeType: "removed",
          changes: {
            removed: [
              {
                location: {
                  path: "drgElement.4",
                  id: "KnowledgeSource_1hmxfnc",
                },
                value: {
                  $type: "dmn:KnowledgeSource",
                  id: "KnowledgeSource_1hmxfnc",
                },
              },
            ],
          },
        },
      });
    });

    test("should detect modification", async () => {
      const result = await computeDiff(
        knowledgeSourceModificationOld,
        knowledgeSourceModificationNew
      );

      expect(result).toMatchObject({
        KnowledgeSource_1hmxfnc: {
          changeType: "modified",
          changes: {
            added: [
              {
                location: {
                  path: "drgElement.4.name",
                  id: "KnowledgeSource_1hmxfnc",
                },
                value: "Knowledge source",
              },
              {
                location: {
                  path: "drgElement.4.description",
                  id: "KnowledgeSource_1hmxfnc",
                },
                value: "Ks documentation",
              },
            ],
          },
        },
      });
    });
  });

  describe("Root level attributes", () => {
    test("should detect changes in root level attributes", async () => {
      // Execution platform version
      const result = await computeDiff(
        executionPlatformVersionOld,
        executionPlatformVersionNew
      );
      expect(result).toMatchObject({
        Definitions_0cx0vqk: {
          changes: {
            modified: [
              {
                location: {
                  path: "executionPlatformVersion",
                  id: null,
                },
                oldValue: "8.5.0",
                newValue: "8.7.0",
              },
            ],
          },
        },
      });

      // Name & description
      const result2 = await computeDiff(
        nameAndDescriptionOld,
        nameAndDescriptionNew
      );
      expect(result2).toMatchObject({
        Definitions_0cx0vqk: {
          changes: {
            added: [
              {
                location: {
                  path: "description",
                  id: null,
                },
                value: "DRD Description",
              },
            ],
            modified: [
              {
                location: {
                  path: "name",
                  id: null,
                },
                oldValue: "DRDD",
                newValue: "DRD Diagram",
              },
            ],
          },
        },
      });
    });
  });
});
