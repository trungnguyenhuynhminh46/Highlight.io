import axiosClient from "../axiosClient";

export default {
    quickPlay: () => axiosClient.get<any>("room/quick-play"),
    roomParticipants: (codeRoom: string) => axiosClient.get<any>(`room/participants/${codeRoom}`),
}