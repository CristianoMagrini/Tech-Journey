import { defineStore } from "pinia";
import { Room } from "./models/room";
import { useAxios } from "../composables/useAxios";
import { AxiosError } from "axios";

export const useRoomsStore = defineStore("rooms-store", {
  state: () => ({
    roomDetail: null as null | Room,
    rooms: [] as Array<Room>,
    roomPhotos: [] as Array<string>,
  }),
  actions: {
    async getRooms(body) {
      const { sendRequest } = useAxios();
      const response = await sendRequest({
        url: "rooms",
        method: "GET",
      });
      if (response instanceof AxiosError) {
        return false;
      }
      this.rooms = response;
      return true;
    },
    async getRoomDetail(id) {
      const { sendRequest } = useAxios();

      const [roomDetailResponse, roomPhotosResponse] = await Promise.all([
        sendRequest({
          url: "rooms/" + id,
          method: "GET",
        }),
        sendRequest({
          url: "rooms/" + id + "/photos",
          method: "GET",
        }),
      ]);

      if (
        roomDetailResponse instanceof AxiosError ||
        roomPhotosResponse instanceof AxiosError
      ) {
        return;
      }
      this.roomDetail = roomDetailResponse;
      this.roomPhotos = roomPhotosResponse.photos;
    },
  },
  getters: {
    roomsGetter(state) {
      return state.rooms;
    },
    roomDetailGetter(state) {
      return state.roomDetail;
    },
    roomPhotosGetter(state) {
      return state.roomPhotos;
    },
  },
});
