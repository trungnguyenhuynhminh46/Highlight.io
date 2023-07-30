import {
  START_GAME,
  WAIT_FOR_OTHER_PLAYERS,
} from '@/shared/components/IntervalCanvas';
import Logo from '@/shared/components/Logo';
import { useGameStore } from '@/shared/stores/gameStore';
import { useSocketStore } from '@/shared/stores/socketStore';
import { useUserStore } from '@/shared/stores/userStore';
import { useEffect, memo } from 'react';
import UserFrame from './UserFrame.component';
import { GAME_UPDATE_RANKING } from '../chat-answer/chatAnswer.helper';
import _ from 'lodash';
import { useParams } from 'react-router-dom';

interface RankingUser {
  participants: Array<Participant>;
  max_player: number;
  roomRound: RoomRound;
}

const RankingBoard = () => {
  const { user } = useUserStore();
  const { socket } = useSocketStore();
  const {
    participants,
    maxPlayer,
    setParticipants,
    setGameStatus,
    setMaxPlayer,
    setIsHost,
    gameStatus,
    setIsDrawer,
    setCorrectAnswers,
    roomRound,
    setRoomRound,
  } = useGameStore();
  const { codeRoom } = useParams();

  useEffect(() => {
    socket?.on('participants', (data: RankingUser) => {
      setParticipants(data.participants);
      setMaxPlayer(data.max_player);
      const hostUser = _.find(
        data.participants,
        (participant) => participant.is_host
      );

      const isHost = hostUser?.id === user?.id;
      setIsHost(isHost);
      if (data.participants.length === 1) {
        setGameStatus(WAIT_FOR_OTHER_PLAYERS);
        setIsDrawer(false);
        setParticipants(
          [...data.participants].map((participant) => ({ ...participant, score: 0 }))
        );
        setRoomRound
        socket.emit(WAIT_FOR_OTHER_PLAYERS, codeRoom);
      }

      if (
        data.participants.length === 2 &&
        isHost &&
        gameStatus &&
        gameStatus === WAIT_FOR_OTHER_PLAYERS
      ) {
        setGameStatus(START_GAME);
      }

      if (!roomRound) setRoomRound(data.roomRound);
    });

    return () => {
      socket?.off('participants');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket, gameStatus, codeRoom, participants, user]);
  useEffect(() => {
    socket?.on(
      GAME_UPDATE_RANKING,
      (data: { correctAnswers: number[]; newParticipants: Participant[] }) => {
        setCorrectAnswers(data.correctAnswers);
        setParticipants(data.newParticipants);
      }
    );

    return () => {
      socket?.off(GAME_UPDATE_RANKING);
    };
  }, [socket]);

  const numberOfPlayers = participants.length;

  return (
    <div className="bg-white rounded-[10px] w-[var(--ranking-board-width)] h-full relative">
      <div className="absolute top-[-70px] md:top-[-55px] left-12 md:left-20 2xl:left-14">
        <Logo customClassname="md:w-[180px] 2xl:w-[205px] w-[250px]" />
      </div>
      <UserFrame
        Leaderboard={participants}
        maxPlayer={maxPlayer}
        isCorrect={false}
      />
      <div className="absolute w-[38px] h-[38px] shadow-sm text-[12px] font-bold text-gray-300 border-2 border-gray-300 rounded-full top-1 right-1 flexCenter bg-white">
        <span>{numberOfPlayers}</span>/<span>{maxPlayer}</span>
      </div>
    </div>
  );
};

export default memo(RankingBoard);
