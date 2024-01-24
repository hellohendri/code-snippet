import { notFound } from 'next/navigation';
import Link from 'next/link';
import { db } from '@/db';
import * as actions from '@/actions/actions';

interface SnippetShowPageProps {
  params: {
    snippetId: string;
  };
}

export default async function SnippetShowPage(props: SnippetShowPageProps) {
  // await new Promise((r) => setTimeout(r, 2000));

  const getSnippet = await db.snippet.findFirst({
    where: { id: parseInt(props.params.snippetId) },
  });

  if (!getSnippet) {
    return notFound();
  }

  const deleteSnippetAction = actions.deleteSnippet.bind(null, getSnippet.id);

  return (
    <div>
      <div className="flex m-4 justify-between items-center">
        <h1 className="text-xl font-bold">{getSnippet.title}</h1>

        <div className="flex gap-4">
          <Link
            href={`./${props.params.snippetId}/edit`}
            className="p-2 border rounded"
          >
            Edit
          </Link>
          <form action={deleteSnippetAction}>
            <button className='p-2 rounded border'>Delete</button>
          </form>
        </div>
      </div>
      <pre className="p-3 border rounded bg-gray-200 border-gray-200">
        <code>{getSnippet.code}</code>
      </pre>
    </div>
  );
}

export async function generateStaticParams() {
  const snippet = await db.snippet.findMany();

  return snippet.map((snippet) => {
    return {
      id: snippet.id.toString(),
    }
  })
}