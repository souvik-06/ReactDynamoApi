const express = require("express");
const cors = require("cors");
const { 
  v1: uuidv1,
  v4: uuidv4,
} = require('uuid');


const app = express();
app.use(cors());

const {
  addOrUpdateQuestion,
  getQuestions,
  deleteQuestion,
  getQuestionById,
} = require("./dynamo");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/questions", async (req, res) => {
  try {
    const questions = await getQuestions();
    res.json(questions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: "Something went wrong" });
  }
});

app.get("/questions/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const question = await getQuestionById(id);
    res.json(question);
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: "Something went wrong" });
  }
});

app.post("/questions", async (req, res) => {

  const {question,answer} = req.body;
  let id=uuidv4();
  const data={question:question,answer:answer,questionId:id}
  try {
    const newQuestion = await addOrUpdateQuestion(data);
    res.json(newQuestion);
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: "Something went wrong" });
  }
});

app.put("/questions/:id", async (req, res) => {
  const question = req.body;
  const { id } = req.params;
  question.id = id;
  try {
    const newQuestion = await addOrUpdateQuestion(question);
    res.json(newQuestion);
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: "Something went wrong" });
  }
});

app.delete("/questions/:id", async (req, res) => {
  const { id } = req.params;
  try {
    res.json(await deleteQuestion(id));
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: "Something went wrong" });
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
