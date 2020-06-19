package com.itamar.gamemanager.model;

import java.util.Map;

public interface GameManager
{
	Map<String, Integer> getGameLeaderBoard(Long gameId);

	AnswerResult processPlayerMove(PlayerAnswerMove answer);
}
