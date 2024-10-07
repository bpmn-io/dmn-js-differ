import DmnModdle from 'dmn-moddle';
import * as jsondiffpatch from 'jsondiffpatch';

function classifyChanges(delta, oldDefinitions, newDefinitions) {
  const changes = {
    added: [],
    removed: [],
    modified: [],
  };

  const getValue = (obj) => (Array.isArray(obj) ? obj[0] : obj);

  const extractId = (obj, path) => {
    let current = obj;
    let id;
    for (const key of path) {
      current = current[key];
      if (getValue(current)?.id) {
        id = getValue(current).id;
      }
    }
    return id || null;
  };

  const traverse = (delta, path = []) => {
    if (Array.isArray(delta)) {
      let changeType;
      if (delta.length === 1) {
        changeType = "added";
      } else if (delta.length === 3 && delta[1] === 0 && delta[2] === 0) {
        changeType = "removed";
      } else if (delta.length === 2) {
        changeType = "modified";
      }

      const [oldValue] = delta;
      const location = {
        path: path.join("."),
        id: extractId(
          changeType === "removed" ? oldDefinitions : newDefinitions,
          path
        ),
      };

      if (changeType === "added") {
        changes.added.push({ location, value: getValue(oldValue) });
      } else if (changeType === "removed") {
        changes.removed.push({ location, value: getValue(oldValue) });
      } else if (changeType === "modified") {
        changes.modified.push({ location, oldValue, newValue: delta[1] });
      }
    } else if (typeof delta === "object" && delta !== null) {
      for (const key in delta) {
        if (key === "_t") continue;
        traverse(
          delta[key],
          path.concat(key.startsWith("_") ? key.substring(1) : key)
        );
      }
    }
  };

  traverse(delta);
  return changes;
}

function groupChanges(diff, oldDefinitions, newDefinitions) {
  return _groupChanges(diff, oldDefinitions, newDefinitions);
}

const _groupChanges = (diff, oldDefinitions, newDefinitions) => {
  const grouped = {};

  Object.entries(diff).forEach(([changeType, changeList]) => {
    changeList.forEach((change) => {
      const { location } = change;
      const { path } = location;

      const drdElementType = _getDrdElementType(path);
      const drdElementPath = _extractPathUntilTarget(path, drdElementType);
      const drdElementId = _getDrdElementId(
        changeType === "removed" ? oldDefinitions : newDefinitions,
        drdElementPath
      );

      if (drdElementId) {
        // Set changeType
        _setDrdElementChangeType(
          grouped,
          oldDefinitions,
          newDefinitions,
          drdElementPath,
          drdElementId
        );
        // Set changes
        _ensureNestedProperty(
          grouped,
          drdElementId,
          "changes",
          changeType
        ).push(change);
      }
    });
  });

  return grouped;
};

const _getDrdElementType = (path) => {
  const DRD_ELEMENTS = new Set(["informationRequirement", "drgElement"]);

  for (let element of DRD_ELEMENTS) {
    if (path.includes(element)) {
      return element;
    }
  }
};

const _extractPathUntilTarget = (path, target) => {
  const regex = new RegExp(`(^|[\\w\\.]+\\.)(${target}(?:\\.\\d+)?)`);
  const match = path.match(regex);
  return match ? match[0].trim() : null;
};

const _getValueFromPath = (definitions, path) => {
  const keys = path.split(".");
  return keys.reduce((acc, key) => {
    const index = Number(key);
    return acc ? (isNaN(index) ? acc[key] : acc[index]) : undefined;
  }, definitions);
};

const _getDrdElement = (definitions, path) => {
  const drdElement = _getValueFromPath(definitions, path);
  if (Array.isArray(drdElement)) {
    return drdElement[0];
  }
  return drdElement;
};

const _getDrdElementId = (definitions, path) => {
  return _getDrdElement(definitions, path).id;
};

const _setDrdElementChangeType = (
  grouped,
  oldDefinitions,
  newDefinitions,
  drdElementPath,
  drdElementId
) => {
  const isChangeTypeNotAlreadySet = !grouped?.drdElementId?.changeType;
  if (isChangeTypeNotAlreadySet) {
    let drdElementChangeType;

    const isPresentInOld =
      _getDrdElement(oldDefinitions, drdElementPath) &&
      _getDrdElementId(oldDefinitions, drdElementPath) === drdElementId;
    const isPresentInNew =
      _getDrdElement(newDefinitions, drdElementPath) &&
      _getDrdElementId(newDefinitions, drdElementPath) === drdElementId;

    if (isPresentInOld && isPresentInNew) {
      drdElementChangeType = "modified";
    } else if (!isPresentInOld && isPresentInNew) {
      drdElementChangeType = "added";
    } else if (isPresentInOld && !isPresentInNew) {
      drdElementChangeType = "removed";
    }

    if (!grouped[drdElementId]) {
      grouped[drdElementId] = {};
    }
    grouped[drdElementId].changeType = drdElementChangeType;
  }
};

const _ensureNestedProperty = (obj, ...keys) => {
  const array = keys.reduce((current, key, index) => {
    if (!current[key]) {
      current[key] = index === keys.length - 1 ? [] : {};
    }
    return current[key];
  }, obj);

  return array;
};

class DmnDiffer {
  constructor() {
    this.moddle = new DmnModdle();
    this.diffpatcher = jsondiffpatch.create({
      objectHash: (obj) => obj.id || JSON.stringify(obj),
    });
  }

  /**
   * Compute the differences between two DMN XMLs.
   * @param {string} oldXML - The old DMN XML as a string.
   * @param {string} newXML - The new DMN XML as a string.
   * @returns {Promise<Object>} - A promise that resolves with the diff object (keys: IDs of DRD elements that changed, values: objects with the type of changes (changeType) and changes list (changes))
   */
  async compute(oldXML, newXML) {
    const oldDefinitions = await this._parseXML(oldXML);
    const newDefinitions = await this._parseXML(newXML);

    this._removeDi(oldDefinitions);
    this._removeDi(newDefinitions);

    const delta = this.diffpatcher.diff(oldDefinitions, newDefinitions);

    const classified = classifyChanges(delta, oldDefinitions, newDefinitions);
    const grouped = groupChanges(classified, oldDefinitions, newDefinitions);

    return grouped;
  }

  async _parseXML(xml) {
    const { rootElement } = await this.moddle.fromXML(xml, "dmn:Definitions");
    return rootElement;
  }

  _removeDi(definitions) {
    if ("dmnDI" in definitions) {
      delete definitions["dmnDI"];
    }
  }
}

export { DmnDiffer as default };
