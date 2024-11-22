import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <h1>Whoops!</h1>
      <p>Something went wrong. If the issue persists, please contact the developers at <a href="https://github.com/malitherl/strictlyplatonic" target="_blank">StrictlyPlatonic</a></p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
