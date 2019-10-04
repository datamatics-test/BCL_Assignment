import categoryList from "../assets/categoryList.json";

export default function filterCategory(category) {
  const filtered = Object.keys(categoryList)
    .filter(key => {
      if (key.includes(category)) {
        return true;
      }
      if (category == "all") {
        return true;
      }
    })
    .reduce((obj, key) => {
      obj[key] = categoryList[key];
      return obj;
    }, {});

  // filtered["category A"].color = ["#EE70E9", "#8363F9"];
  // filtered["category B"].color = ["#3AD1BF", "#119BD2"];
  // filtered["category C"].color = ["#EE70E9", "#8363F9"];

  return filtered;
}
