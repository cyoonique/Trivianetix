const db = require('..data/userModel');
const fetch = require('node-fetch');
const statsModelController = {};
statsModelController.findLeaders = (req, res, next) => {
  const { id, username_fk, category_fk, score } = req.body;
  const text = `
  SELECT username_fk, category_fk, score
  FROM leaderboard
  WHERE score = `;
}