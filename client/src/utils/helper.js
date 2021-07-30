export function newStationScore(current, stationId, targetId) {
  const newArray = current.map((station, index) => {
    if (index === stationId) {
      return station.map((target, index) => {
        if (index === targetId) {
          return !target;
        } else {
          return target;
        }
      });
    } else {
      return station;
    }
  });
  return newArray;
}

export function tallyScore(game) {
  let total = 0;
  game.map((station) => {
    station.map((target) => {
      if (target) {
        total++;
      }
    });
  });
  return total;
}
