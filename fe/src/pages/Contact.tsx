// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";

// const contactSchema = z.object({
//   name: z.string().min(2, { message: "Name must be at least 2 characters." }),
//   email: z
//     .string()
//     .email({ message: "Invalid email address." })
//     .nonempty({ message: "Email is required." }),
//   message: z
//     .string()
//     .min(10, { message: "Message must be at least 10 characters." })
//     .max(500, { message: "Message must be less than 500 characters." }),
// });

// type ContactFormInputs = z.infer<typeof contactSchema>;

const Contact = () => {
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm<ContactFormInputs>({
  //   resolver: zodResolver(contactSchema),
  // });

  // const onSubmit = (data: ContactFormInputs) => {
  //   console.log(data); // Handle form submission (e.g., send data to backend)
  // };

  return (
    <div className="text-6xl text-white">
      <div className="p-6 sm:p-14">
        <div className="flex gap-5 items-center">
          <div>
            <img src="/vite.svg" alt="Vite" className="w-12 h-12" />
          </div>
          <div className="text-2xl text-white">ROUSE's</div>
        </div>
        <div className="text-4xl sm:text-7xl text-secondaryColor font-bold">
          Contact Us
        </div>
      </div>

      <div className="flex w-full flex-col gap-10">
        {/* <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-1/2 px-10  space-y-2 text-2xl"
        >
          <div>
            <label className="block text-2xl text-white">Name</label>
            <input
              {...register("name")}
              className="w-full p-2 mt-1 bg-gray-800 text-white rounded"
              placeholder="Enter your name"
            />
            {errors.name && (
              <span className="text-red-500">{errors.name.message}</span>
            )}
          </div>

          <div>
            <label className="block text-2xl text-white">Email</label>
            <input
              {...register("email")}
              className="w-full p-2 mt-1 bg-gray-800 text-white rounded"
              placeholder="Enter your email"
            />
            {errors.email && (
              <span className="text-red-500">{errors.email.message}</span>
            )}
          </div>

          <div>
            <label className="block text-2xl text-white">Message</label>
            <textarea
              {...register("message")}
              className="w-full p-2 mt-1 bg-gray-800 text-white rounded"
              rows={5}
              placeholder="Your message"
            />
            {errors.message && (
              <span className="text-red-500">{errors.message.message}</span>
            )}
          </div>

          <button
            type="submit"
            className="mt-4 p-3 bg-secondaryColor text-white text-2xl rounded"
          >
            Send Message
          </button>
        </form> */}

        <div className="  w-1/2 h-fit text-2xl  text-white ml-16 rounded-lg">
          <h2 className="text-4xl font-bold  ">Our Location</h2>
          <div className="flex flex-col gap-1 pt-4 ">
            <p>Skyline Public High School</p>
            <p>1234 Main St,</p>
            <p>Kyoto, Japan</p>
            <p>Phone: (123) 456-7890</p>
          </div>
        </div>

        {/* <div className="w-1/2 flex items-center place-content-center">
          <img src="/logo.svg" alt="" className="w-1/2" />
          <div className="flex flex-col items-center text-7xl text-white">
            <span>R</span>
            <span>O</span>
            <span>U</span>
            <span>S</span>
            <span>E</span>
          </div>
        </div> */}
        <div className="  w-1/2 h-fit text-2xl  text-white ml-16 rounded-lg">
          <h2 className="text-4xl font-bold  ">Social Media</h2>
          <div className="flex gap-5 pt-2">
            <div className="w-16 aspect-square bg-secondaryColor/90 rounded-lg hover:bg-secondaryColor active:hover:bg-secondaryColor active:scale-90 transition-transform"></div>
            <div className="w-16 aspect-square bg-secondaryColor/90 rounded-lg hover:bg-secondaryColor active:hover:bg-secondaryColor active:scale-90 transition-transform"></div>
            <div className="w-16 aspect-square bg-secondaryColor/90 rounded-lg hover:bg-secondaryColor active:hover:bg-secondaryColor active:scale-90 transition-transform"></div>
            <div className="w-16 aspect-square bg-secondaryColor/90 rounded-lg hover:bg-secondaryColor active:hover:bg-secondaryColor active:scale-90 transition-transform"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
