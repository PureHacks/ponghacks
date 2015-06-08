package com.razorfish.ponghacksscorekeeper.Retrofit;

import android.content.Context;
import android.database.Cursor;
import android.support.v4.widget.CursorAdapter;
import android.text.Layout;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import com.razorfish.ponghacksscorekeeper.R;
import com.squareup.picasso.Picasso;

import org.w3c.dom.Text;

/**
 * Created by timothy.lau on 2015-06-07.
 */
public class PlayerListCursorAdapter extends CursorAdapter {

    public PlayerListCursorAdapter(Context context, Cursor cursor) {
        super(context, cursor, 0);
    }

    @Override
    public View newView(Context context, Cursor cursor, ViewGroup parent) {
        return LayoutInflater.from(context).inflate(R.layout.player_list_row, parent, false);
    }

    @Override
    public void bindView(View view, Context context, Cursor cursor) {
        ImageView imageView = (ImageView) view.findViewById(R.id.playerAvatar);
        TextView textView = (TextView) view.findViewById(R.id.playerName);

        String imageUrl = cursor.getString(cursor.getColumnIndexOrThrow(DataBaseHelper.COLUMN_NAME_AVATAR_URL));
        String playerName = cursor.getString(cursor.getColumnIndexOrThrow(DataBaseHelper.COLUMN_NAME_NAME));

        Picasso.with(context).load(imageUrl).into(imageView);
        textView.setText(playerName);
    }
}
