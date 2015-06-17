package com.razorfish.ponghacksscorekeeper.Retrofit;

import com.razorfish.ponghacksscorekeeper.bus.events.LoadPlayers;
import com.razorfish.ponghacksscorekeeper.bus.events.PlayersListResponse;
import com.razorfish.ponghacksscorekeeper.models.Player;
import com.squareup.otto.Bus;
import com.squareup.otto.Subscribe;

import java.util.ArrayList;

import retrofit.Callback;
import retrofit.RetrofitError;
import retrofit.client.Response;

/**
 * Created by Tim on 2015-06-07.
 */
public class PlayerListService {
    private PlayerListQuery.PlayerListInterface mApi;
    private Bus mBus;

    public PlayerListService(PlayerListQuery.PlayerListInterface listInterface, Bus bus) {
        mApi = listInterface;
        mBus = bus;
    }

    @Subscribe
    public void onLoadPlayers(final LoadPlayers busLoadPlayers) {
        if (busLoadPlayers.getQuery().equals("all")) {
            mApi.playerListResults(new Callback<ArrayList<Player>>() {
                @Override
                public void success(ArrayList<Player> players, Response response) {
                    mBus.post(new PlayersListResponse(players, "all", busLoadPlayers.getPlayerType()));
                }

                @Override
                public void failure(RetrofitError error) {

                }
            });
        } else {
            mApi.recentPlayerList(new Callback<ArrayList<Player>>() {
                @Override
                public void success(ArrayList<Player> players, Response response) {
                    mBus.post(new PlayersListResponse(players, "recent", busLoadPlayers.getPlayerType()));
                }

                @Override
                public void failure(RetrofitError error) {

                }
            });
        }

    }
}
