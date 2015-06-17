package com.razorfish.ponghacksscorekeeper.Retrofit;

import android.content.Context;
import android.graphics.Color;
import android.graphics.Typeface;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.ImageView;
import android.widget.TextView;

import com.makeramen.roundedimageview.RoundedTransformationBuilder;
import com.razorfish.ponghacksscorekeeper.R;
import com.razorfish.ponghacksscorekeeper.models.Player;
import com.squareup.picasso.Picasso;
import com.squareup.picasso.Transformation;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by timothy.lau on 2015-06-07.
 */
public class PlayerListAdapter extends ArrayAdapter {
    private ImageView playerAvatar;
    private TextView playerName;

    private List list = new ArrayList();

    public PlayerListAdapter(Context context) {
        super(context, 0);
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        Player player = (Player) getItem(position);

        if (convertView == null) {
            convertView = LayoutInflater.from(getContext()).inflate(R.layout.player_list_row, parent, false);
        }

        playerAvatar = (ImageView) convertView.findViewById(R.id.playerAvatar);
        playerName = (TextView) convertView.findViewById(R.id.playerName);

        Typeface playerFont = Typeface.createFromAsset(getContext().getAssets(), getContext().getString(R.string.fontPlayerList));
        playerName.setTypeface(playerFont);

        Transformation circle = new RoundedTransformationBuilder().borderColor(Color.WHITE).borderWidthDp(1).cornerRadiusDp(30).oval(false).build();

        Picasso.with(getContext()).load(player.getAvatarUrl()).fit().transform(circle).into(playerAvatar);

        playerName.setText(player.getName());

        return convertView;
    }
}
