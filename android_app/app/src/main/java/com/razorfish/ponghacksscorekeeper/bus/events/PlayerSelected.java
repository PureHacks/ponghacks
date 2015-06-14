package com.razorfish.ponghacksscorekeeper.bus.events;

import com.razorfish.ponghacksscorekeeper.Retrofit.Models.Player;

/**
 * Created by timothy.lau on 2015-06-08.
 */
public class PlayerSelected {
    Player player;
    String type;

    public PlayerSelected(Player player, String type) {
        this.player = player;
        this.type = type;
    }

    public Player getPlayer() {
        return player;
    }

    public String getType() {
        return type;
    }
}
