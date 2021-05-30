const BrowserStorageUtil = (storage) => {
  const setEntry = (key, entry) => {
    storage.setItem(key, JSON.stringify(entry));
  };
  const updateEntry = (key, entry) => {
    const allEntries = getEntry(key);
    allEntries[entry] = true;
    storage.setItem(key, JSON.stringify(allEntries));
  };
  const getEntry = (key) => {
    const entry = storage.getItem(key);
    if (!entry) return {};
    return JSON.parse(entry);
  };
  const clearEntry = (key) => {
    storage.removeItem(key);
  };
  const resetStorage = (data = {}) => {
    storage.clear();
    Object.keys(data).forEach((key) => {
      setEntry(key, data[key]);
    });
  };

  return {
    setEntry,
    updateEntry,
    getEntry,
    clearEntry,
    resetStorage,
  };
};

const localStorageUtil = BrowserStorageUtil(localStorage);
export {localStorageUtil};
