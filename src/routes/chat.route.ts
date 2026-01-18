import express from 'express';
import { protectRoute } from '../middleware/auth';
import { getChats, getOrCreateChat } from '../controllers/chat.controller';

const router = express.Router();

router.use(protectRoute);

router.get("/", getChats);
router.post("/with/:participantId", getOrCreateChat);

export default router;