package com.razorfish.ponghacksscorekeeper.Retrofit;

import android.content.Context;
import android.database.sqlite.SQLiteDatabase;

import com.razorfish.ponghacksscorekeeper.R;

import java.util.ArrayList;

import retrofit.Callback;
import retrofit.RestAdapter;
import retrofit.RetrofitError;
import retrofit.client.Response;

/**
 * Created by timothy.lau on 2015-06-07.
 */
public class PlayersQuery {
    String endpoint;
    String query;
    RestAdapter restAdapter;
    SQLiteDatabase myDB;

    public PlayersQuery(String endpoint, final String query, final Context context) {
        this.endpoint = endpoint;
        this.query = query;

        restAdapter = new RestAdapter.Builder().setEndpoint(endpoint).setLogLevel(RestAdapter.LogLevel.FULL).build();

        PlayerListModel.PlayerListInterface playerListInterface = restAdapter.create(PlayerListModel.PlayerListInterface.class);

        playerListInterface.playerListResults(new Callback<ArrayList<PlayerListModel.Player>>() {
            @Override
            public void success(ArrayList<PlayerListModel.Player> players, Response response) {
                DataBaseHelper db = DataBaseHelper.getHelper(context);

                db.dropTables();

                for (PlayerListModel.Player player: players) {
                    db.addPlayer(player, DataBaseHelper.ALL_TABLE_NAME);
                }
            }

            @Override
            public void failure(RetrofitError error) {

            }
        });
    }
}
