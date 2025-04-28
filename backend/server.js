require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.json()); // built-in JSON parser
app.use(require('cors')());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});