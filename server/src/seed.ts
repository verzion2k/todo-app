import { connectDB } from "./db";
import { TodoModel } from "./models/Todo";

const seed = async () => {
  await connectDB();

  // Optional: clear existing
  await TodoModel.deleteMany({});

  const samples = [
    { text: "Learn RTK Query" },
    { text: "Build Todo API" },
    { text: "Write seed script" },
  ];

  const created = await TodoModel.insertMany(samples);
  console.log(`Inserted ${created.length} todos.`);
  process.exit(0);
};

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
