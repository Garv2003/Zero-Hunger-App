import { useForm } from "react-hook-form";

import Error from "../../ui/Error";
import Button from "../../ui/Button";

import { useAuthContext } from "../../context/AuthProvider";
import useCreatePost from "./useCreatePost";

import { uploadPostImage } from "../../utils/uploadImage";

function CreatePost() {
  const { user } = useAuthContext();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: { name: user.name } });

  const { createPost, isCreating } = useCreatePost();

  const onSubmit = async (data) => {
    const image = await uploadPostImage(data.image[0]);
    const newPost = {
      name: data.name,
      title: data.title,
      description: data.description,
      image: image,
    };
    createPost(newPost);
  };

  if (isCreating) {
    return <p>Creating Post...</p>;
  }

  return (
    <div className="p-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-1"
      >
        <div>
          <label htmlFor="name" className="text-sm font-medium">
            Organization Name
          </label>
          <div className="my-1 w-full">
            <input
              type="text"
              id="firstName"
              className="w-full rounded-md bg-stone-200 p-2 text-sm shadow-sm dark:bg-stone-300"
              {...register("name", {
                required: "Please enter your name",
              })}
              autoComplete="off"
              disabled
            />
            {errors.name && <Error>{errors.name.message}</Error>}
          </div>
        </div>

        <div>
          <label htmlFor="title" className="text-sm font-medium">
            Post Title
          </label>
          <div className="my-1 w-full">
            <input
              type="text"
              id="title"
              className="w-full rounded-md bg-stone-200 p-2 text-sm shadow-sm dark:bg-stone-300"
              {...register("title", {
                required: "Please enter your title",
              })}
              autoComplete="off"
            />
            {errors.title && <Error>{errors.name.message}</Error>}
          </div>
        </div>
        <div>
          <label htmlFor="description" className="text-sm font-medium">
            Post Description
          </label>
          <div className="my-1 w-full">
            <input
              type="text"
              id="description"
              className="w-full rounded-md bg-stone-200 p-2 text-sm shadow-sm dark:bg-stone-300"
              {...register("description", {
                required: "Please enter description",
              })}
              autoComplete="off"
            />
            {errors.description && <Error>{errors.description.message}</Error>}
          </div>
        </div>

        <div>
          <label htmlFor="image" className="text-sm font-medium">
            Image
          </label>
          <div className="my-1 w-full">
            <input
              type="file"
              id="image"
              accept="image/*"
              {...register("image", {
                required: "Please provide cabin Image",
              })}
            />
          </div>
          {errors?.image && <Error>{errors.image.message}</Error>}
        </div>

        <div className="mt-1 flex w-full justify-end gap-2">
          <Button type="doctor" purpose="submit" size="small" disabled={false}>
            Post
          </Button>
          <Button
            type="cancel"
            size="small"
            onClick={(e) => {
              e.preventDefault();
              reset();
            }}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}

export default CreatePost;
