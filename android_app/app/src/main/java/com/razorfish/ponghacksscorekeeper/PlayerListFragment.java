package com.razorfish.ponghacksscorekeeper;

import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.support.v4.widget.CursorAdapter;
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
    Bus mBus = BusProvider.getInstance();

    private PlayerListAdapter mAdapter;
    private ListView mListView;

    public static PlayerListFragment newInstance(String listType) {
        PlayerListFragment newFragment = new PlayerListFragment();
        Bundle args = new Bundle();
        args.putString(type, listType);
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
        mBus.post(new LoadPlayers(null));
    }

    @Override
    public void onPause() {
        super.onPause();
        mBus.unregister(this);
    }

    @Subscribe
    public void onPlayersLoaded(PlayersListResponse playersListResponse) {
        mAdapter.addAll(playersListResponse.getResponse());
        ((BaseAdapter) mListView.getAdapter()).notifyDataSetChanged();
    }
}