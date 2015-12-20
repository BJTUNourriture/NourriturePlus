package cn.bjtu.nourriture.fragments.users;

import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import cn.bjtu.nourriture.R;

/**
 * Author : juliengenoud
 * 20/12/15
 **/
public class UserGroupsFragment extends Fragment {
    public static UserGroupsFragment newInstance() {
        UserGroupsFragment fragment = new UserGroupsFragment();
        return fragment;
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        View v = inflater.inflate(R.layout.dummy_fragment, container, false);
        ((TextView) v.findViewById(R.id.dummy)).setText("GROUPS USERS");
        return v;
    }
}
