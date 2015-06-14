package com.razorfish.ponghacksscorekeeper.Retrofit;

import com.razorfish.ponghacksscorekeeper.models.Player;

import java.util.ArrayList;

import retrofit.Callback;
import retrofit.http.GET;
import retrofit.http.Query;

/**
 * Created by timothy.lau on 2015-06-06.
 */
public class PlayerListQuery {
    ArrayList<Player> results;

    public interface PlayerListInterface {
        @GET("/api/user/list")
        void playerListResults(@Query("") Callback<ArrayList<Player>> cb);

        @GET("/api/user/recent")
        void recentPlayerList(@Query("") Callback<ArrayList<Player>> cb);
    }
}
