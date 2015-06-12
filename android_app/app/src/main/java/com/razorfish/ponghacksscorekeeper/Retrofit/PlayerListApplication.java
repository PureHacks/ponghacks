package com.razorfish.ponghacksscorekeeper.Retrofit;

import android.app.Application;

import com.razorfish.ponghacksscorekeeper.R;
import com.razorfish.ponghacksscorekeeper.bus.BusProvider;
import com.squareup.otto.Bus;

import retrofit.RestAdapter;

/**
 * Created by Tim on 2015-06-07.
 */
public class PlayerListApplication extends Application {
    PlayerListService playerListService;
    Bus bus = BusProvider.getInstance();

    String playerType = "playerType";
    String defaultScore = "defaultScore";

    @Override
    public void onCreate() {
        super.onCreate();
        playerListService = new PlayerListService(buildInterface(), bus);
        bus.register(playerListService);
        bus.register(this);
    }

    private PlayerListModel.PlayerListInterface buildInterface() {
        RestAdapter.Builder builder = new RestAdapter.Builder();

//        return new RestAdapter.Builder().setEndpoint(getString(R.string.endpoint)).setLogLevel(RestAdapter.LogLevel.FULL).build().create(PlayerListModel.PlayerListInterface.class);
        return new RestAdapter.Builder().setClient(new MockClient()).setEndpoint(getString(R.string.endpoint)).setLogLevel(RestAdapter.LogLevel.FULL).build().create(PlayerListModel.PlayerListInterface.class);
    }

    public String getPlayerTypeString() {
        return playerType;
    }

    public String getDefaultScoreString() {
        return defaultScore;
    }
}
