package com.razorfish.ponghacksscorekeeper.Retrofit;

import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;
import android.support.v4.widget.CursorAdapter;

/**
 * Created by timothy.lau on 2015-06-07.
 */
public class DataBaseHelper extends SQLiteOpenHelper {
    private static final int DATABASE_VERSION = 1;
    private static final String DATABASE_NAME = "playersdb";

    public static final String ALL_TABLE_NAME = "all_players";
    public static final String RECENT_TABLE_NAME = "recent_players";

    public static final String COLUMN_NAME_USER_ID = "userId";
    public static final String COLUMN_NAME_EMAIL = "email";
    public static final String COLUMN_NAME_NAME = "name";
    public static final String COLUMN_NAME_MENTION_NAME = "mentionName";
    public static final String COLUMN_NAME_AVATAR_URL = "avatarUrl";

    public static final String CREATE_ALL_TABLE = "CREATE TABLE " + ALL_TABLE_NAME
            + "(" + COLUMN_NAME_USER_ID + " INTEGER PRIMARY KEY,"
            + COLUMN_NAME_EMAIL + " TEXT,"
            + COLUMN_NAME_NAME + " TEXT,"
            + COLUMN_NAME_MENTION_NAME + " TEXT,"
            + COLUMN_NAME_AVATAR_URL + " TEXT)";

    public static final String CREATE_RECENTS_TABLE = "CREATE TABLE " + RECENT_TABLE_NAME
            + "(" + COLUMN_NAME_USER_ID + " INTEGER PRIMARY KEY, "
            + COLUMN_NAME_EMAIL + " TEXT, "
            + COLUMN_NAME_NAME + " TEXT, "
            + COLUMN_NAME_MENTION_NAME + " TEXT, "
            + COLUMN_NAME_AVATAR_URL + " TEXT)";

    private static DataBaseHelper instance;

    public static synchronized DataBaseHelper getHelper(Context context) {
        if (instance == null)
            instance = new DataBaseHelper(context);
        return instance;
    }

    public DataBaseHelper(Context context) {
        super(context, DATABASE_NAME, null, DATABASE_VERSION);
    }

    @Override
    public void onOpen(SQLiteDatabase db) {
        super.onOpen(db);
        if (!db.isReadOnly()) {
            // Enable foreign key constraints
            // db.execSQL("PRAGMA foreign_keys=ON;");
        }
    }

    @Override
    public void onCreate(SQLiteDatabase db) {
        db.execSQL(CREATE_ALL_TABLE);
        db.execSQL(CREATE_RECENTS_TABLE);
    }

    @Override
    public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {
        db.execSQL("DROP TABLE IF EXISTS " + ALL_TABLE_NAME);
        db.execSQL("DROP TABLE IF EXISTS " + RECENT_TABLE_NAME);

        this.onCreate(db);
    }

    public void addPlayer(PlayerListModel.Player player, String table) {
        SQLiteDatabase db = this.getWritableDatabase();

        ContentValues contentValues = new ContentValues();
        contentValues.put(COLUMN_NAME_USER_ID, player.getUserId());
        contentValues.put(COLUMN_NAME_NAME, player.getName());
        contentValues.put(COLUMN_NAME_MENTION_NAME, player.getMentionName());
        contentValues.put(COLUMN_NAME_EMAIL, player.getEmail());
        contentValues.put(COLUMN_NAME_AVATAR_URL, player.getAvatarUrl());

        db.insert(table, null, contentValues);
        db.close();
    }

    public void dropTables() {
        SQLiteDatabase db = this.getWritableDatabase();

        db.execSQL("DROP TABLE IF EXISTS " + ALL_TABLE_NAME);
        db.execSQL("DROP TABLE IF EXISTS " + RECENT_TABLE_NAME);

        this.onCreate(db);
    }

    public Cursor getCursor(String table) {
        SQLiteDatabase db = this.getWritableDatabase();
        Cursor cursor = db.query(table, new String[] {"rowid _id", COLUMN_NAME_NAME, COLUMN_NAME_AVATAR_URL}, null, null, null, null, null);
        return cursor;
    }
}
