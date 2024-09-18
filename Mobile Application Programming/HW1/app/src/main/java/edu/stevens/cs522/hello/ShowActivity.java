package edu.stevens.cs522.hello;

import android.app.Activity;
import android.os.Bundle;
import android.widget.TextView;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

public class ShowActivity extends Activity {
    public final static String MESSAGE_KEY = "message";
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_show);
        String message = getIntent().getStringExtra(MESSAGE_KEY);
        TextView textview = (TextView) findViewById(R.id.message);
        textview.setText(message);
        String text = getIntent().getStringExtra(MESSAGE_KEY);
        message = getResources().getString(R.string.show_name, text);
        textview.setText(message);
    }
}