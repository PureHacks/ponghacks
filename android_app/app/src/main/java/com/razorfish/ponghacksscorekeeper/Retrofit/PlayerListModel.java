package com.razorfish.ponghacksscorekeeper.Retrofit;

import java.util.ArrayList;
import java.util.List;

import retrofit.Callback;
import retrofit.http.GET;
import retrofit.http.Query;

/**
 * Created by timothy.lau on 2015-06-06.
 */
public class PlayerListModel {
    ArrayList<Player> results;

    public class Player {
        int userId;
        String email;
        String name;
        String mentionName;
        String avatarUrl;

        public int getUserId() {
            return userId;
        }

        public String getEmail() {
            return email;
        }

        public String getName() {
            return name;
        }

        public String getMentionName() {
            return mentionName;
        }

        public String getAvatarUrl() {
            return avatarUrl;
        }
    }

    public interface PlayerListInterface {
        @GET("/api/user/list")
        void playerListResults(@Query("") Callback<ArrayList<Player>> cb);

        @GET("/api/user/recent")
        void recentPlayerList(@Query("") Callback<ArrayList<Player>> cb);
    }
}
