package cn.bjtu.nourriture.api;

import retrofit.GsonConverterFactory;
import retrofit.Retrofit;
import retrofit.RxJavaCallAdapterFactory;

/**
 * Author : juliengenoud
 * 30/11/15
 **/
public class ServiceFactory {

//    static String API_IP = "sylflo.fr";
    static String API_IP_emulator = "10.0.2.2";
    static String API_IP_maxime = "192.168.198.132";
    static String API_IP_julien = "192.168.0.100";
    static String API_IP_benjamin = "192.168.1.102";

    static String SERVICE_ENDPOINT = "http://" + API_IP_julien + ":8101/api/";
    static Retrofit mRestAdapter = null;

    public static <T> T createRetrofitService(final Class<T> clazz) {
        mRestAdapter = new Retrofit.Builder()
                .baseUrl(SERVICE_ENDPOINT)
                .addConverterFactory(GsonConverterFactory.create())
                .addCallAdapterFactory(RxJavaCallAdapterFactory.create())
                .build();
        T service = mRestAdapter.create(clazz);
        return service;
    }

    public static Retrofit getRestAdapter() {
        return mRestAdapter;
    }
}