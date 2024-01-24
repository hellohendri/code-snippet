import { db } from '@/db';
import { notFound } from 'next/navigation';
import SnippetEditForm from '@/components/snippetEditForm';

interface SnippetEditPageProps {
  params: {
    snippetId: string;
  };
}

export default async function SnippetEditPage(props: SnippetEditPageProps) {
  const id = parseInt(props.params.snippetId);

  const getSnippet = await db.snippet.findFirst({
    where: {
      id: id,
    },
  });

  if (!getSnippet) {
    return notFound();
  }

  return (
    <div>
      <SnippetEditForm snippet={getSnippet} />
    </div>
  );
}
