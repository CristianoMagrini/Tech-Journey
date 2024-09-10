import { defineStore } from "pinia";
import { Booking } from "./models/booking";
import { useAxios } from "../composables/useAxios";
import { AxiosError } from "axios";

export const useBookingsStore = defineStore("bookings-store", {
  state: () => ({
    bookings: [] as Array<Booking>,
    bookingDetail: null,
  }),
  actions: {
    async createBooking(room_id, booked_on) {
      const { sendRequest } = useAxios();
      const response = await sendRequest({
        url: "bookings",
        method: "POST",
        data: { room_id, booked_on },
      });

      if (response instanceof AxiosError) {
        return false;
      }
      this.getBookings();
      return true;
    },
    async getBookings() {
      const { sendRequest } = useAxios();
      const response = await sendRequest({
        url: "bookings",
        method: "GET",
      });
      if (response instanceof AxiosError) {
        return false;
      }
      this.bookings = response;
      return true;
    },
    async getBookingDetail(id) {
      const { sendRequest } = useAxios();
      const response = await sendRequest({
        url: "bookings/" + id,
        method: "GET",
      });
      if (response instanceof AxiosError) {
        return;
      }
      this.bookingDetail = response;
    },
    async deleteBooking(id) {
      const { sendRequest } = useAxios();
      const response = await sendRequest({
        url: "bookings/" + id,
        method: "DELETE",
      });
      if (response instanceof AxiosError) {
        return;
      }
      const oldBookings = [...this.bookings];
      const index = oldBookings.findIndex((value) => value.id === id);
      oldBookings.splice(index, 1);
      this.bookings = oldBookings;
    },
  },
  getters: {
    bookingsGetter(state) {
      return state.bookings;
    },
    bookingDetailGetter(state) {
      return state.bookingDetail;
    },
  },
});
