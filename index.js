function testApi() {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "User-Agent": "insomnia/11.1.0",
    },
    body: '{"id":8}',
  };

  fetch("https://www.yegmuslimconnect.ca/api/views/daily", options)
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err));
}

testApi();
