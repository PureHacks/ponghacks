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

        viewPager = (ViewPager) v.findViewById(R.id.pager);
        adapter = new PlayerSelectorPagerAdapter(getFragmentManager(), getArguments().getString(playerTypeKey));
        viewPager.setAdapter(adapter);

        tabs = (PagerSlidingTabStrip) v.findViewById(R.id.tabs);
        tabs.setViewPager(viewPager);

        return v;
    }
}
