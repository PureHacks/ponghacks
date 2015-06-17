package com.razorfish.ponghacksscorekeeper;

import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentManager;
import android.support.v4.app.FragmentStatePagerAdapter;

/**
 * Created by timothy.lau on 2015-06-06.
 */
public class PlayerSelectorPagerAdapter extends FragmentStatePagerAdapter {
    Bundle args;

    public PlayerSelectorPagerAdapter(FragmentManager fm, Bundle args) {
        super(fm);
        this.args = args;
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
        Bundle localargs = new Bundle(args);
        if (position == 0) {
            localargs.putString("queryType", "recent");
        } else {
            localargs.putString("queryType", "all");
        }

        return PlayerListFragment.newInstance(localargs);
    }
}