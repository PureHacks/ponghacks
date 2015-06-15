package com.razorfish.ponghacksscorekeeper.models;

/**
 * Created by timothy.lau on 2015-06-14.
 */
public class SubmitScoreModel {
    int winnerUserId;
    int loserUserId;
    int winnerScore;
    int loserScore;

    public SubmitScoreModel(int winnerUserId, int winnerScore, int loserUserId, int loserScore) {
        this.winnerUserId = winnerUserId;
        this.winnerScore = winnerScore;
        this.loserUserId = loserUserId;
        this.loserScore = loserScore;
    }

    public int getWinnerUserId() {
        return winnerUserId;
    }

    public int getLoserUserId() {
        return loserUserId;
    }

    public int getWinnerScore() {
        return winnerScore;
    }

    public int getLoserScore() {
        return loserScore;
    }
}
