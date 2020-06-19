package com.itamar.gamemanager.model;

import java.util.Comparator;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;
import java.util.TreeSet;

public class DemoGameManager implements GameManager
{

	//game statistics consists of gameId -> questionId -> Set of playerAnswerMove
	Map<Long, Map<Long, Set<PlayerAnswerMove>>> gamesStatistics = new HashMap<>();

	//the leader board will hold for each game the accumulated score for every player
	Map<Long, Map<String, Integer>> leaderBoard = new HashMap<>();

	@Override
	public Map<String, Integer> getGameLeaderBoard(Long gameId)
	{
		return leaderBoard.getOrDefault(gameId, null);
	}

	/**
	 * updates the in memory map with the latest player move along with a random result.
	 *
	 * @param playerAnswerMove
	 * @return AnswerResult the random result and score
	 */
	@Override
	public AnswerResult processPlayerMove(PlayerAnswerMove playerAnswerMove)
	{
		try {
			generateRandomResult(playerAnswerMove);
			updateGameStatistics(playerAnswerMove);
			updateLeaderBoard(playerAnswerMove);
			return playerAnswerMove.getAnswerResult();

		}
		catch (Exception e) {
			System.out.println("failure in updating the players last move" + e);
			return null;
		}
	}

	private void updateGameStatistics(PlayerAnswerMove playerAnswerMove)
	{
		Map<Long, Set<PlayerAnswerMove>> gameQuestions = gamesStatistics.putIfAbsent(playerAnswerMove.getGameId(), new HashMap<>());
		Set<PlayerAnswerMove> playerAnswerMoves = gameQuestions
				.putIfAbsent(playerAnswerMove.getQuestionId(), new TreeSet<>(Comparator.comparing(PlayerAnswerMove::getAnswerResult)));
		playerAnswerMoves.add(playerAnswerMove);
	}

	private void updateLeaderBoard(PlayerAnswerMove playerAnswerMove)
	{
		Map<String, Integer> usersScores = leaderBoard.putIfAbsent(playerAnswerMove.getGameId(), new HashMap<>());
		usersScores.putIfAbsent(playerAnswerMove.getUserName(), playerAnswerMove.getAnswerResult().getPointsEarned());
	}

	/**
	 * sets a random result which corresponds to the answer.
	 * the score will be either 0 or 1
	 *
	 * @param playerAnswerMove
	 */
	private void generateRandomResult(PlayerAnswerMove playerAnswerMove)
	{
		double score = Math.floor(Math.random() + 0.5);
		AnswerResult.Status status = score < 1L ? AnswerResult.Status.WRONG : AnswerResult.Status.CORRECT;
		playerAnswerMove.setAnswerResult(new AnswerResult(status, (int) score));
	}
}
