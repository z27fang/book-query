const { default: Axios } = require("axios");

export async function queryBookByTitle(title, page, url="https://openlibrary.org/search.json"){
  try {
    const response = Axios.get(url + '?q=' + title + '&page=' + page);
    return response
  } catch (error) {
    return error.toString()
  }
}