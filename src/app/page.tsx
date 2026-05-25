import { endOfDay, parseISO, startOfDay, startOfToday } from 'date-fns';

import { AppointmentForm, DatePicker, PeriodSection } from '@/components';
import { Button } from '@/components/ui/button';
import { prisma } from '@/lib/prisma';
import { groupAppointmentsByPeriod } from '@/utils/group-appointments-by-period';

type HomeProps = {
  searchParams: Promise<{ date?: string }>;
};

export default async function Home({ searchParams }: HomeProps) {
  const { date } = await searchParams;

  const selectedDate = date ? parseISO(date) : startOfToday();

  const appointments = await prisma.appointment.findMany({
    where: {
      scheduleAt: {
        gte: startOfDay(selectedDate),
        lte: endOfDay(selectedDate),
      },
    },
    orderBy: {
      scheduleAt: 'asc',
    },
  });

  const periods = groupAppointmentsByPeriod(appointments);

  return (
    <div className="bg-background-primary p-6">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-title mb-2 text-content-primary">Sua agenda</h1>
          <p className="text-paragraph-medium text-content-secondary">
            Aqui você pode ver todos os clientes e serviços agendados para hoje.
          </p>
        </div>

        <div className="hidden items-center gap-4 md:flex">
          <DatePicker />
        </div>
      </div>

      <div className="mt-3 mb-8 md:hidden">
        <DatePicker />
      </div>

      <div className="pb-24 md:pb-0">
        {periods.map((period, index) => (
          <PeriodSection key={index} period={period} />
        ))}
      </div>

      <div className="fixed right-0 bottom-0 left-0 flex justify-center bg-[#23242C] px-6 py-[18px] md:top-auto md:right-6 md:bottom-6 md:left-auto md:w-auto md:bg-transparent md:p-0">
        <AppointmentForm>
          <Button variant="brand">Novo agendamento</Button>
        </AppointmentForm>
      </div>
    </div>
  );
}
