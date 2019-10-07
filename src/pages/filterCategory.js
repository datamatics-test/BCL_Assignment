/**
 * Created By: Mayank Chawla
 * Description: Used for Filtering result depending on the category selected or search text entered
 */
import categoryList from "../assets/categoryList.json";



/**
 * used for filtering result based on category
 * @param {*} category : Category Selected 
 * @param {*} searchText : search text
 */
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

/**
 * used for filtering result based on the search text entered
 * @param {*} searchText : Text used for sarrch
 * @param {*} key :category key
 */
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