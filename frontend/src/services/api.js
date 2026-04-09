const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/tasks';

async function request(path = '', options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  });

  const payload = await response.json();

  if (!response.ok) {
    throw new Error(payload.error || 'Request failed.');
  }

  return payload.data;
}

export function getTasks() {
  return request();
}

export function createTask(title) {
  return request('', {
    method: 'POST',
    body: JSON.stringify({ title }),
  });
}

export function toggleTask(id) {
  return request(`/${id}`, {
    method: 'PATCH',
  });
}

export function deleteTask(id) {
  return request(`/${id}`, {
    method: 'DELETE',
  });
}
