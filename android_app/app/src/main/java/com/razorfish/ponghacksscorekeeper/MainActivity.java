package com.razorfish.ponghacksscorekeeper;

import android.graphics.Typeface;
import android.os.Bundle;
import android.support.v7.app.ActionBar;
import android.support.v7.app.ActionBarActivity;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import com.razorfish.ponghacksscorekeeper.bus.BusProvider;
import com.razorfish.ponghacksscorekeeper.bus.events.PlayerSelected;
import com.razorfish.ponghacksscorekeeper.bus.events.PlayerSelectorStateChanged;
import com.razorfish.ponghacksscorekeeper.bus.events.ScoreChanged;
import com.razorfish.ponghacksscorekeeper.bus.events.SubmitParamsChanged;
import com.razorfish.ponghacksscorekeeper.bus.events.SubmitScoreResult;
import com.razorfish.ponghacksscorekeeper.bus.events.SubmitScores;
import com.razorfish.ponghacksscorekeeper.helpers.SpinnerFragment;
import com.razorfish.ponghacksscorekeeper.models.Player;
import com.razorfish.ponghacksscorekeeper.models.SubmitScoreModel;
import com.squareup.otto.Bus;
import com.squareup.otto.Subscribe;


public class MainActivity extends ActionBarActivity {

    private Bus mBus = BusProvider.getInstance();
    Player winner = new Player();
    Player loser = new Player();
    OverlayFragment overlayFragment = new OverlayFragment();
    Boolean submittable = false;
    Button submitButton;
    ScoreFragment leftScore;
    ScoreFragment rightScore;
    SpinnerFragment spinnerFragment = new SpinnerFragment();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        ActionBar actionbar = getSupportActionBar();

        actionbar.setCustomView(R.layout.actionbar_title);
        actionbar.setDisplayOptions(ActionBar.DISPLAY_SHOW_CUSTOM);

        TextView matchDetailsText = (TextView) findViewById(R.id.matchDetails);
        Typeface matchDetailsFont = Typeface.createFromAsset(getAssets(), getString(R.string.fontMatchDetails));
        matchDetailsText.setTypeface(matchDetailsFont);

        leftScore = ScoreFragment.newInstance("winner");
        rightScore = ScoreFragment.newInstance("loser");

        winner.setScore(21);
        loser.setScore(15);

        getSupportFragmentManager().beginTransaction().add(R.id.leftScoreView, leftScore).add(R.id.rightScoreView, rightScore).commit();

        submitButton = (Button) this.findViewById(R.id.button4);
        Typeface submitButtonFont = Typeface.createFromAsset(getAssets(), getString(R.string.fontSubmitButton));
        submitButton.setTypeface(submitButtonFont);
        submitButton.setTransformationMethod(null);

        submitButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (submittable == false) {
                    Toast.makeText(getApplicationContext(), "Incorrect match parameters, match cannot be submitted.", Toast.LENGTH_SHORT).show();
                } else {
                    Toast.makeText(getApplicationContext(), "Submitting scores...", Toast.LENGTH_SHORT).show();

                    SubmitScoreModel submitScoreModel = new SubmitScoreModel(winner.getUserId(), winner.getScore(), loser.getUserId(), loser.getScore());
                    mBus.post(new SubmitScores(submitScoreModel));
                }
            }
        });

    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.menu_main, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();

        //noinspection SimplifiableIfStatement
        if (id == R.id.action_settings) {
            return true;
        }

        return super.onOptionsItemSelected(item);
    }

    @Subscribe
    public void onPlayerSelected(PlayerSelected event) {
        mBus.post(new SubmitParamsChanged());
        if (event.getType().equals("winner")) {
            int score = winner.getScore();
            winner = event.getPlayer();
            winner.setScore(score);
        } else if (event.getType().equals("loser")) {
            int score = loser.getScore();
            loser = event.getPlayer();
            loser.setScore(score);
        }
    }

    @Subscribe
    public void onScoreChanged(ScoreChanged event) {
        mBus.post(new SubmitParamsChanged());
        if (event.getPlayerType().equals("winner")) {
            winner.setScore(event.getNewScore());
        } else if (event.getPlayerType().equals("loser")) {
            loser.setScore(event.getNewScore());
        }
    }

    @Subscribe
    public void onPlayerSelectorStateChanged(PlayerSelectorStateChanged event) {
        String playerType = event.getPlayerType();
        View v = (playerType.equals("winner")) ? findViewById(R.id.rightScoreView) : findViewById(R.id.leftScoreView);

        if (event.getTransition().equals("open")) {
            getSupportFragmentManager().beginTransaction().add(v.getId(), overlayFragment, null).commit();
        } else if (event.getTransition().equals("close")) {
            getSupportFragmentManager().beginTransaction().remove(overlayFragment).commit();
        }
    }

    @Subscribe
    public void onSubmitParamsChanged(SubmitParamsChanged event) {
        Log.d("onSubmitParamsChanged", Integer.toString(winner.getUserId()) + " " + Integer.toString(winner.getScore()) + " " + Integer.toString(loser.getUserId()) + " " + Integer.toString(loser.getScore()));
        if (winner.getUserId() != -1 && loser.getUserId() != -1 && winner.getUserId() != loser.getUserId() && winner.getScore() >= 21 && (winner.getScore() - loser.getScore()) >= 2) {
            submittable = true;
            submitButton.setBackgroundColor(getResources().getColor(R.color.submitRed));
        } else {
            submittable = false;
            submitButton.setBackgroundColor(getResources().getColor(R.color.submitGrey));
        }
    }

    @Subscribe
    public void onSubmit(SubmitScores event) {
        getSupportFragmentManager().beginTransaction().add(findViewById(R.id.scoreViewFrame).getId(), spinnerFragment, null).commit();
        submitButton.setBackgroundColor(getResources().getColor(R.color.submitGrey));
    }

    @Subscribe
    public void onSubmitScoreResult(SubmitScoreResult event) {
        getSupportFragmentManager().beginTransaction().remove(spinnerFragment).commit();
        if (event.getSuccess()) {
            Toast.makeText(getApplicationContext(), "Match submitted!", Toast.LENGTH_SHORT).show();
            ResetFragments();
        } else {
            Toast.makeText(getApplicationContext(), "Submitting match scores not successful, please try again.", Toast.LENGTH_SHORT).show();
        }
        mBus.post(new SubmitParamsChanged());
    }

    @Override
    public void onResume() {
        super.onResume();
        mBus.register(this);
    }

    @Override
    public void onPause() {
        super.onPause();
        mBus.unregister(this);
    }

    private void ResetFragments() {
        getSupportFragmentManager().beginTransaction().remove(leftScore).remove(rightScore).commit();

        winner = new Player();
        loser = new Player();
        winner.setScore(21);
        loser.setScore(15);

        ScoreFragment leftScore = ScoreFragment.newInstance("winner");
        ScoreFragment rightScore = ScoreFragment.newInstance("loser");

        getSupportFragmentManager().beginTransaction().add(R.id.leftScoreView, leftScore).add(R.id.rightScoreView, rightScore).commit();
    }
}
