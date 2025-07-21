"use client";
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../store/fireStore";
import { FormData } from "../schemas/schema";
 
const AllForms = () => {
  const [data, setData] = useState<FormData[]>();

  useEffect(() => {
  const getData = async () => {
    const querySnapshot = await getDocs(collection(db, "fybData"));
    const allData = querySnapshot.docs.map((doc) => {

      // console.log(`-${doc.id} , ${doc.data() }`);
      // console.log(doc)
      // console.log(doc.data().map((dac:) => { return dac}), "doc data");
      
      return {
        ...(doc.data() as FormData),
      };
    });
    console.log(allData[0].details.image, "data");
    setData(allData);
    
  };
  getData();


  }, []);
  return <div>
    
    <div>
      {data?.map((item, index) => (
        <div key={index} className="">
          <h3>{item.details.name}</h3>
          <p>{item.details.alias}</p>
          <p>{item.details.dob}</p>
          <p>{item.details.handle}</p>
          <p>{item.details.rs}</p>
          <p>{item.details.quote}</p>
          <p>{item.details.level}</p>
          <p>{item.details.course}</p>
          <p>{item.details.lecturer}</p>
          <p>{item.details.alternateCourse}</p>
          <p>{item.details.missMost}</p>
          <p>{item.details.clique}</p>
          {/* <Image width={100} height={100} priority={false} src={item.details.image} alt="form image" /> */}
        </div>
      ))}
    </div>
  </div>;
};

export default AllForms;
