package edu.stevens.cs522.chatserver.activities;

import android.content.Intent;
import android.os.Bundle;
import android.widget.ListView;
import android.widget.TextView;

import androidx.fragment.app.FragmentActivity;
import androidx.lifecycle.LiveData;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;

import edu.stevens.cs522.chatserver.R;
import edu.stevens.cs522.chatserver.databases.ChatDatabase;
import edu.stevens.cs522.chatserver.entities.Message;
import edu.stevens.cs522.chatserver.entities.Peer;
import edu.stevens.cs522.chatserver.ui.SimpleArrayAdapter;

/**
 * Created by dduggan.
 */

public class ViewPeerActivity extends FragmentActivity {

    public static final String PEER_KEY = "peer";

    private ChatDatabase chatDatabase;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.view_peer);

        Peer peer = getPeer(getIntent());
        if (peer == null) {
            throw new IllegalArgumentException("Expected peer as intent extra");
        }

        // TODO Set the fields of the UI
        TextView peerNameTextView = findViewById(R.id.view_user_name);
        TextView peerTimestampTextView = findViewById(R.id.view_timestamp);
        TextView peerLocationTextView = findViewById(R.id.view_location);

        peerNameTextView.setText(getString(R.string.view_user_name, peer.name));
        peerTimestampTextView.setText(getString(R.string.view_timestamp, formatTimestamp(peer.timestamp)));
        peerLocationTextView.setText(getString(R.string.view_location, peer.latitude, peer.longitude));

        // End TODO

        SimpleArrayAdapter<Message> messagesAdapter = new SimpleArrayAdapter<>(this);
        ListView messagesList = findViewById(R.id.message_list);
        messagesList.setAdapter(messagesAdapter);

        chatDatabase = ChatDatabase.getInstance(getApplicationContext());

        /*
         * TODO query the database asynchronously for the messages just for this peer.
         */

        LiveData<List<Message>> messageData = chatDatabase.messageDao().fetchMessagesFromPeer(peer.name);
        messageData.observe(this, messages -> {
            if (messages != null) {
                messagesAdapter.setElements(messages);
                messagesAdapter.notifyDataSetChanged();
            }
        });



    }

    private static String formatTimestamp(Instant timestamp) {
        LocalDateTime dateTime = timestamp.atZone(ZoneId.systemDefault()).toLocalDateTime();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm:ss");
        return dateTime.format(formatter);
    }

    private static Peer getPeer(Intent intent) {
        if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.TIRAMISU) {
            return intent.getParcelableExtra(PEER_KEY, Peer.class);
        } else {
            return intent.getParcelableExtra(PEER_KEY);
        }
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        chatDatabase = null;
    }

}
