import { setHours, setMinutes } from 'date-fns';
import { z } from 'zod';

export const appointmentFormSchema = z
  .object({
    tutorName: z.string().min(3, 'O nome do tutor é obrigatório'),
    petName: z.string().min(3, 'O nome do pet é obrigatório'),
    phone: z.string().min(11, 'O telefone é obrigatório'),
    description: z.string().min(3, 'A descrição é obrigatória'),
    scheduleAt: z
      .date({
        error: 'A data é obrigatória',
      })
      .min(new Date(), 'A data não pode ser no passado'),
    time: z.string().min(1, 'A hora é obrigatória'),
  })
  .refine(
    (data) => {
      const [hour, minute] = data.time.split(':');
      const scheduledDateTime = setMinutes(
        setHours(data.scheduleAt, Number(hour)),
        Number(minute)
      );

      return scheduledDateTime > new Date();
    },
    {
      path: ['time'],
      message: 'O horário não pode ser no passado',
    }
  );

export type AppointmentFormValues = z.infer<typeof appointmentFormSchema>;
