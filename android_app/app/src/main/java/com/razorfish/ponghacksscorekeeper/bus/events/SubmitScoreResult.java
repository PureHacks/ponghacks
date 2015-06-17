package com.razorfish.ponghacksscorekeeper.bus.events;

/**
 * Created by timothy.lau on 2015-06-16.
 */
public class SubmitScoreResult {
    Boolean success;

    public SubmitScoreResult(Boolean success) {
        this.success = success;
    }

    public Boolean getSuccess() {
        return success;
    }
}
