const { dynamoClient } = require("./connection");

const TABLE_NAME = "QuestionAnswer";
const getQuestions = async () => {
  const params = {
    TableName: TABLE_NAME,
  };
  const questions = await dynamoClient.scan(params).promise();
  return questions;
};

const getQuestionById = async (id) => {
  const params = {
    TableName: TABLE_NAME,
    Key: {
      questionId: id,
    },
  };
  return await dynamoClient.get(params).promise();
};

const addOrUpdateQuestion = async (question) => {
  const params = {
    TableName: TABLE_NAME,
    Item: question,
  };
  return await dynamoClient.put(params).promise();
};

const deleteQuestion = async (id) => {
  const params = {
    TableName: TABLE_NAME,
    Key: {
      id,
    },
  };
  return await dynamoClient.delete(params).promise();
};

module.exports = {
  dynamoClient,
  getQuestions,
  getQuestionById,
  addOrUpdateQuestion,
  deleteQuestion,
};
