const THREE_HOURS = 3 * 60 * 60 * 1000;

export const convertTimestamp = (timestamp) => new Date(timestamp * 1000);

// Return data for 3 hours from the last record
export const filterDataByTime = (data) => {
  const sortedData = data.sort((a, b) => a.dt - b.dt);
  const lastRecordTime = convertTimestamp(sortedData[sortedData.length - 1].dt);
  return sortedData.filter(({dt}) => lastRecordTime - convertTimestamp(dt) < THREE_HOURS);
};
