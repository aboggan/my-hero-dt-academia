import { players as defaultPlayers } from './players';
import { hayAlgoAhiPlayers } from './players_hayAlgoAhi';

export const playerLists = {
  default: {
    id: 'default',
    name: 'Besto Shonen',
    players: defaultPlayers,
  },
  hayAlgoAhi: {
    id: 'hayAlgoAhi',
    name: 'Hay algo ahí',
    players: hayAlgoAhiPlayers,
  },
};
