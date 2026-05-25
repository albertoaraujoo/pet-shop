'use server';

import { revalidatePath } from 'next/cache';

import { prisma } from '@/lib/prisma';
import { appointmentSchema, type AppointmentData } from './appointment-schema';

export async function createAppointment(data: AppointmentData) {
  try {
    const parsedData = appointmentSchema.parse(data);
    const { scheduleAt } = parsedData;
    const hour = scheduleAt.getHours();

    const isMorning = hour >= 9 && hour < 12;
    const isAfternoon = hour >= 13 && hour < 18;
    const isEvening = hour >= 19 && hour < 21;

    if (!isMorning && !isAfternoon && !isEvening) {
      return {
        error:
          'Agendamentos só podem ser feitos entre 9h e 12h, 13h e 18h e 19h e 21h.',
      };
    }

    const existingAppointment = await prisma.appointment.findFirst({
      where: { scheduleAt },
    });

    if (existingAppointment) {
      return {
        error: 'Esse horário já está reservado.',
      };
    }

    await prisma.appointment.create({
      data: parsedData,
    });
    revalidatePath('/');
    return {};
  } catch (error) {
    console.error(error);
    return { error: 'Erro ao criar o agendamento.' };
  }
}
