// aiController.js
const { getFamousWorks, searchBook } = require('../services/aiService');

const getFamousWorksFromOpenAI = async (category) => {
  const books = await getFamousWorks(category);
  const bookDetails = await Promise.all(books.map(b => searchBook(b.title)));
  return bookDetails.filter(Boolean);
};

module.exports = { getFamousWorksFromOpenAI };


