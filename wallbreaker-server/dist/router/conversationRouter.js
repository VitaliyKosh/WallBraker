"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ConversationController_1 = require("../controllers/ConversationController");
exports.default = (router, prefix, middlewares) => {
    router.get(`/${prefix}/all`, ...middlewares, ConversationController_1.ConversationController.getAllConversations);
    router.get(`/${prefix}/first`, ...middlewares, ConversationController_1.ConversationController.getFirstConversation);
    router.get(`/${prefix}/:id`, ...middlewares, ConversationController_1.ConversationController.getConversation);
    router.get(`/${prefix}/:id/getParticipants/`, ...middlewares, ConversationController_1.ConversationController.getParticipants);
    router.get(`/${prefix}/byUserId/:id`, ...middlewares, ConversationController_1.ConversationController.getUserConversation);
};
