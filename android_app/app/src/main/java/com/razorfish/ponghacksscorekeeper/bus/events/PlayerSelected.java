package com.razorfish.ponghacksscorekeeper.bus.events;

import com.razorfish.ponghacksscorekeeper.Retrofit.PlayerListModel;

/**
 * Created by timothy.lau on 2015-06-08.
 */
public class PlayerSelected {
    PlayerListModel.Player player;
    String type;

    public PlayerSelected(PlayerListModel.Player player, String type) {
        this.player = player;
        this.type = type;
    }

    public PlayerListModel.Player getPlayer() {
        return player;
    }

    public String getType() {
        return type;
    }
}
