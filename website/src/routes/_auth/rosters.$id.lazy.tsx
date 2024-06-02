import CreateForm from '@/components/createForm';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/_auth/rosters/$id')({
  component: Roster,
});

function Roster() {
  return (
    <div>
      <CreateForm />
    </div>
  );
}