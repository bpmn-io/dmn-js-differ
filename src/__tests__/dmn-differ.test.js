import DmnModdle from "dmn-moddle";
import { describe, expect, test } from "vitest";

import DmnDiffer from "../dmn-differ";

describe("DmnDiffer", function () {
  test("should compute changes between two moddle definitions", async function () {
    const moddle = new DmnModdle();
    const { rootElement: oldDefinitions } = await moddle.fromXML(oldXml);
    const { rootElement: newDefinitions } = await moddle.fromXML(newXml);

    const differ = new DmnDiffer();

    const diff = differ.compute(oldDefinitions, newDefinitions);

    expect(diff).toMatchObject({
      Decision_1ukmnt4: {
        changeType: "modified",
        changes: {
          added: [
            {
              location: {
                path: "drgElement.0.decisionLogic.input.0.label",
                id: "Input_1",
              },
              value: "Engagement score",
            },
            {
              location: {
                path: "drgElement.0.decisionLogic.input.1",
                id: "InputClause_0xim9r0",
              },
              value: {
                $type: "dmn:InputClause",
                id: "InputClause_0xim9r0",
                label: "User Status",
                inputExpression: {
                  $type: "dmn:LiteralExpression",
                  id: "LiteralExpression_014c3d9",
                  typeRef: "string",
                  text: "",
                },
                inputValues: {
                  $type: "dmn:UnaryTests",
                  id: "UnaryTests_1a5xgq2",
                  text: '"VIP","Regular"',
                },
              },
            },
            {
              location: {
                path: "drgElement.0.decisionLogic.output.0.label",
                id: "Output_1",
              },
              value: "isEligible",
            },
            {
              location: {
                path: "drgElement.0.decisionLogic.output.0.name",
                id: "Output_1",
              },
              value: "eligibleForUpgrade",
            },
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
                    text: ">= 30",
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
                    text: "false",
                  },
                ],
              },
            },
          ],
          modified: [
            {
              location: {
                path: "drgElement.0.name",
                id: "Decision_1ukmnt4",
              },
              oldValue: "Decision 1",
              newValue: "Decide on upgrade",
            },
            {
              location: {
                path: "drgElement.0.decisionLogic.input.0.inputExpression.typeRef",
                id: "InputExpression_1",
              },
              oldValue: "string",
              newValue: "number",
            },
            {
              location: {
                path: "drgElement.0.decisionLogic.input.0.inputExpression.text",
                id: "InputExpression_1",
              },
              oldValue: "",
              newValue: "CalculateEngagementScore",
            },
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
                name: "Students",
                description: "Student description",
              },
            },
          ],
        },
      },
    });
  });
});

const oldXml = `<?xml version="1.0" encoding="UTF-8"?>
<definitions xmlns="https://www.omg.org/spec/DMN/20191111/MODEL/" xmlns:dmndi="https://www.omg.org/spec/DMN/20191111/DMNDI/" xmlns:dc="http://www.omg.org/spec/DMN/20180521/DC/" xmlns:modeler="http://camunda.org/schema/modeler/1.0" id="Definitions_0cx0vqk" name="DRD" namespace="http://camunda.org/schema/1.0/dmn" exporter="Camunda Modeler" exporterVersion="5.27.0" modeler:executionPlatform="Camunda Cloud" modeler:executionPlatformVersion="8.5.0">
  <decision id="Decision_1ukmnt4" name="Decision 1">
    <decisionTable id="DecisionTable_18tk2si">
      <input id="Input_1">
        <inputExpression id="InputExpression_1" typeRef="string">
          <text></text>
        </inputExpression>
      </input>
      <output id="Output_1" typeRef="string" />
    </decisionTable>
  </decision>
  <dmndi:DMNDI>
    <dmndi:DMNDiagram>
      <dmndi:DMNShape dmnElementRef="Decision_1ukmnt4">
        <dc:Bounds height="80" width="180" x="160" y="100" />
      </dmndi:DMNShape>
    </dmndi:DMNDiagram>
  </dmndi:DMNDI>
</definitions>`;

const newXml = `<?xml version="1.0" encoding="UTF-8"?>
<definitions xmlns="https://www.omg.org/spec/DMN/20191111/MODEL/" xmlns:dmndi="https://www.omg.org/spec/DMN/20191111/DMNDI/" xmlns:dc="http://www.omg.org/spec/DMN/20180521/DC/" xmlns:modeler="http://camunda.org/schema/modeler/1.0" xmlns:di="http://www.omg.org/spec/DMN/20180521/DI/" id="Definitions_0cx0vqk" name="DRD" namespace="http://camunda.org/schema/1.0/dmn" exporter="Camunda Modeler" exporterVersion="5.27.0" modeler:executionPlatform="Camunda Cloud" modeler:executionPlatformVersion="8.5.0">
  <decision id="Decision_1ukmnt4" name="Decide on upgrade">
    <informationRequirement id="InformationRequirement_065xv2q">
      <requiredInput href="#InputData_1lse6r4" />
    </informationRequirement>
    <decisionTable id="DecisionTable_18tk2si" hitPolicy="FIRST">
      <input id="Input_1" label="Engagement score">
        <inputExpression id="InputExpression_1" typeRef="number">
          <text>CalculateEngagementScore</text>
        </inputExpression>
      </input>
      <input id="InputClause_0xim9r0" label="User Status">
        <inputExpression id="LiteralExpression_014c3d9" typeRef="string">
          <text></text>
        </inputExpression>
        <inputValues id="UnaryTests_1a5xgq2">
          <text>"VIP","Regular"</text>
        </inputValues>
      </input>
      <output id="Output_1" label="isEligible" name="eligibleForUpgrade" typeRef="boolean" />
      <rule id="DecisionRule_0isgy03">
        <inputEntry id="UnaryTests_0d9szy0">
          <text>&gt;= 30</text>
        </inputEntry>
        <inputEntry id="UnaryTests_0kqwra8">
          <text>"VIP"</text>
        </inputEntry>
        <outputEntry id="LiteralExpression_1toqt6o">
          <text>false</text>
        </outputEntry>
      </rule>
    </decisionTable>
  </decision>
  <inputData id="InputData_1lse6r4" name="Students">
    <description>Student description</description>
  </inputData>
  <dmndi:DMNDI>
    <dmndi:DMNDiagram>
      <dmndi:DMNShape dmnElementRef="Decision_1ukmnt4">
        <dc:Bounds height="80" width="180" x="240" y="230" />
      </dmndi:DMNShape>
      <dmndi:DMNShape id="DMNShape_0xg9zk8" dmnElementRef="InputData_1lse6r4">
        <dc:Bounds height="45" width="125" x="117" y="87" />
      </dmndi:DMNShape>
      <dmndi:DMNEdge id="DMNEdge_0fhe6r5" dmnElementRef="InformationRequirement_065xv2q">
        <di:waypoint x="180" y="132" />
        <di:waypoint x="330" y="210" />
        <di:waypoint x="330" y="230" />
      </dmndi:DMNEdge>
    </dmndi:DMNDiagram>
  </dmndi:DMNDI>
</definitions>
`;
