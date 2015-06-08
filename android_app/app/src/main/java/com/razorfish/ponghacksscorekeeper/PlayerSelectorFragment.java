package com.razorfish.ponghacksscorekeeper;

import android.os.Bundle;
import android.os.Parcelable;
import android.support.v4.app.Fragment;
import android.support.v4.view.ViewPager;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.astuetz.PagerSlidingTabStrip;

import java.util.ArrayList;

/**
 * Created by timothy.lau on 2015-06-06.
 */
public class PlayerSelectorFragment extends Fragment {
    private static final String playerListBundle = "playerListBundle";

    public static PlayerSelectorFragment newInstance(ArrayList playerList) {
        PlayerSelectorFragment fragment = new PlayerSelectorFragment();
        Bundle args = new Bundle();
        args.putParcelableArrayList(playerListBundle, playerList);
        fragment.setArguments(args);
        return fragment;
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View v = inflater.inflate(R.layout.player_selector, container, false);

//        ArrayList<Parcelable> listArg = getArguments().getParcelableArrayList(playerListBundle);

        PlayerSelectorPagerAdapter adapter = new PlayerSelectorPagerAdapter(getFragmentManager());

        ViewPager viewPager = (ViewPager) v.findViewById(R.id.pager);
        viewPager.setAdapter(adapter);

        PagerSlidingTabStrip tabs = (PagerSlidingTabStrip) v.findViewById(R.id.tabs);
        tabs.setViewPager(viewPager);

        return v;
    }
}
