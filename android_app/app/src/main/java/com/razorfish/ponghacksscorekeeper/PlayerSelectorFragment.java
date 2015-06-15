package com.razorfish.ponghacksscorekeeper;

import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.support.v4.view.ViewPager;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.astuetz.PagerSlidingTabStrip;
import com.razorfish.ponghacksscorekeeper.bus.BusProvider;
import com.razorfish.ponghacksscorekeeper.bus.events.PlayerSelectorStateChanged;
import com.squareup.otto.Bus;

/**
 * Created by timothy.lau on 2015-06-06.
 */
public class PlayerSelectorFragment extends Fragment {
    static final private String playerTypeKey = "playerType";
    PlayerSelectorPagerAdapter adapter;
    PagerSlidingTabStrip tabs;
    ViewPager viewPager;
    Bus mBus = BusProvider.getInstance();

    public static PlayerSelectorFragment newInstance(Bundle args) {
        PlayerSelectorFragment fragment = new PlayerSelectorFragment();
        Bundle localargs = new Bundle(args);
        fragment.setArguments(localargs);
        return fragment;
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View v = inflater.inflate(R.layout.player_selector, container, false);

        viewPager = (ViewPager) v.findViewById(R.id.pager);
        adapter = new PlayerSelectorPagerAdapter(getFragmentManager(), getArguments());
        viewPager.setAdapter(adapter);

        tabs = (PagerSlidingTabStrip) v.findViewById(R.id.tabs);
        tabs.setViewPager(viewPager);

        return v;
    }

    @Override
    public void onResume() {
        super.onResume();
        mBus.register(this);
        mBus.post(new PlayerSelectorStateChanged(getArguments().getString("playerType"), "open"));
    }

    @Override
    public void onPause() {
        super.onPause();
        mBus.post(new PlayerSelectorStateChanged(getArguments().getString("playerType"), "close"));
        mBus.unregister(this);
    }
}
