package com.razorfish.ponghacksscorekeeper;

import android.support.v7.app.ActionBarActivity;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;
import android.widget.Toast;

import com.razorfish.ponghacksscorekeeper.bus.events.PlayerSelectorStateChanged;
import com.razorfish.ponghacksscorekeeper.models.Player;
import com.razorfish.ponghacksscorekeeper.models.SubmitScoreModel;
import com.razorfish.ponghacksscorekeeper.bus.BusProvider;
import com.razorfish.ponghacksscorekeeper.bus.events.PlayerSelected;
import com.razorfish.ponghacksscorekeeper.bus.events.ScoreChanged;
import com.razorfish.ponghacksscorekeeper.bus.events.SubmitScores;
import com.squareup.otto.Bus;
import com.squareup.otto.Subscribe;


public class MainActivity extends ActionBarActivity {

    private Bus mBus = BusProvider.getInstance();
    Player winner = new Player();
    Player loser = new Player();
    OverlayFragment overlayFragment = new OverlayFragment();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        ScoreFragment leftScore = ScoreFragment.newInstance("winner");
        ScoreFragment rightScore = ScoreFragment.newInstance("loser");

        getSupportFragmentManager().beginTransaction().add(R.id.leftScoreView, leftScore).add(R.id.rightScoreView, rightScore).commit();

        Button submitButton = (Button) this.findViewById(R.id.button4);
        submitButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (winner == null || loser == null) {
                    Toast.makeText(getApplicationContext(), "Missing players, scores cannot be submitted.", Toast.LENGTH_LONG).show();
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
}
