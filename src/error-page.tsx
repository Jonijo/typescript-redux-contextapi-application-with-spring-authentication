import { useRouteError, isRouteErrorResponse } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    // React Router error: has status and statusText
    return (
      <div>
        <h1>{error.status}</h1>
        <p>{error.statusText}</p>
      </div>
    );
  }

  if (error instanceof Error) {
    // General JavaScript error
    return (
      <div>
        <h1>Something went wrong</h1>
        <p>{error.message}</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Unknown Error</h1>
      <p>Something unexpected happened.</p>
    </div>
  );
}