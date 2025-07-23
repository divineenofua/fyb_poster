'use client'
import React, { useRef, useState } from 'react'
import Input from '../components/Input';
import html2canvas from "html2canvas";
import logo1 from "../../../public/images/logo1C.png";
import logo2 from "../../../public/images/logo2Copy.png";
import logo3 from "../../../public/images/logo3C.png";
import userImage from "../../../public/images/user-removebg-preview.png";
import Image from 'next/image'
import {  useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormData, FormSchema } from '../schemas/schema';
import GradBox from '../components/gradBox';
import { downloadInstagramPost } from '../store/html2canv';
// import { collection , addDoc } from 'firebase/firestore';
// import { db } from '../store/fireStore';
 
 
// Define FormData type to include 'details'
 

// type DetailKey = keyof FormData["details"][0];


const formDetails: {
  label: string;
  name: string;
  type: string;
  placeholder: string;
}[] = [
  { label: "Name", name: "name", type: "text", placeholder: "Enter full name" },
  {
    label: "Alias",
    name: "alias",
    type: "text",
    placeholder: "Enter nickname",
  },
  {
    label: "DOB",
    name: "dob",
    type: "text",
    placeholder: " Enter date of birth",
  },
  {
    label: "handle",
    name: "handle",
    type: "text",
    placeholder: " Enter social media handle",
  },
  {
    label: "Relationship status",
    name: "rs",
    type: "text",
    placeholder: " Enter status",
  },
  {
    label: "quote",
    name: "quote",
    type: "text",
    placeholder: " Enter favourite quote",
  },
  {
    label: "favorite level",
    name: "level",
    type: "text",
    placeholder: " Enter text",
  },
  {
    label: "Favorite course",
    name: "course",
    type: "text",
    placeholder: " Enter Favorite course",
  },
  {
    label: "Favorite lecturer",
    name: "lecturer",
    type: "text",
    placeholder: " Enter name of lecturer",
  },
  {
    label: "If not marine, what else?",
    name: "alternateCourse",
    type: "text",
    placeholder: " Enter course name",
  },
  {
    label: "what will you miss most",
    name: "missMost",
    type: "text",
    placeholder: "Enter answer",
  },
  {
    label: "Class clique",
    name: "clique",
    type: "text",
    placeholder: " Name your clique",
  },
];

