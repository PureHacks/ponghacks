package com.razorfish.ponghacksscorekeeper.bus.events;

/**
 * Created by timothy.lau on 2015-06-15.
 */
public class PlayerIconPressed {

    String playerType;

    public PlayerIconPressed(String playerType) {
        this.playerType = playerType;
    }

    public String getPlayerType() {
        return playerType;
    }
}
