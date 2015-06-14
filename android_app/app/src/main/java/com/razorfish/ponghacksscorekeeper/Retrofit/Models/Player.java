package com.razorfish.ponghacksscorekeeper.Retrofit.Models;

/**
 * Created by timothy.lau on 2015-06-14.
 */
public class Player {
    int userId;
    String email;
    String name;
    String mentionName;
    String avatarUrl;
    int score;

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

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }
}
