import { zodResolver } from "@hookform/resolvers/zod";
import {z} from "zod";
import { useForm } from "react-hook-form";


const schemaForm = z.object({
    name: z.string().min(8, "Name must be at least 8 charecters").max(20),
    age: z.coerce.number().min(18, "Age must be at least 18 years years old").max(80),
    password: z.string().min(6, "Password must be at least 6 characters").max(20)
});

const ZodForm = () =>{

const {register, handleSubmit, formState: {error}} = useForm({
    resolver : zodResolver(schemaForm)

});

const onSubmit = (data) =>{
    console.log(data);
}
    
    return(
        <>
           <form onSubmit={handleSubmit(onSubmit)}>
           <div>
             <label htmlFor="name">Name:</label>
            <input type="text" id="first" autoComplete="off" {...register('name')}/>
           </div>

           <div>
             <label htmlFor="age">Age:</label>
            <input type="number" id="second" autoComplete="off" {...register('age')}/>
           </div>

           <div>
             <label htmlFor="password">Password:</label>
            <input type="password" id="third" autoComplete="off" {...register('password')}/>
           </div>

           <button type="submit">Submit</button>
           </form>
        </>
    )
}

export default ZodForm