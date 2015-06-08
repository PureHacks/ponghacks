package com.razorfish.ponghacksscorekeeper.bus.events;

/**
 * Created by Tim on 2015-06-07.
 */
public class LoadPlayers {
    String query;
    String playerType;

    public LoadPlayers(String query, String playerType) {
        this.query = query;
        this.playerType = playerType;
    }

    public String getQuery() {
        return query;
    }

    public String getPlayerType() {
        return playerType;
    }
}