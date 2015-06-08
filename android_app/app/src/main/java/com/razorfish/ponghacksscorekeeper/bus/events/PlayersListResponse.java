package com.razorfish.ponghacksscorekeeper.bus.events;

import java.util.ArrayList;

/**
 * Created by Tim on 2015-06-07.
 */
public class PlayersListResponse {
    ArrayList response;

    public PlayersListResponse(ArrayList response) {
        this.response = response;
    }
}
