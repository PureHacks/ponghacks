package com.razorfish.ponghacksscorekeeper;

import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.support.v4.widget.CursorAdapter;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AbsListView;
import android.widget.Adapter;
import android.widget.AdapterView;
import android.widget.ListAdapter;
import android.widget.ListView;

import com.razorfish.ponghacksscorekeeper.Retrofit.DataBaseHelper;
import com.razorfish.ponghacksscorekeeper.Retrofit.PlayerListAdapter;
import com.razorfish.ponghacksscorekeeper.Retrofit.PlayerListCursorAdapter;
import com.razorfish.ponghacksscorekeeper.Retrofit.PlayerListModel;

import java.util.ArrayList;
import java.util.List;

import retrofit.Callback;
import retrofit.RestAdapter;
import retrofit.RetrofitError;
import retrofit.client.Response;

/**
 * Created by timothy.lau on 2015-06-06.
 */
public class PlayerListFragment extends Fragment {

    private static final String playerListBundle = "playerListBundle";

    private CursorAdapter mAdapter;
    private ListView mListView;

    public static PlayerListFragment newInstance(ArrayList playerList) {
        PlayerListFragment newFragment = new PlayerListFragment();
        Bundle args = new Bundle();
        args.putParcelableArrayList(playerListBundle, playerList);
        newFragment.setArguments(args);
        return newFragment;
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View v = inflater.inflate(R.layout.player_list, container, false);

        DataBaseHelper db = DataBaseHelper.getHelper(getActivity().getApplicationContext());

        mAdapter = new PlayerListCursorAdapter(getActivity().getApplicationContext(), db.getCursor(DataBaseHelper.ALL_TABLE_NAME));
        mListView = (ListView) v.findViewById(R.id.playerListView);

        mListView.setAdapter(mAdapter);

        return v;
    }
}
