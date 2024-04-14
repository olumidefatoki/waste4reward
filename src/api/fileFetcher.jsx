async function fileFetch(url, options, searchParams, download) {
  const apiUrl = "https://waste-api-staging.shaktihub.org/api/v1" + url;

  const urlWithParams = new URL(apiUrl);
  urlWithParams.search = new URLSearchParams(searchParams).toString();

  const res = await fetch(urlWithParams, {
    ...options,
    // ...(options.cache && { cache: options.cache }),
    headers: {
      ContentType: "multipart/form-data",
      ...options.headers,
    },
  });
  if (download) {
    const data = await res.text();
    return data;
  }

  const data = await res.json();
  return data;
}

export default fileFetch;
