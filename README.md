# dmn-js-differ

A semantic diffing utility for DMN 1.3 documents.

## Usage

```js
import DmnDiffer from "dmn-js-differ";

const dmnDiffer = new DmnDiffer();
const diff = await dmnDiffer.compute(oldXml, newXml); // oldXml & newXml are the DMN XML strings
```

The diff returns an object.

- The keys are the IDs of elements shown in the DRD view that changed.
- Value is an object with the following keys:
  - `changeType` can be `added`, `modified` or `removed`
  - `changes` is a list of changes in the element classified into `added`, `modified` and `removed` changes

e.g.

```javascript
{
    "Decision_0mg65e5": {
        "changeType": "modified",
        "changes": {
            "added": [
                {
                    "location": {
                        "path": "drgElement.0.decisionLogic.input.1",
                        "id": "InputClause_0znn5y9"
                    },
                    "value": {
                        "$type": "dmn:InputClause",
                        "id": "InputClause_0znn5y9",
                        "width": 192,
                        "inputExpression": {
                            "$type": "dmn:LiteralExpression",
                            "id": "LiteralExpression_13cbdmf",
                            "typeRef": "string",
                            "text": ""
                        }
                    }
                },
                {
                    "location": {
                        "path": "drgElement.0.decisionLogic.rule.0.inputEntry.1",
                        "id": "UnaryTests_00ldruz"
                    },
                    "value": {
                        "$type": "dmn:UnaryTests",
                        "id": "UnaryTests_00ldruz",
                        "text": ""
                    }
                },
                {
                    "location": {
                        "path": "drgElement.0.decisionLogic.rule.1.inputEntry.1",
                        "id": "UnaryTests_1jjwf94"
                    },
                    "value": {
                        "$type": "dmn:UnaryTests",
                        "id": "UnaryTests_1jjwf94",
                        "text": ""
                    }
                },
                {
                    "location": {
                        "path": "drgElement.0.decisionLogic.rule.2.inputEntry.1",
                        "id": "UnaryTests_1kpt7p4"
                    },
                    "value": {
                        "$type": "dmn:UnaryTests",
                        "id": "UnaryTests_1kpt7p4",
                        "text": ""
                    }
                },
                {
                    "location": {
                        "path": "drgElement.0.decisionLogic.rule.3.inputEntry.1",
                        "id": "UnaryTests_19ll257"
                    },
                    "value": {
                        "$type": "dmn:UnaryTests",
                        "id": "UnaryTests_19ll257",
                        "text": ""
                    }
                }
            ],
            "modified": [
                {
                    "location": {
                        "path": "drgElement.0.decisionLogic.rule.1.outputEntry.0.text",
                        "id": "LiteralExpression_1k8g2eo"
                    },
                    "oldValue": "\"Roastbeef\"",
                    "newValue": "\"Schichtfleisch\""
                }
            ]
        }
    },
    "InformationRequirement_028fcpp": {
        "changeType": "added",
        "changes": {
            "added": [
                {
                    "location": {
                        "path": "drgElement.0.informationRequirement",
                        "id": "InformationRequirement_028fcpp"
                    },
                    "value": {
                        "$type": "dmn:InformationRequirement",
                        "id": "InformationRequirement_028fcpp",
                        "requiredDecision": {
                            "$type": "dmn:DMNElementReference",
                            "href": "#Decision_0srj17o"
                        }
                    }
                }
            ]
        }
    },
    "Decision_0srj17o": {
        "changeType": "added",
        "changes": {
            "added": [
                {
                    "location": {
                        "path": "drgElement.1",
                        "id": "Decision_0srj17o"
                    },
                    "value": {
                        "$type": "dmn:Decision",
                        "id": "Decision_0srj17o",
                        "name": "Beverages"
                    }
                }
            ]
        }
    }
}
```
