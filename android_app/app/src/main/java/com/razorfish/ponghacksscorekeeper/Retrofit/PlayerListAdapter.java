package com.razorfish.ponghacksscorekeeper.Retrofit;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.ImageView;
import android.widget.TextView;

import com.razorfish.ponghacksscorekeeper.R;
import com.squareup.picasso.Picasso;

import java.util.List;

/**
 * Created by timothy.lau on 2015-06-07.
 */
public class PlayerListAdapter extends ArrayAdapter {
    private ImageView playerAvatar;
    private TextView playerName;

    public PlayerListAdapter(Context context) {
        super(context, 0);
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        PlayerListModel.Player player = (PlayerListModel.Player) getItem(position);

        if (convertView == null) {
            convertView = LayoutInflater.from(getContext()).inflate(R.layout.player_list_row, parent, false);
        }

        playerAvatar = (ImageView) convertView.findViewById(R.id.playerAvatar);
        playerName = (TextView) convertView.findViewById(R.id.playerName);

        Picasso.with(getContext()).load(player.getAvatarUrl()).into(playerAvatar);

        playerName.setText(player.getName());

        return convertView;
    }
}
