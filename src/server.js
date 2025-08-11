const { port } = require("./config/env");
const app = require("./app");

app.listen(port, () => {
  console.log(`Server running on http://127.0.0.1:${port}`);
});
