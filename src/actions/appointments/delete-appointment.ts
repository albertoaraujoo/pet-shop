'use server';

import { revalidatePath } from 'next/cache';

import { prisma } from '@/lib/prisma';

export async function deleteAppointment(id: string) {
  try {
    await prisma.appointment.delete({
      where: { id },
    });
    revalidatePath('/');
    return {};
  } catch (error) {
    console.error(error);
    return { error: 'Erro ao remover agendamento.' };
  }
}
