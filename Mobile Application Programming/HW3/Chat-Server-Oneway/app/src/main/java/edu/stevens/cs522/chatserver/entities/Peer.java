package edu.stevens.cs522.chatserver.entities;

import android.content.ContentValues;
import android.database.Cursor;
import android.os.Parcel;
import android.os.Parcelable;

import java.time.Instant;

import edu.stevens.cs522.chatserver.contracts.MessageContract;
import edu.stevens.cs522.chatserver.contracts.PeerContract;

/**
 * Created by dduggan.
 */

public class Peer implements Parcelable, Persistable {

    // Will be database key
    public long id;

    public String name;

    // Last time we heard from this peer.
    public Instant timestamp;

    // Where we heard from them
    public Double latitude;

    public Double longitude;

    public Peer() {
    }

    public Peer(Cursor in) {
        id = PeerContract.getId(in);
        name = PeerContract.getName(in);
        timestamp = PeerContract.getTimestamp(in);
        latitude = PeerContract.getLatitude(in);
        longitude = PeerContract.getLongitude(in);

    }

    @Override
    public void writeToProvider(ContentValues out) {
        PeerContract.putId(out, id);
        PeerContract.putName(out, name);
        PeerContract.putTimestamp(out, timestamp);
        PeerContract.putLatitude(out, longitude);
        PeerContract.putLatitude(out, latitude);
    }


    @Override
    public int describeContents() {
        return 0;
    }

    public Peer(Parcel in) {
        id = in.readLong();
        name = in.readString();
        timestamp = TimestampConverter.deserialize(in.readString());
        latitude = in.readDouble();
        longitude = in.readDouble();
    }

    @Override
    public void writeToParcel(Parcel out, int flags) {
        out.writeLong(id);
        out.writeString(name);
        out.writeString(TimestampConverter.serialize(timestamp));
        out.writeDouble(latitude);
        out.writeDouble(longitude);
    }

    public static final Creator<Peer> CREATOR = new Creator<Peer>() {

        @Override
        public Peer createFromParcel(Parcel source) {
            // TODO
            return new Peer(source);
            // return null;
        }

        @Override
        public Peer[] newArray(int size) {
            // TODO
            // return null;
            return new Peer[size];
        }

    };
}
