import { PeriodSection } from '@/components/period-section';
import { prisma } from '@/lib/prisma';
import { groupAppointmentsByPeriod } from '@/utils/group-appointments-by-period';
import { APPOINTMENTS_MOCK_DATA } from '@/utils/mock-data';

const periods = groupAppointmentsByPeriod(APPOINTMENTS_MOCK_DATA);

export default async function Home() {
  const appointments = await prisma.appointment.findMany();
  console.log('appointments:', appointments);

  return (
    <div className="bg-background-primary p-6">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-title mb-2 text-content-primary">Sua agenda</h1>
          <p className="text-paragraph-medium text-content-secondary">
            Aqui você pode ver todos os clientes e serviços agendados para hoje.
          </p>
        </div>
      </div>

      <div className="mb-8 md:p-0">
        {periods.map((period, index) => (
          <PeriodSection key={index} period={period} />
        ))}
      </div>
    </div>
  );
}
