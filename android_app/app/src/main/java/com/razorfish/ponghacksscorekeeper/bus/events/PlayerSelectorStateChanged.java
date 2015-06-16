package com.razorfish.ponghacksscorekeeper.bus.events;

/**
 * Created by timothy.lau on 2015-06-15.
 */
public class PlayerSelectorStateChanged {
    String transition;
    String playerType;

    public PlayerSelectorStateChanged(String playerType, String transition) {
        this.playerType = playerType;
        this.transition = transition;
    }

    public String getTransition() {
        return transition;
    }

    public String getPlayerType() {
        return playerType;
    }
}
