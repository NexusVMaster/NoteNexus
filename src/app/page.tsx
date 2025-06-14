// app/page.tsx or app/notes/page.tsx (server component by default)

import { requireAuth } from "./lib/auth";
import NotesClient from "./notes/NotesClient";

export default async function Page() {
  const userId = await requireAuth(); // server-side

  return <NotesClient userId={userId} />;
}
