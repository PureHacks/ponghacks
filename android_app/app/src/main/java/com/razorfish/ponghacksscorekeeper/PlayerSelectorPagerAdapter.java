package com.razorfish.ponghacksscorekeeper;

import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentManager;
import android.support.v4.app.FragmentPagerAdapter;
import android.support.v4.app.FragmentStatePagerAdapter;

import java.util.ArrayList;

/**
 * Created by timothy.lau on 2015-06-06.
 */
public class PlayerSelectorPagerAdapter extends FragmentStatePagerAdapter {
    String type;

    public PlayerSelectorPagerAdapter(FragmentManager fm, String type) {
        super(fm);
        this.type = type;
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
            fragment = PlayerListFragment.newInstance(type);
        } else {
            fragment = PlayerListFragment.newInstance(type);
        }

        return fragment;
    }
}