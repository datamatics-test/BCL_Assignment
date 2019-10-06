import categoryList from "../assets/categoryList.json";

export default function filterCategory(category, searchText) {
  var categoryListCopy = JSON.parse(JSON.stringify(categoryList));
  const filtered = Object.keys(categoryListCopy)
    .filter(key => {
      if (key.includes(category)) {
        categoryListCopy[key] = filterBySearch(searchText, key);
        return true;
      }
      if (category == "all") {
        categoryListCopy[key] = filterBySearch(searchText, key);
        return true;
      }
    })
    .reduce((obj, key) => {
      obj[key] = categoryListCopy[key];
      return obj;
    }, {});
  return filtered;
}

function filterBySearch(searchText, key) {
  var filteredArray = categoryList[key].filter(obj => {
    if (
      obj.status.toLowerCase().includes(searchText.toLowerCase()) ||
      obj.type.toLowerCase().includes(searchText.toLowerCase()) ||
      obj.balance.toString().includes(searchText.toString())
    ) {
      return true;
    } else return false;
  });
  return filteredArray;
}
