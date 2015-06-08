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

    @Override
    public void onCreate() {
        super.onCreate();
        playerListService = new PlayerListService(buildInterface(), bus);
        bus.register(playerListService);
        bus.register(this);
    }

    private PlayerListModel.PlayerListInterface buildInterface() {
        return new RestAdapter.Builder().setEndpoint(getString(R.string.endpoint)).setLogLevel(RestAdapter.LogLevel.FULL).build().create(PlayerListModel.PlayerListInterface.class);
    }
}
