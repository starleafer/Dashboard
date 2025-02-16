export interface TodoTask {
  _id: string;
  title: string;
  date: string;
  completed: boolean;
}

const BASE_URL = "http://localhost:5000/calendar-tasks";

export const calendarService = {
  async fetchTasks() {
    const response = await fetch(BASE_URL);
    const data = await response.json();
    return data;
  },

  async createTask(title: string, date: string) {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, date, completed: false }),
    });
    return response.json();
  },

  async updateTask(taskId: string, task: Partial<TodoTask>) {
    console.log('Updating task:', taskId, task);
    const response = await fetch(`${BASE_URL}/${taskId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  },

  async deleteTask(taskId: string) {
    const response = await fetch(`${BASE_URL}/${taskId}`, {
      method: "DELETE",
    });
    return response.ok;
  }
}; 