export const getAdded = (result) => {
  return result.added;
};

export const getRemoved = (result) => {
  return result.removed;
};

export const getModified = (result) => {
  return result.modified;
};

export const getLocation = (change) => {
  return change.location;
};

export const getLocationId = (change) => {
  return getLocation(change).id;
};

export const getLocationPath = (change) => {
  return getLocation(change).path;
};

export const getOldValue = (change) => {
  return change.oldValue;
};

export const getNewValue = (change) => {
  return change.newValue;
};

export const getValue = (change) => {
  return change.value;
};
