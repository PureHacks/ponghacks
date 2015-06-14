package com.razorfish.ponghacksscorekeeper.Retrofit.Models;

/**
 * Created by timothy.lau on 2015-06-14.
 */
public class SubmitScoreModel {
    int winnerId;
    int loserId;
    int winnerScore;
    int loserScore;

    public SubmitScoreModel(int winnerId, int winnerScore, int loserId, int loserScore) {
        this.winnerId = winnerId;
        this.winnerScore = winnerScore;
        this.loserId = loserId;
        this.loserScore = loserScore;
    }

    public int getWinnerId() {
        return winnerId;
    }

    public int getLoserId() {
        return loserId;
    }

    public int getWinnerScore() {
        return winnerScore;
    }

    public int getLoserScore() {
        return loserScore;
    }
}
