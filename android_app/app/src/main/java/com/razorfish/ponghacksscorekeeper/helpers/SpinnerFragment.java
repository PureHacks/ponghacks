package com.razorfish.ponghacksscorekeeper.helpers;

import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ProgressBar;

import com.jpardogo.android.googleprogressbar.library.FoldingCirclesDrawable;
import com.razorfish.ponghacksscorekeeper.R;

/**
 * Created by timothy.lau on 2015-06-17.
 */
public class SpinnerFragment extends Fragment {
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View v = inflater.inflate(R.layout.spinner_screen, container, false);

        ProgressBar progressBar = (ProgressBar) v.findViewById(R.id.progressBar);
        progressBar.setIndeterminateDrawable(new FoldingCirclesDrawable.Builder(getActivity()).build());

        return v;
    }
}
