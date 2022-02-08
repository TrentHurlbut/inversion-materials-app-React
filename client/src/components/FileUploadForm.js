import { useForm } from "react-hook-form";

export default function FileUploadForm() {
  const { register, handleSubmit } = useForm() 

  const onSubmit = (data) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input ref={register} type="file" name="picture" />
      <button>Submit</button>
    </form>
  );
}