import z from 'zod';

export const appointmentSchema = z.object({
  tutorName: z.string(),
  petName: z.string(),
  phone: z.string(),
  description: z.string(),
  scheduleAt: z.date(),
});

export type AppointmentData = z.infer<typeof appointmentSchema>;
