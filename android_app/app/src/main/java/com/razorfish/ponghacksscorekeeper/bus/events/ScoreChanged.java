package com.razorfish.ponghacksscorekeeper.bus.events;

/**
 * Created by timothy.lau on 2015-06-14.
 */
public class ScoreChanged {
    int newScore;
    String playerType;

    public ScoreChanged(int newScore, String playerType) {
        this.newScore = newScore;
        this.playerType = playerType;
    }

    public int getNewScore() {
        return newScore;
    }

    public String getPlayerType() {
        return playerType;
    }
}
