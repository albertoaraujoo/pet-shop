export function HomePageErrorMessage() {
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
        <div className="flex items-center justify-center">
          <p className="text-paragraph-medium text-content-secondary">
            Nenhum agendamento encontrado
          </p>
        </div>
      </div>
    </div>
  );
}
