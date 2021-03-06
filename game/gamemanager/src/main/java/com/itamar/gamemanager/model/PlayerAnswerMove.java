package com.itamar.gamemanager.model;

public class PlayerAnswerMove implements Comparable<PlayerAnswerMove>
{
	private String userName;
	private Long gameId;
	private Long questionId;
	private Long answerId;
	private AnswerResult answerResult;

	public PlayerAnswerMove()
	{
	}

	public PlayerAnswerMove(String userName, Long gameId, Long questionId, Long answerId)
	{
		this.userName = userName;
		this.gameId = gameId;
		this.questionId = questionId;
		this.answerId = answerId;
	}

	public String getUserName()
	{
		return userName;
	}

	public void setUserName(String userName)
	{
		this.userName = userName;
	}

	public Long getGameId()
	{
		return gameId;
	}

	public void setGameId(Long gameId)
	{
		this.gameId = gameId;
	}

	public Long getQuestionId()
	{
		return questionId;
	}

	public void setQuestionId(Long questionId)
	{
		this.questionId = questionId;
	}

	public Long getAnswerId()
	{
		return answerId;
	}

	public void setAnswerId(Long answerId)
	{
		this.answerId = answerId;
	}

	public AnswerResult getAnswerResult()
	{
		return answerResult;
	}

	public void setAnswerResult(AnswerResult answerResult)
	{
		this.answerResult = answerResult;
	}

	@Override
	public int compareTo(PlayerAnswerMove o)
	{
		return this.answerResult.compareTo(o.answerResult);
	}
}
