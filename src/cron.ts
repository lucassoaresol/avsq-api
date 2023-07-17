import { CronJob } from 'cron';
import { verifyScheduledPost } from './scripts';

const job = new CronJob('* 10 * * * *', async () => {
  try {
    await verifyScheduledPost();
    console.log('Status das postagens atualizado com sucesso');
  } catch (error) {
    console.error('Erro ao atualizar o status das postagens:', error);
  }
});

export default job;
