package com.razorfish.ponghacksscorekeeper;

import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.text.InputFilter;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageButton;
import android.widget.NumberPicker;

/**
 * Created by timothy.lau on 2015-06-05.
 */
public class ScoreFragment extends Fragment {
    private int defaultScore;

    public void init(String result) {
        if (result.toLowerCase().equals("winner")) {
            defaultScore = 21;
        }
        else {
            defaultScore = 15;
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

        ImageButton imageButton = (ImageButton) v.findViewById(R.id.imageButton);

        imageButton.setImageResource(R.drawable.dickbutt);

        final EditText editText = (EditText) v.findViewById(R.id.editText2);
        Button subButton = (Button) v.findViewById(R.id.button2);
        Button addButton = (Button) v.findViewById(R.id.button3);

        InputFilterMinMax inputFilterMinMax = new InputFilterMinMax("0","99");

        editText.setFilters(new InputFilter[]{inputFilterMinMax});

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
