package com.razorfish.ponghacksscorekeeper.bus.events;

import java.util.ArrayList;

/**
 * Created by Tim on 2015-06-07.
 */
public class PlayersListResponse {
    ArrayList response;
    String queryType;
    String playerType;

    public PlayersListResponse(ArrayList response, String queryType, String playerType) {
        this.response = response;
        this.queryType = queryType;
        this.playerType = playerType;
    }

    public ArrayList getResponse() {
        return response;
    }

    public String getQueryType() {
        return queryType;
    }

    public String getPlayerType() {
        return playerType;
    }
}
