package com.razorfish.ponghacksscorekeeper;

import android.app.Application;

import com.razorfish.ponghacksscorekeeper.R;
import com.razorfish.ponghacksscorekeeper.Retrofit.MockClient;
import com.razorfish.ponghacksscorekeeper.Retrofit.PlayerListQuery;
import com.razorfish.ponghacksscorekeeper.Retrofit.PlayerListService;
import com.razorfish.ponghacksscorekeeper.Retrofit.SubmitScoreQuery;
import com.razorfish.ponghacksscorekeeper.Retrofit.SubmitScoreService;
import com.razorfish.ponghacksscorekeeper.bus.BusProvider;
import com.squareup.otto.Bus;

import retrofit.RestAdapter;

/**
 * Created by Tim on 2015-06-07.
 */
public class PlayerListApplication extends Application {
    PlayerListService playerListService;
    SubmitScoreService submitScoreService;
    Bus bus = BusProvider.getInstance();

    String playerType = "playerType";
    String defaultScore = "defaultScore";

    @Override
    public void onCreate() {
        super.onCreate();
        playerListService = new PlayerListService(buidUserListQuery(), bus);
        bus.register(playerListService);
        submitScoreService = new SubmitScoreService(buildSubmitScoreQuery(), bus);
        bus.register(submitScoreService);
        bus.register(this);
    }

    private PlayerListQuery.PlayerListInterface buidUserListQuery() {
        return new RestAdapter.Builder().setEndpoint(getString(R.string.endpoint)).setLogLevel(RestAdapter.LogLevel.FULL).build().create(PlayerListQuery.PlayerListInterface.class);
//        return new RestAdapter.Builder().setClient(new MockClient()).setEndpoint(getString(R.string.endpoint)).setLogLevel(RestAdapter.LogLevel.FULL).build().create(PlayerListQuery.PlayerListInterface.class);
    }

    private SubmitScoreQuery.SubmitScoreInterface buildSubmitScoreQuery() {
        return new RestAdapter.Builder().setEndpoint(getString(R.string.endpoint)).setLogLevel(RestAdapter.LogLevel.FULL).build().create(SubmitScoreQuery.SubmitScoreInterface.class);
    }

    public String getPlayerTypeString() {
        return playerType;
    }

    public String getDefaultScoreString() {
        return defaultScore;
    }
}
