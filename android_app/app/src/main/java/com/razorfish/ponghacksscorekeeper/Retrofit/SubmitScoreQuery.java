package com.razorfish.ponghacksscorekeeper.Retrofit;

import com.razorfish.ponghacksscorekeeper.models.SubmitScoreModel;

import retrofit.Callback;
import retrofit.http.Body;
import retrofit.http.POST;

/**
 * Created by timothy.lau on 2015-06-14.
 */
public class SubmitScoreQuery {
    public interface SubmitScoreInterface {
        @POST("/api/game")
        void submitScores(@Body SubmitScoreModel submitScoreModel, Callback<String> cb);
    }
}
