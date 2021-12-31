export const housesSelector = (state: MainState) => state.houses;
export const currentHouseIdSelector = (state: MainState) => {
  return state.current_house_id?._id
    ? state.current_house_id?._id
    : Object.keys(state.houses).length
      ? Object.keys(state.houses)
        .filter((houseId) => houseId)
        .map((houseId) => state.houses[houseId])[0]?._id
      : "";
};