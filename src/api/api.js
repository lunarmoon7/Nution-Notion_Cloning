export const API_END_POINT = 'https://kdt-frontend.programmers.co.kr/documents';

export const request = async (url = '', options = {}) => {
  try {
    const response = await fetch(`${API_END_POINT}${url}`, {
      ...options,
      headers: {
        'x-username': 'zentechie',
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      return await response.json();
    }

    throw new Error('API 호출에 실패했습니다!');
  } catch (e) {
    console.log(e.message);
  }
};
