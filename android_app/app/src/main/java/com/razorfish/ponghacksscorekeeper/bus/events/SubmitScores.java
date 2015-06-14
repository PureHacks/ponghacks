package com.razorfish.ponghacksscorekeeper.bus.events;

import com.razorfish.ponghacksscorekeeper.Retrofit.Models.SubmitScoreModel;

/**
 * Created by timothy.lau on 2015-06-14.
 */
public class SubmitScores {
    SubmitScoreModel submitScoreModel;

    public SubmitScores(SubmitScoreModel submitScoreModel) {
        this.submitScoreModel = submitScoreModel;
    }

    public SubmitScoreModel getSubmitScoreModel() {
        return submitScoreModel;
    }
}
