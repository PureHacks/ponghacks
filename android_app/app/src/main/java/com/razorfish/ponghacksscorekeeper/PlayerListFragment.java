package com.razorfish.ponghacksscorekeeper;

import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.BaseAdapter;
import android.widget.ListView;
import android.widget.AdapterView.OnItemClickListener;

import com.razorfish.ponghacksscorekeeper.Retrofit.PlayerListAdapter;
import com.razorfish.ponghacksscorekeeper.Retrofit.PlayerListModel;
import com.razorfish.ponghacksscorekeeper.bus.BusProvider;
import com.razorfish.ponghacksscorekeeper.bus.events.LoadPlayers;
import com.razorfish.ponghacksscorekeeper.bus.events.PlayerSelected;
import com.razorfish.ponghacksscorekeeper.bus.events.PlayersListResponse;
import com.squareup.otto.Bus;
import com.squareup.otto.Subscribe;

/**
 * Created by timothy.lau on 2015-06-06.
 */
public class PlayerListFragment extends Fragment {

    private static final String playerListBundle = "playerListBundle";
    private static final String type = "type";
    private static final String query = "query";
    Bus mBus = BusProvider.getInstance();

    private PlayerListAdapter mAdapter;
    private ListView mListView;

    public static PlayerListFragment newInstance(String listType, String queryVal) {
        PlayerListFragment newFragment = new PlayerListFragment();
        Bundle args = new Bundle();
        args.putString(type, listType);
        args.putString(query, queryVal);
        newFragment.setArguments(args);
        return newFragment;
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View v = inflater.inflate(R.layout.player_list, container, false);
        mListView = (ListView) v.findViewById(R.id.playerListView);
        mAdapter = new PlayerListAdapter(getActivity());
        mListView.setAdapter(mAdapter);

        mListView.setOnItemClickListener(new OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                PlayerListModel.Player player = (PlayerListModel.Player) mAdapter.getItem(position);
                Log.d("playerType", getArguments().getString(type));
                mBus.post(new PlayerSelected(player, getArguments().getString(type)));
                getFragmentManager().popBackStack();
            }
        });

        return v;
    }

    @Override
    public void onResume() {
        super.onResume();
        mBus.register(this);
        if (getArguments().getString(query).equals("all")) {
            mBus.post(new LoadPlayers("all", getArguments().getString(type)));
        }
        else {
            mBus.post(new LoadPlayers("recent", getArguments().getString(type)));
        }
    }

    @Override
    public void onPause() {
        super.onPause();
        mBus.unregister(this);
    }

    @Subscribe
    public void onPlayersLoaded(PlayersListResponse playersListResponse) {
        if (getArguments().getString(type).equals(playersListResponse.getPlayerType()) && getArguments().getString(query).equals(playersListResponse.getQueryType())) {
            mAdapter.addAll(playersListResponse.getResponse());
            ((BaseAdapter) mListView.getAdapter()).notifyDataSetChanged();
        }
    }
}