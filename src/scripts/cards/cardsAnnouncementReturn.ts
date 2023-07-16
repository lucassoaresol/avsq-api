import prisma from '../../prisma';

export const cardsAnnouncementReturn = async () => {
  const cards = await prisma.cardAnnouncement.findMany({
    include: {
      announcements: {
        select: {
          id: true,
          image: { select: { image: { select: { id: true, url: true } } } },
        },
      },
    },
  });

  const cardsReturn = cards.map((el) => {
    const announcements = el.announcements.map((announcement) => {
      return {
        id: announcement.id,
        image: {
          id: announcement.image.image.id,
          url: announcement.image.image.url,
        },
      };
    });
    return {
      ...el,
      announcements,
    };
  });

  return cardsReturn;
};
