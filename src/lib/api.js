const { default: Axios } = require("axios");

export async function queryBookByTitle(title, page){
  try {
    const response = Axios.get('http://openlibrary.org/search.json?q=' + title + '&page=' + page);
    return response
  } catch (error) {
    return error.toString()
  }
}