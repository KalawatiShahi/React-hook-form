import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schemaForm = z.object({
  name: z
    .string()
    .min(8, "Name must be at least 8 characters")
    .max(20, "Name cannot exceed 20 characters"),

  email: z
    .string()
    .email("Please enter a valid email"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters"),
});

type FormData = z.infer<typeof schemaForm>;

const ZodForm = () => {
  const [submittedData, setSubmittedData] = useState<FormData | null>(null);

  const {
    register, handleSubmit, formState: { errors },} = useForm<FormData>({
    resolver: zodResolver(schemaForm),
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
    setSubmittedData(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>

        {/* Name */}
        <div>
          <label htmlFor="name">Name:</label>

          <input id="name" type="text" autoComplete="off" {...register("name")}/>

          <p>{errors.name?.message}</p>
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email">Email:</label>

          <input id="email" type="email" autoComplete="off"{...register("email")}/>

          <p>{errors.email?.message}</p>
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password">Password:</label>

          <input id="password" type="password" autoComplete="off" {...register("password")} />

          <p>{errors.password?.message}</p>
        </div>

        <button type="submit">
          Submit
        </button>

      </form>

      {/* Submitted Data */}
      {submittedData && (
        <div style={{ marginTop: "20px" }}>
          <h2>Submitted Data</h2>

          <p>
            <strong>Name:</strong> {submittedData.name}
          </p>

          <p>
            <strong>Email:</strong> {submittedData.email}
          </p>

          <p>
            <strong>Password:</strong> {submittedData.password}
          </p>
        </div>
      )}
    </>
  );
};

export default ZodForm;
