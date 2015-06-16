package com.razorfish.ponghacksscorekeeper.Retrofit;

import android.util.Log;

import com.razorfish.ponghacksscorekeeper.bus.events.SubmitScoreResult;
import com.razorfish.ponghacksscorekeeper.bus.events.SubmitScores;
import com.razorfish.ponghacksscorekeeper.models.SubmitResponse;
import com.squareup.otto.Bus;
import com.squareup.otto.Subscribe;

import retrofit.Callback;
import retrofit.RetrofitError;
import retrofit.client.Response;

/**
 * Created by timothy.lau on 2015-06-14.
 */
public class SubmitScoreService {
    SubmitScoreQuery.SubmitScoreInterface mApi;
    Bus mBus;

    public SubmitScoreService(SubmitScoreQuery.SubmitScoreInterface api, Bus bus) {
        this.mApi = api;
        this.mBus = bus;
    }

    @Subscribe
    public void onSubmitScores(final SubmitScores submitScores) {
        Log.d("winner id and score", submitScores.getSubmitScoreModel().getWinnerUserId() + " - " + submitScores.getSubmitScoreModel().getWinnerScore());
        Log.d("loser id and score", submitScores.getSubmitScoreModel().getLoserUserId() + " - " + submitScores.getSubmitScoreModel().getLoserScore());
        mApi.submitScores(submitScores.getSubmitScoreModel(), new Callback<SubmitResponse>() {
            @Override
            public void success(SubmitResponse s, Response response) {
                Log.d("submitscores success", response.getBody().toString());
                mBus.post(new SubmitScoreResult(true));
            }

            @Override
            public void failure(RetrofitError error) {
                Log.d("submitscores callback", error.getBody().toString());
                mBus.post(new SubmitScoreResult(false));
            }
        });
    }
}
