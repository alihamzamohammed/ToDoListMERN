const app = require("./src/app");

const PORT = process.env.PORT || 5050;

app.listen(PORT, () => {
  console.log(`Express started on ${PORT}`);
});
