import { DiffPatcher } from "diffpatch";

import classifyChanges from "./modules/classify-changes";
import groupChanges from "./modules/group-changes";

class DmnDiffer {
  constructor() {
    this.diffpatcher = new DiffPatcher({
      objectHash: (obj) => obj.id || JSON.stringify(obj),
    });
  }

  /**
   * Compute the differences between two DMN XMLs.
   * @param {string} oldXML - The old DMN XML as a string.
   * @param {string} newXML - The new DMN XML as a string.
   * @returns {Promise<Object>} - A promise that resolves with the diff object (keys: IDs of DRD elements that changed, values: objects with the type of changes (changeType) and changes list (changes))
   */
  async compute(oldDefinitions, newDefinitions) {
    this._removeDi(oldDefinitions);
    this._removeDi(newDefinitions);

    const delta = this.diffpatcher.diff(oldDefinitions, newDefinitions);

    const classified = classifyChanges(delta, oldDefinitions, newDefinitions);
    const grouped = groupChanges(classified, oldDefinitions, newDefinitions);

    return grouped;
  }

  _removeDi(definitions) {
    if ("dmnDI" in definitions) {
      delete definitions["dmnDI"];
    }
  }
}

export default DmnDiffer;
