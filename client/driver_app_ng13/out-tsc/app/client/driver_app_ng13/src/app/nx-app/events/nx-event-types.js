/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */
export var NxEventTypes;
(function (NxEventTypes) {
    let Booking;
    (function (Booking) {
        Booking.NewBooking = 100;
        Booking.AcceptBooking = 101;
        Booking.ShowBookingMap = 102;
    })(Booking = NxEventTypes.Booking || (NxEventTypes.Booking = {}));
})(NxEventTypes || (NxEventTypes = {}));
