package com.razorfish.ponghacksscorekeeper;

import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.support.v4.view.ViewPager;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.astuetz.PagerSlidingTabStrip;

/**
 * Created by timothy.lau on 2015-06-06.
 */
public class PlayerSelectorFragment extends Fragment {
    static final private String playerTypeKey = "playerType";
    PlayerSelectorPagerAdapter adapter;
    PagerSlidingTabStrip tabs;
    ViewPager viewPager;

    public static PlayerSelectorFragment newInstance(String playerType) {
        PlayerSelectorFragment fragment = new PlayerSelectorFragment();
        Bundle args = new Bundle();
        args.putString(playerTypeKey, playerType);
        fragment.setArguments(args);
        return fragment;
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View v = inflater.inflate(R.layout.player_selector, container, false);

        Log.d(playerTypeKey, getArguments().getString(playerTypeKey));

        if (getArguments().getString(playerTypeKey).equals("winner"))
            v.findViewById(R.id.pager).setId(R.id.pager_winner);
        else
            v.findViewById(R.id.pager).setId(R.id.pager_loser);

        viewPager = getArguments().getString(playerTypeKey).equals("winner") ? (ViewPager) v.findViewById(R.id.pager_winner) : (ViewPager) v.findViewById(R.id.pager_loser);
        adapter = new PlayerSelectorPagerAdapter(getFragmentManager());
        viewPager.setAdapter(adapter);

        tabs = (PagerSlidingTabStrip) v.findViewById(R.id.tabs);
        tabs.setViewPager(viewPager);

        return v;
    }
}
