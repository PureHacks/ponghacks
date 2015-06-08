package com.razorfish.ponghacksscorekeeper.Retrofit;

import com.razorfish.ponghacksscorekeeper.bus.events.LoadPlayers;
import com.razorfish.ponghacksscorekeeper.bus.events.PlayersListResponse;
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
    private PlayerListModel.PlayerListInterface mApi;
    private Bus mBus;

    public PlayerListService(PlayerListModel.PlayerListInterface listInterface, Bus bus) {
        mApi = listInterface;
        mBus = bus;
    }

    @Subscribe
    public void onLoadPlayers(LoadPlayers busLoadPlayers) {
        mApi.playerListResults(new Callback<ArrayList<PlayerListModel.Player>>() {
            @Override
            public void success(ArrayList<PlayerListModel.Player> players, Response response) {
                mBus.post(new PlayersListResponse(players));
            }

            @Override
            public void failure(RetrofitError error) {

            }
        });
    }
}