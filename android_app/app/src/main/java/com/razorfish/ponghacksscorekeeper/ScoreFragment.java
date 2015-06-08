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
    private int defaultScore;
    private String playerType;

    public void init(String result) {
        if (result.toLowerCase().equals("winner")) {
            defaultScore = 21;
            playerType = "winner";
        }
        else {
            defaultScore = 15;
            playerType = "loser";
        }
    }

    @Override
    public void onActivityCreated(Bundle savedInstanceState) {
        super.onActivityCreated(savedInstanceState);
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View v = inflater.inflate(R.layout.player_entry, container, false);

//        final PlayerListFragment playerList = new PlayerListFragment();

        final int parentId = container.getId();

        Button playerButton = (Button) v.findViewById(R.id.button);
        playerButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                PlayerSelectorFragment playerSelectorFragment = PlayerSelectorFragment.newInstance(playerType);
                getFragmentManager().beginTransaction().replace(parentId, playerSelectorFragment).addToBackStack(null).commit();
            }
        });

        final EditText editText = (EditText) v.findViewById(R.id.editText2);
        Button subButton = (Button) v.findViewById(R.id.button2);
        Button addButton = (Button) v.findViewById(R.id.button3);

        InputFilterMinMax inputFilterMinMax = new InputFilterMinMax("0","99");

        editText.setFilters(new InputFilter[]{inputFilterMinMax});
        editText.setText(String.valueOf(defaultScore));

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
}
