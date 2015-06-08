package com.razorfish.ponghacksscorekeeper.bus.events;

/**
 * Created by Tim on 2015-06-07.
 */
public class LoadPlayers {
    String query;

    public LoadPlayers(String query) {
        this.query = query;
    }
}