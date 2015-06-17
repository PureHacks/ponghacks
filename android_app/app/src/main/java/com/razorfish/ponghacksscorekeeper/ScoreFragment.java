package com.razorfish.ponghacksscorekeeper;

import android.graphics.Bitmap;
import android.graphics.Color;
import android.graphics.Typeface;
import android.graphics.drawable.BitmapDrawable;
import android.graphics.drawable.Drawable;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.text.InputFilter;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

import com.makeramen.roundedimageview.RoundedTransformationBuilder;
import com.razorfish.ponghacksscorekeeper.bus.BusProvider;
import com.razorfish.ponghacksscorekeeper.bus.events.PlayerSelected;
import com.razorfish.ponghacksscorekeeper.bus.events.ScoreChanged;
import com.razorfish.ponghacksscorekeeper.helpers.InputFilterMinMax;
import com.razorfish.ponghacksscorekeeper.models.Player;
import com.squareup.otto.Bus;
import com.squareup.otto.Subscribe;
import com.squareup.picasso.Picasso;
import com.squareup.picasso.Target;
import com.squareup.picasso.Transformation;

/**
 * Created by timothy.lau on 2015-06-05.
 */
public class ScoreFragment extends Fragment {
    Button playerButton;
    Player selectedPlayer;
    int score;
    Bus mBus = BusProvider.getInstance();
    OverlayFragment overlayFragment = new OverlayFragment();
    Target target = new PlayerIconTarget();

    public static ScoreFragment newInstance(String result) {
        ScoreFragment fragment = new ScoreFragment();
        Bundle args = new Bundle();

        if (result.equals("winner")) {
            args.putString("playerType", "winner");
            args.putInt("defaultScore", 21);
        }
        else {
            args.putString("playerType", "loser");
            args.putInt("defaultScore", 15);
        }

        fragment.setArguments(args);
        return fragment;
    }

    @Override
    public void onActivityCreated(Bundle savedInstanceState) {
        super.onActivityCreated(savedInstanceState);
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View v = inflater.inflate(R.layout.player_entry, container, false);

        final int parentId = container.getId();

        playerButton = (Button) v.findViewById(R.id.button);

        Typeface playerButtonFont = Typeface.createFromAsset(getActivity().getAssets(), getString(R.string.fontPlayer));
        playerButton.setTypeface(playerButtonFont);
        playerButton.setTransformationMethod(null);

        TextView scoreLabel = (TextView) v.findViewById(R.id.pointsText);
        Typeface scoreLabelFont = Typeface.createFromAsset(getActivity().getAssets(), getString(R.string.fontScore));
        scoreLabel.setTypeface(scoreLabelFont);

        TextView playerLabel = (TextView) v.findViewById(R.id.playerLabel);
        Typeface playerLabelFont = Typeface.createFromAsset(getActivity().getAssets(), getString(R.string.fontTitle));
        playerLabel.setTypeface(playerLabelFont);

        if (getArguments().getString("playerType").equals("winner")) {
            playerButton.setText("Select winner");
            scoreLabel.setText("Win points");
            playerLabel.setText("Winning player");
        } else {
            playerButton.setText("Select loser");
            scoreLabel.setText("Loss points");
            playerLabel.setText("Losing player");
        }

        playerButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                PlayerSelectorFragment playerSelectorFragment = PlayerSelectorFragment.newInstance(getArguments());
                getFragmentManager().beginTransaction().add(parentId, playerSelectorFragment).addToBackStack(null).commit();
            }
        });

        score = getArguments().getInt("defaultScore");

        final EditText editText = (EditText) v.findViewById(R.id.editText2);
        Button subButton = (Button) v.findViewById(R.id.button2);
        Button addButton = (Button) v.findViewById(R.id.button3);

        editText.setTypeface(scoreLabelFont);
        subButton.setTypeface(scoreLabelFont);
        addButton.setTypeface(scoreLabelFont);

        InputFilterMinMax inputFilterMinMax = new InputFilterMinMax("0","99");

        editText.setFilters(new InputFilter[]{inputFilterMinMax});
        editText.setText(Integer.toString(score));

        subButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (editText.getText().toString().isEmpty()) {
                    score = 0;
                } else if (editText.getText().toString().equals("0")) {
                    score = 0;
                } else {
                    score--;
                }
                mBus.post(new ScoreChanged(score, getArguments().getString("playerType")));
                editText.setText(Integer.toString(score));
            }
        });

        addButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (editText.getText().toString().isEmpty()) {
                    score = 0;
                } else if (editText.getText().toString().equals("99")) {
                    score = 99;
                } else {
                    score++;
                }
                mBus.post(new ScoreChanged(score, getArguments().getString("playerType")));
                editText.setText(Integer.toString(score));
            }
        });

        return v;
    }

    @Subscribe
    public void onPlayerSelected(PlayerSelected event) {
        if (event.getType().equals(getArguments().getString("playerType"))) {
            selectedPlayer = event.getPlayer();
            playerButton.setText(selectedPlayer.getName());

            int borderColor = (getArguments().getString("playerType").equals("winner")) ? Color.GRAY : Color.RED;

            Transformation circle = new RoundedTransformationBuilder().borderColor(borderColor).borderWidthDp(4).cornerRadiusDp(30).oval(false).build();

            Picasso.with(getActivity()).load(selectedPlayer.getAvatarUrl()).resize(125,125).centerCrop().transform(circle).into(target);

            playerButton.setPadding(playerButton.getPaddingLeft(), playerButton.getPaddingTop(), playerButton.getPaddingRight(), playerButton.getPaddingBottom());
        } else {
            getFragmentManager().beginTransaction().remove(overlayFragment).commit();
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

    private class PlayerIconTarget implements Target {
        @Override
        public void onBitmapLoaded(Bitmap bitmap, Picasso.LoadedFrom from) {
            Drawable playerIcon = new BitmapDrawable(getActivity().getResources(), bitmap);
            playerIcon.setBounds(0, 0, 100, 100);
            playerButton.setCompoundDrawables(playerIcon, null, null, null);
        }

        @Override
        public void onBitmapFailed(Drawable errorDrawable) {

        }

        @Override
        public void onPrepareLoad(Drawable placeHolderDrawable) {

        }
    }
}
