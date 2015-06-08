package com.razorfish.ponghacksscorekeeper;

import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentManager;
import android.support.v4.app.FragmentPagerAdapter;

import java.util.ArrayList;

/**
 * Created by timothy.lau on 2015-06-06.
 */
public class PlayerSelectorPagerAdapter extends FragmentPagerAdapter {
    ArrayList playerList;

    public PlayerSelectorPagerAdapter(FragmentManager fm) {
        super(fm);
    }

    @Override
    public CharSequence getPageTitle(int position) {
        return (position == 0)? "Recents" : "All Players" ;
    }

    @Override
    public int getCount() {
        return 2;
    }

    @Override
    public Fragment getItem(int position) {
        PlayerListFragment fragment;
        if (position == 0) {
            fragment = new PlayerListFragment();
        } else {
            fragment = new PlayerListFragment();
        }

        return fragment;
    }
}