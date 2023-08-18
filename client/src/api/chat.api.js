import axiosClient from "./axios.client";

export const chatCompletion = async ({ question }) => {
  try {
    const response = await axiosClient.post("chat/ask", { question });

    return { response };
  } catch (err) {
    return { err };
  }
};

const fetchChatHistory = async () => {
  try {
    const data = await axiosClient.get('chat/list');
    return data;
  } catch (error) {
    console.error('Error fetching chat history:', error);
    return [];
  }
};

export { fetchChatHistory };

export const deleteChat = async (chatId) => {
  try {
    const response = await axiosClient.delete(`chat/${chatId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
