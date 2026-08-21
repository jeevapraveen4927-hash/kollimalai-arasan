export interface DemoUser {
  fullName: string;
  email: string;
  phone: string;
  password: string;
}

const globalForDemoUsers = globalThis as unknown as {
  demoUsers: DemoUser[] | undefined;
};

export const demoUsers =
  globalForDemoUsers.demoUsers ??
  (globalForDemoUsers.demoUsers = [
    {
      fullName: "Test User",
      email: "test@example.com",
      phone: "9876543210",
      password: "123456",
    },
  ]);