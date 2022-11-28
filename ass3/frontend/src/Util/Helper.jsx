export const apiCall = async (path, method, body, token) => {
  const fetchOptions = {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : undefined,
    }
  };
  if (body !== null) {
    fetchOptions.body = JSON.stringify(body);
  }
  const response = await fetch('http://localhost:5005' + path, fetchOptions);
  const data = await response.json();
  if (data.error) {
    alert(data.error);
  } else {
    return data;
  }
}
