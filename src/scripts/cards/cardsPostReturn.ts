import prisma from '../../prisma';
import { postHomeArrayReturn } from '../posts';

export const cardsPostReturn = async () => {
  const cards = await prisma.cardPost.findMany();

  return await postHomeArrayReturn(cards);
};
