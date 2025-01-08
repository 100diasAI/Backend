const { Router } = require("express");
const { chatbotResponse } = require("../controllers/chatbot.controller");
const { isAuthenticated } = require("../controllers/user.controller");

const router = Router();

router.post("/", isAuthenticated, chatbotResponse);

module.exports = router; 