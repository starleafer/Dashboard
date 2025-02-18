export interface TodoTask {
  _id: string;
  title: string;
  date: string;
  completed: boolean;
  userId: string;
}

const BASE_URL = "http://localhost:5000/calendar-tasks";

export const calendarService = {
  async fetchTasks(userId: string) {
    console.log('Fetching tasks for user:', userId);
    const response = await fetch(`${BASE_URL}?userId=${userId}`);
    const data = await response.json();
    console.log('Fetched tasks:', data);
    return data;
  },

  async createTask(title: string, date: string, userId: string) {
    console.log('Creating task for user:', userId);
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, date, completed: false, userId }),
    });
    const data = await response.json();
    console.log('Created task:', data);
    return data;
  },

  async updateTask(taskId: string, updates: Partial<TodoTask>) {
    const response = await fetch(`${BASE_URL}/${taskId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  },

  async deleteTask(taskId: string, userId: string) {
    console.log('Deleting task:', taskId, 'for user:', userId);
    const response = await fetch(`${BASE_URL}/${taskId}?userId=${userId}`, {
      method: "DELETE",
    });
    return response.ok;
  }
}; 