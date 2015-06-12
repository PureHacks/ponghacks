package com.razorfish.ponghacksscorekeeper;

import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.text.InputFilter;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageButton;
import android.widget.NumberPicker;

import com.razorfish.ponghacksscorekeeper.Retrofit.PlayerListModel;
import com.razorfish.ponghacksscorekeeper.bus.BusProvider;
import com.razorfish.ponghacksscorekeeper.bus.events.PlayerSelected;
import com.squareup.otto.Bus;
import com.squareup.otto.Subscribe;

import java.util.ArrayList;
import java.util.List;

import retrofit.Callback;
import retrofit.RestAdapter;
import retrofit.RetrofitError;
import retrofit.client.Response;

/**
 * Created by timothy.lau on 2015-06-05.
 */
public class ScoreFragment extends Fragment {
    Button playerButton;
    PlayerListModel.Player selectedPlayer;
    Bus mBus = BusProvider.getInstance();

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

        playerButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                PlayerSelectorFragment playerSelectorFragment = PlayerSelectorFragment.newInstance(getArguments());
                getFragmentManager().beginTransaction().add(parentId, playerSelectorFragment).addToBackStack(null).commit();
            }
        });

        final EditText editText = (EditText) v.findViewById(R.id.editText2);
        Button subButton = (Button) v.findViewById(R.id.button2);
        Button addButton = (Button) v.findViewById(R.id.button3);

        InputFilterMinMax inputFilterMinMax = new InputFilterMinMax("0","99");

        editText.setFilters(new InputFilter[]{inputFilterMinMax});
        editText.setText(Integer.toString(getArguments().getInt("defaultScore")));

        subButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (editText.getText().toString().isEmpty()) {
                    editText.setText("0");
                } else if (editText.getText().toString().equals("0")) {
                    editText.setText("0");
                } else {
                    int point = Integer.parseInt(editText.getText().toString());
                    editText.setText(String.valueOf(point - 1));
                }
            }
        });

        addButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (editText.getText().toString().isEmpty()) {
                    editText.setText("0");
                } else if (editText.getText().toString().equals("99")) {
                    editText.setText("0");
                } else {
                    int point = Integer.parseInt(editText.getText().toString());
                    editText.setText(String.valueOf(point + 1));
                }
            }
        });

        return v;
    }

    @Subscribe
    public void onPlayerSelected(PlayerSelected event) {
        if (event.getType().equals(getArguments().getString("playerType"))) {
            selectedPlayer = event.getPlayer();
            playerButton.setText(selectedPlayer.getName());
        }
    }

    @Override
    public void onResume() {
        super.onResume();
        mBus.register(this);
    }

//    @Override
//    public void onPause() {
//        super.onPause();
//        mBus.unregister(this);
//    }
}
