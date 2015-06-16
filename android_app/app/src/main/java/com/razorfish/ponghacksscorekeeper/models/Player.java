package com.razorfish.ponghacksscorekeeper.models;

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

    public Player(int userId, String email, String name, String mentionName, String avatarUrl, int score) {
        this.userId = userId;
        this.email = email;
        this.name = name;
        this.mentionName = mentionName;
        this.avatarUrl = avatarUrl;
        this.score = score;
    }

    public Player() {
        userId = -1;
        score = -1;
    }

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

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setMentionName(String mentionName) {
        this.mentionName = mentionName;
    }

    public void setAvatarUrl(String avatarUrl) {
        this.avatarUrl = avatarUrl;
    }
}