const FybForm = () => {
  

  const [previewImage, setImagePreview] =useState('')
 
    const form = useForm({
      resolver: zodResolver(FormSchema),
      defaultValues: {
        details: {
          image:'',
          name: "",
          alias: "",
          dob: "",
          handle: "",
          rs: "",
          quote: "",
          level: "",
          course: "",
          lecturer: "",
          alternateCourse: "",
          missMost: "",
          clique: "",
        },
      },
    });

    const inputRef = useRef<HTMLInputElement | null>(null);
    const posterRef = useRef<HTMLDivElement>(null);

    const downloadImage = async () => {
      console.log("dgg");

      if (!posterRef.current) return console.log("empty");

      const canvas = await html2canvas(posterRef.current, {
        useCORS: true, // if you’re loading external images
        backgroundColor: null,
        // scale: 2,
      });

      const imgData = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = imgData;
      link.download = "FYB-Poster.png";
      link.click();
      // if (navigator.userAgent.includes("iPhone")) {
      //   window.open(imgData, "_blank");
      // } else {
      //   link.click();
      // }
    };

    const [file, setFile] = useState<File>();
    const allValues = form.watch();
    const allFilled = allValues.details
      ? Object.values(allValues.details).every(
          (value) => value !== "" && value !== undefined
        )
      : false;

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      setFile(file);

      setImagePreview(URL.createObjectURL(file));
      form.setValue("details.image", URL.createObjectURL(file));
      //    const reader = new FileReader();

      //    reader.onloadend = () => {
      //     const base64String = reader.result as string;
      //     setImagePreview(base64String)
      //     form.setValue('details.image', base64String)
      //    }

      // reader.readAsDataURL(file)
    };

    const [preview, setPreview] = useState(false);
    const onSubmit = async (data: FormData) => {
      // alert("✅ submitted saved successfully");
      //      try{
      //  const docRef = await addDoc(collection(db, 'fybData'), data)
      //  console.log('doc added with', docRef.id)
      //      } catch(error){
      //       console.log(error, 'adding doc failed')

      //      }

      if (file) {
        downloadInstagramPost("poster", file);
      }
      downloadImage();
      console.log(data.details);
    };
    return (
      <div className=" sm:m-7 my-7 mb-26">
        <div className=" bg-[url('/images/fybBackground.png')]  rounded-2xl    max-w-[595px] h-full  sm:mx-auto  bg-no-repeat px-2 sm:px-5  py-4 ">
          <div className="  border-2 border-[#000337] border-dotted px-3 sm:px-7 rounded-2xl">
            <div className="    ">
              <div className=" flex justify-center gap-10 items-center pb-3 px-4 my-5  ">
                <div className="  max-w-[500px]">
                  <Image className="w-full" src={logo3} alt="" />
                </div>
                <div className="  max-w-[500px]">
                  <Image className="w-full" src={logo2} alt="" />
                </div>
                <div className="  max-w-[350px]">
                  <Image className="w-full" src={logo1} alt="" />
                </div>
              </div>
            </div>

            {/* form */}

            <form onSubmit={form.handleSubmit(onSubmit)}>
              {!preview && (
                <div>
                  <div className=" grid  sm:grid-cols-2  sm:gap-6 items-start">
                    {/* first part  */}
                    <div className="  sm:mb-5">
                      <div className="bg-gradient-to-r from-[#003366] to-[#000337] rounded-md">
                        <div>
                          <div className="flex h-[200px]   items-center justify-center">
                            {previewImage !== "" ? (
                              <Image
                                src={previewImage}
                                alt=""
                                width={1000}
                                height={200}
                                className="object-cover  h-[200px] p-2"
                              />
                            ) : (
                              <Image
                                src={userImage}
                                width={200}
                                height={200}
                                className=" object-contain"
                                alt=""
                              />
                            )}

                            <input
                              ref={inputRef}
                              className="  hidden"
                              name="image"
                              type="file"
                              accept="image/*"
                              onChange={handleImageUpload}
                            />
                          </div>
                          <div className="my-2 mb-4 flex items-center justify-center">
                            <div
                              onClick={() => inputRef.current?.click()}
                              className="bg-white p-1 text-[#000337] rounded-sm"
                            >
                              Upload image
                            </div>
                          </div>
                        </div>

                        <div className=" ">
                          <Input
                            styling="border-0 p-0"
                            stylingLabel="inline mr-4"
                            placeholder={formDetails[0].placeholder}
                            name="details.name"
                            type="string"
                            label={formDetails[0].label}
                            register={form.register}
                          />
                        </div>
                        <div className=" ">
                          <Input
                            styling="border-0 p-0 "
                            stylingLabel="inline mr-4"
                            placeholder={formDetails[1].placeholder}
                            name={"details.alias"}
                            type={formDetails[1].type}
                            label={formDetails[1].label}
                            register={form.register}
                          />
                        </div>
                      </div>
                      <div>
                        <div className=" ">
                          <Input
                            placeholder={formDetails[2].placeholder}
                            name={"details.dob"}
                            type={formDetails[2].type}
                            label={formDetails[2].label}
                            register={form.register}
                          />
                        </div>
                        <div className=" ">
                          <Input
                            placeholder={formDetails[3].placeholder}
                            name={"details.handle"}
                            type={formDetails[3].type}
                            label={formDetails[3].label}
                            register={form.register}
                          />
                        </div>
                        <div className=" ">
                          <Input
                            placeholder={formDetails[4].placeholder}
                            name={"details.rs"}
                            type={formDetails[4].type}
                            label={formDetails[4].label}
                            register={form.register}
                          />
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className=" ">
                        <Input
                          placeholder={formDetails[5].placeholder}
                          name={"details.quote"}
                          type={formDetails[5].type}
                          label={formDetails[5].label}
                          register={form.register}
                        />
                      </div>
                      <div className=" ">
                        <Input
                          placeholder={formDetails[6].placeholder}
                          name={"details.level"}
                          type={formDetails[6].type}
                          label={formDetails[6].label}
                          register={form.register}
                        />
                      </div>
                      <div className=" ">
                        <Input
                          placeholder={formDetails[7].placeholder}
                          name={"details.course"}
                          type={formDetails[7].type}
                          label={formDetails[7].label}
                          register={form.register}
                        />
                      </div>
                      <div className=" ">
                        <Input
                          placeholder={formDetails[8].placeholder}
                          name={"details.lecturer"}
                          type={formDetails[8].type}
                          label={formDetails[8].label}
                          register={form.register}
                        />
                      </div>
                      <div className=" ">
                        <Input
                          placeholder={formDetails[9].placeholder}
                          name={"details.alternateCourse"}
                          type={formDetails[9].type}
                          label={formDetails[9].label}
                          register={form.register}
                        />
                      </div>
                      <div className=" ">
                        <Input
                          placeholder={formDetails[10].placeholder}
                          name={"details.missMost"}
                          type={formDetails[10].type}
                          label={formDetails[10].label}
                          register={form.register}
                        />
                      </div>
                      <div className=" ">
                        <Input
                          placeholder={formDetails[11].placeholder}
                          name={"details.clique"}
                          type={formDetails[11].type}
                          label={formDetails[11].label}
                          register={form.register}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {preview && allFilled && (
                // <div className=" grid  grid-cols-2 items-stretch gap-3">
                //   <div>
                //     <div className="bg-gradient-to-r from-[#003366] to-[#000337] min-h-[300px] rounded-md">
                //       <div className="w-full h-[200px] flex items-center justify-center">
                //         {previewImage && (
                //           <Image
                //             src={allValues.details.image}
                //             alt=""
                //             width={1000}
                //             height={200}
                //             className="object-cover  h-[200px] p-2"
                //           />
                //         )}
                //       </div>
                //       <GradBox
                //         styling="border-0 p-0 mb-0"
                //         stylingLabel="inline mr-4"
                //         label={formDetails[0].label}
                //         value={allValues?.details.name}
                //       />
                //       <GradBox
                //         styling="border-0 p-0 "
                //         stylingLabel="inline mr-4"
                //         label={formDetails[1].label}
                //         value={allValues?.details.alias}
                //       />
                //     </div>
                //     <div>
                //       <GradBox
                //         styling="my-5"
                //         label={formDetails[2].label}
                //         value={allValues?.details.dob}
                //       />
                //     </div>
                //     <div>
                //       <GradBox
                //         label={formDetails[3].label}
                //         value={allValues?.details.handle}
                //         styling="mb-5"
                //       />
                //     </div>
                //     <div>
                //       <GradBox
                //         label={formDetails[4].label}
                //         value={allValues?.details.rs}
                //         styling="mb-5"
                //       />
                //     </div>
                //   </div>

                //   <div>
                //     <div>
                //       <GradBox
                //         label={formDetails[5].label}
                //         value={allValues?.details.quote}
                //         styling="mb-5"
                //       />
                //     </div>
                //     <div>
                //       <GradBox
                //         label={formDetails[6].label}
                //         value={allValues?.details.level}
                //         styling="mb-5"
                //       />
                //     </div>
                //     <div>
                //       <GradBox
                //         label={formDetails[7].label}
                //         value={allValues?.details.course}
                //         styling="mb-5"
                //       />
                //     </div>
                //     <div>
                //       <GradBox
                //         label={formDetails[8].label}
                //         value={allValues?.details.lecturer}
                //         styling="mb-5"
                //       />
                //     </div>
                //     <div>
                //       <GradBox
                //         label={formDetails[9].label}
                //         value={allValues?.details.alternateCourse}
                //         styling="mb-5"
                //       />
                //     </div>
                //     <div>
                //       <GradBox
                //         label={formDetails[10].label}
                //         value={allValues?.details.missMost}
                //         styling="mb-5"
                //       />
                //     </div>
                //     <div>
                //       <GradBox
                //         label={formDetails[11].label}
                //         value={allValues?.details.clique}
                //         styling="mb-5"
                //       />
                //     </div>
                //   </div>
                // </div>
                <div className=" scale-95">
                  {" "}
                  <div className=" grid items-start  grid-cols-2   gap-3">
                    <div>
                      <div className="bg-gradient-to-r from-[#003366] to-[#000337]  rounded-md">
                        <div className="flex items-center justify-center h-[170px] relative top-2 p-2  overflow-clip">
                          {previewImage && (
                            <Image
                              style={{
                                objectFit: "cover",
                                objectPosition: "center",
                              }}
                              src={allValues.details.image}
                              alt=""
                              width={20}
                              height={20}
                              className="absolute
                          top-[calc((100% / 2) - 85px)] p-2 w-full h-max"
                            />
                          )}
                        </div>
                        <GradBox
                          styling="border-0 p-0 mt-2 mb-0 bg-none h-0"
                          stylingLabel="inline mr-4"
                          label={formDetails[0].label}
                          value={allValues?.details.name}
                        />
                        <GradBox
                          styling="border-0 pb-[1px]  bg-none h-0"
                          stylingLabel="inline mr-4"
                          label={formDetails[1].label}
                          value={allValues?.details.alias}
                        />
                      </div>
                      <div>
                        <GradBox
                          styling="my-[14px] "
                          label={formDetails[2].label}
                          value={allValues?.details.dob}
                          stylingLabel="-top-2"
                        />
                      </div>
                      <div>
                        <GradBox
                          label={formDetails[3].label}
                          value={allValues?.details.handle}
                          styling="mb-5"
                          stylingLabel="-top-2"
                        />
                      </div>
                      <div>
                        <GradBox
                          label={formDetails[4].label}
                          value={allValues?.details.rs}
                          styling="mb-5"
                          stylingLabel="-top-2"
                        />
                      </div>
                    </div>

                    <div>
                      <div>
                        <GradBox
                          label={formDetails[5].label}
                          value={allValues?.details.quote}
                          styling="mb-6"
                          stylingLabel="-top-2"
                        />
                      </div>
                      <div>
                        <GradBox
                          label={formDetails[6].label}
                          value={allValues?.details.level}
                          styling="mb-5"
                          stylingLabel="-top-2"
                        />
                      </div>
                      <div>
                        <GradBox
                          label={formDetails[7].label}
                          value={allValues?.details.course}
                          styling="mb-5"
                          stylingLabel="-top-2"
                        />
                      </div>
                      <div>
                        <GradBox
                          label={formDetails[8].label}
                          value={allValues?.details.lecturer}
                          styling="mb-5"
                          stylingLabel="-top-2"
                        />
                      </div>
                      <div>
                        <GradBox
                          label={formDetails[9].label}
                          value={allValues?.details.alternateCourse}
                          styling="mb-5"
                          stylingLabel="-top-2 text-[11px]"
                        />
                      </div>
                      <div>
                        <GradBox
                          label={formDetails[10].label}
                          value={allValues?.details.missMost}
                          styling="mb-5"
                          stylingLabel="-top-2 text-[11px]"
                        />
                      </div>
                      <div>
                        <GradBox
                          label={formDetails[11].label}
                          value={allValues?.details.clique}
                          styling="mb-5"
                          stylingLabel="-top-2"
                        />
                      </div>
                    </div>
                  </div>{" "}
                </div>
              )}

              <div className=" flex justify-between  gap-2 my-3 ">
                <button
                  type="submit"
                  className=" bg-[#0891b2] text-[#000337]  p-2 text-center rounded-lg cursor-pointer hover:[#0e7490]"
                >
                  Download
                </button>

                <button
                  type="button"
                  onClick={() => setPreview((prev) => !prev)}
                  disabled={!allFilled}
                  className={`  bg-[#0891b2] text-[#000337]  p-2 text-center rounded-lg cursor-pointer hover:[#0e7490] ${
                    !allFilled && "opacity-30"
                  }`}
                >
                  {preview ? "Back" : " preview"}
                </button>

                {}
              </div>
            </form>

            {/* preview image */}
          </div>

          <footer className="text-[#000337]  py-3  font-bold text-center ">
            {" "}
            Mariners!!! Ahoy!!!
          </footer>
        </div>
        {/* className=" absolute left-[-9999px] opacity-0 -z-50  fixed top-0     pointer-events-none  opacity-0 -z-50" */}
        <div className="  absolute  opacity-0 -z-50 pointer-events-none   ">
          <div
            ref={posterRef}
            className=" bg-[url('/images/fybBackground.png')]        w-[595px] h-full   bg-no-repeat px-2 sm:px-5  py-4 "
          >
            <div className="  border-2 border-dotted border-[#000337] px-3 sm:px-7 rounded-2xl">
              <div className="    ">
                <div className=" flex justify-center gap-10 items-center pb-3 px-4 my-5  ">
                  <div className="  max-w-[500px]">
                    <Image className="w-full" src={logo3} alt="" />
                  </div>
                  <div className="  max-w-[500px]">
                    <Image className="w-full" src={logo2} alt="" />
                  </div>
                  <div className="  max-w-[350px]">
                    <Image className="w-full" src={logo1} alt="" />
                  </div>
                </div>
              </div>

              <div className=" grid items-start  grid-cols-2   gap-3">
                <div>
                  <div className="bg-gradient-to-r from-[#003366] to-[#000337]  rounded-md">
                    <div className="flex items-center justify-center h-[170px] relative top-2 p-2  overflow-clip">
                      {previewImage && (
                        <Image
                          style={{
                            objectFit: "cover",
                            objectPosition: "center",
                          }}
                          src={allValues.details.image}
                          alt=""
                          width={20}
                          height={20}
                          className="absolute
                          top-[calc((100% / 2) - 85px)] p-2 w-full h-max"
                        />
                      )}
                    </div>
                    <GradBox
                      styling="border-0 p-0 mt-2 mb-0 bg-none h-0"
                      stylingLabel="inline mr-4"
                      label={formDetails[0].label}
                      value={allValues?.details.name}
                    />
                    <GradBox
                      styling="border-0 pb-[1px]  bg-none h-0"
                      stylingLabel="inline mr-4"
                      label={formDetails[1].label}
                      value={allValues?.details.alias}
                    />
                  </div>
                  <div>
                    <GradBox
                      styling="my-[14px] "
                      label={formDetails[2].label}
                      value={allValues?.details.dob}
                      stylingLabel="-top-2"
                    />
                  </div>
                  <div>
                    <GradBox
                      label={formDetails[3].label}
                      value={allValues?.details.handle}
                      styling="mb-5"
                      stylingLabel="-top-2"
                    />
                  </div>
                  <div>
                    <GradBox
                      label={formDetails[4].label}
                      value={allValues?.details.rs}
                      styling="mb-5"
                      stylingLabel="-top-2"
                    />
                  </div>
                </div>

                <div>
                  <div>
                    <GradBox
                      label={formDetails[5].label}
                      value={allValues?.details.quote}
                      styling="mb-6"
                      stylingLabel="-top-2"
                    />
                  </div>
                  <div>
                    <GradBox
                      label={formDetails[6].label}
                      value={allValues?.details.level}
                      styling="mb-5"
                      stylingLabel="-top-2"
                    />
                  </div>
                  <div>
                    <GradBox
                      label={formDetails[7].label}
                      value={allValues?.details.course}
                      styling="mb-5"
                      stylingLabel="-top-2"
                    />
                  </div>
                  <div>
                    <GradBox
                      label={formDetails[8].label}
                      value={allValues?.details.lecturer}
                      styling="mb-5"
                      stylingLabel="-top-2"
                    />
                  </div>
                  <div>
                    <GradBox
                      label={formDetails[9].label}
                      value={allValues?.details.alternateCourse}
                      styling="mb-5"
                      stylingLabel="-top-2"
                    />
                  </div>
                  <div>
                    <GradBox
                      label={formDetails[10].label}
                      value={allValues?.details.missMost}
                      styling="mb-5"
                      stylingLabel="-top-2"
                    />
                  </div>
                  <div>
                    <GradBox
                      label={formDetails[11].label}
                      value={allValues?.details.clique}
                      styling="mb-5"
                      stylingLabel="-top-2"
                    />
                  </div>
                </div>
              </div>
            </div>

            <footer className="text-[#000337]  py-3 font-bold  text-center ">
              {" "}
              Mariners!!! Ahoy!!!
            </footer>
          </div>
        </div>
      </div>
    );
}

export default FybForm

 