import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schemaForm = z.object({
  name: z.string().min(8, "Name must be at least 8 characters").max(20),
  age: z.coerce.number().min(18, "You must be at least 18 years old").max(80),
  password: z.string().min(6, "Password must be at least 6 characters").max(20)
});

const Form = () => {
  const {register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schemaForm)
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="name">Name:
        <input type="text" id="first" autoComplete="off" {...register("name")} />
        <p style={{ color: "red" }}>{errors.name?.message}</p>
        </label>
      </div>

      <div>
        <label htmlFor="age">Age:
        <input type="number" id="second" autoComplete="off" {...register("age")} />
        <p style={{ color: "red" }}>{errors.age?.message}</p>
        </label>
      </div>

      <div>
        <label htmlFor="password">Password:
        <input type="text" id="first" autoComplete="off" {...register("password")} />
        <p style={{ color: "red" }}>{errors.password?.message}</p>
        </label>
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;