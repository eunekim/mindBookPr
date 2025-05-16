//aiService.js
const axios = require('axios');

// OpenAI API 키 설정
const OPENAI_API_KEY = 'api키';  // 여기에 본인의 API 키를 입력

async function getFamousWorks(category) {
  console.log("getFamousWorks category :", category);
  const payload = {
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: `"${category}" 주제로 한국에서 유명한 도서 8가지 제목만 알려줘 형식은 title:"title"` }],

    temperature: 0.7,
    max_tokens: 300 // 토큰 제한 걸기 (너무 많이 나오지 않도록)
  };

  let retries = 5;
  let delay = 2000;

  for (let i = 0; i < retries; i++) {
    try {
      console.log("요청 내용:", JSON.stringify(payload, null, 2));
      const response = await axios.post("https://api.openai.com/v1/chat/completions", payload, {
        headers: {
          Authorization: `Bearer api키`, // 키는 생략 처리
          "Content-Type": "application/json",
        },
      });

      const result = response.data.choices[0].message.content;
      console.log("result :", result);

      const books = parseBooks(result);
      console.log("parseBooks :" , books);

      const images = await fetchAllBooks(books);
      console.log("html 전송값",images);

      return images;


    } catch (err) {
      if (err.response?.status === 429 && i < retries - 1) {
        console.log(`429 오류 발생. ${delay}ms 후 재시도 중...`);
        await new Promise((res) => setTimeout(res, delay));
        delay *= 2;
      } else if (err.response?.status === 401) {
        console.error("401 오류: 유효하지 않은 API 키입니다.");
        break;
      } else {
        console.error("OpenAI 요청 실패:", err.message);
        throw err;
      }
    }
  }

  return "유명 작품을 가져오는 데 실패했습니다.";
}
exports.getFamousWorks = getFamousWorks;

//GPT한테 받은거 JSON 으로 파싱 하기
function parseBooks(text) {
  const books = [];
  const lines = text.trim().split('\n');

  let currentBook = {};

  lines.forEach(line => {
    line = line.trim();

    if (/^\d+\.\s*title:/i.test(line)) {
      if (Object.keys(currentBook).length) {
        books.push(currentBook);
        currentBook = {};
      }
      const match = line.match(/title:\s*["“]?(.+?)["”]?$/i);
      if (match) currentBook.title = match[1].trim();
    } 
  });

  // 마지막 책 추가
  if (Object.keys(currentBook).length) {
    books.push(currentBook);
  }
  return books;
}

//네이버 api
async function searchBook(title) {
  const url = "https://openapi.naver.com/v1/search/book.json";
  const headers = {
    "X-Naver-Client-Id": "Jt9fIh27bUfekPfQ5IPj",
    "X-Naver-Client-Secret": "MpFUsfvpZ4",
  };

  const params = {
    query: title,
    display: 1,
  };

  try {
    const response = await axios.get(url, { params, headers });
    const item = response.data.items[0];

    if (!item) {
      console.warn(`❗ No result for "${title}"`);
      return null;
    }

    return {
      title: item.title.replace(/<[^>]+>/g, ""),
      author: item.author,
      isbn: item.isbn.split(' ')[1],
      image: item.image,
      description: item.description,
      link: item.link
    };
  } catch (error) {
    console.error(`❌ Error searching "${title}":`, error.message);
    return null;
  }
}
exports.searchBook = searchBook;


async function fetchAllBooks(titles) {
  const results = await Promise.all(
    titles
      .filter(item => item && item.title) // title이 있는 항목만
      .map(item => searchBook(item.title))
  );

  const validResults = results.filter(Boolean); // null 제거

  console.log(validResults);
  return validResults;
}

//마지막으로 선택된 도서 DB에 저장
function saveSelectedBook(book) {
  const books = [];
  const lines = text.trim().split('\n');

  let currentBook = {};

  lines.forEach(line => {
    line = line.trim();

    if (/^\d+\.\s*title:/i.test(line)) {
      if (Object.keys(currentBook).length) {
        books.push(currentBook);
        currentBook = {};
      }
      const match = line.match(/title:\s*["“]?(.+?)["”]?$/i);
      if (match) currentBook.title = match[1].trim();
    } 

  });

  // 마지막 책 추가
  if (Object.keys(currentBook).length) {
    books.push(currentBook);
  }
  return books;
}
exports.saveSelectedBook = saveSelectedBook;