type User = {
  id: number;
  username: string;
  role: "member" | "contributor" | "admin";
};

type UpdateUser = Partial<User>;
let nextUserId = 1;

const users: User[] = [
  { id: nextUserId++, username: "john_doe", role: "member" },
  { id: nextUserId++, username: "jane_smith", role: "contributor" },
  { id: nextUserId++, username: "alice_jones", role: "admin" },
  { id: nextUserId++, username: "charlie_brown", role: "member" },
];

console.log(users);

const fetchUserDetails = (username: string): User => {
  const user = users.find((user) => user.username === username);
  if (!user) {
    throw new Error(`User with username ${username} not found`);
  }
  return user;
};

console.log(fetchUserDetails("viktor_troyan"));

const updateUser = (id: number, updates: UpdateUser) => {
  const foundUser = users.find((user) => user.id === id);
  if (!foundUser) {
    console.error("User not found!");
    return;
  }
  Object.assign(foundUser, updates);
};

const addNewUser = (newUser: Omit<User, "id">): User => {
  const user: User = {
    id: nextUserId++,
    ...newUser,
  };
  users.push(user);
  return user;
};

addNewUser({ username: "joe_schmoe", role: "member" });

updateUser(1, { username: "new_john_doe" });
updateUser(2, { role: "admin" });

console.log(users);
