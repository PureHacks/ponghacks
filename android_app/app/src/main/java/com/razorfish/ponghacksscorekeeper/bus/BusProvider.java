package com.razorfish.ponghacksscorekeeper.bus;

import com.squareup.otto.Bus;

/**
 * Created by Tim on 2015-06-07.
 */
public final class BusProvider {
    private static final Bus BUS = new Bus();

    public static Bus getInstance() {
        return BUS;
    }

    private BusProvider() {
        // No instances.
    }
}
