package com.razorfish.ponghacksscorekeeper.dashboard;

import android.graphics.Typeface;
import android.os.Bundle;
import android.support.v7.app.ActionBar;
import android.support.v7.app.ActionBarActivity;
import android.view.KeyEvent;
import android.view.LayoutInflater;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.webkit.WebView;
import android.widget.TextView;

import com.razorfish.ponghacksscorekeeper.R;

public class DashboardActivity extends ActionBarActivity {

    WebView webView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_dashboard);

        webView = (WebView) findViewById(R.id.webView);

        webView.getSettings().setJavaScriptEnabled(true);
        //webView.setInitialScale(100);
        webView.loadUrl(getString(R.string.dashboardEndpoint));

        ActionBar actionBar = getSupportActionBar();
        actionBar.setDisplayShowCustomEnabled(true);
        actionBar.setDisplayShowTitleEnabled(false);

        LayoutInflater inflater = LayoutInflater.from(this);
        View actionBarView = inflater.inflate(R.layout.dashboard_actionbar, null);

        TextView actionBarText = (TextView) actionBarView.findViewById(R.id.dashboard_actionbar_text);
        Typeface scoreLabelFont = Typeface.createFromAsset(getAssets(), getString(R.string.fontActionBar));
        actionBarText.setTypeface(scoreLabelFont);

        actionBar.setCustomView(actionBarView);
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.menu_dashboard, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();

        return super.onOptionsItemSelected(item);
    }

    @Override
    public boolean onKeyDown(int keyCode, KeyEvent event) {
        if ((keyCode == KeyEvent.KEYCODE_BACK) && webView.canGoBack()) {
            //if Back key pressed and webview can navigate to previous page
            webView.goBack();
            // go back to previous page
            return true;
        }
        else
        {
            finish();
            // finish the activity
        }
        return super.onKeyDown(keyCode, event);
    }
}
