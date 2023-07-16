import prisma from '../../prisma';

export const postHomeReturn = async () => {
  const cards = await prisma.card.findMany({include:{post:{select:{id:true,title:true,}}}});
};
